import { userController } from '../src/controllers/userController';
import { User } from '../src/models/index';
import HttpError from '../src/errors/HttpError';
import type { Request, Response, NextFunction } from 'express';
import type { Session } from 'express-session';

jest.mock('../src/models/index');

describe('userController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  const fakeSession = {
    regenerate: jest.fn(),
    destroy: jest.fn(),
    reload: jest.fn(),
    save: jest.fn(),
    id: 'sessionId',
    cookie: {} as any,
    connectedUser: { id: 1, firstname: 'Test', image: undefined },
  } as unknown as Session;

  beforeEach(() => {
    req = {
      params: {},
      session: fakeSession,
    };
    res = {
      render: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe('show', () => {
    it('should call next with 404 error if user not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValueOnce(null);

      req.params = { id: '123' };

      await userController.show(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(HttpError));
      expect((next as jest.Mock).mock.calls[0][0].statusCode).toBe(404);
    });

    it('should render user page with correct data', async () => {
      const userMock = { id: 2 };
      const currentUserMock = {
        isFollowing: jest.fn().mockResolvedValue(true),
      };

      (User.findByPk as jest.Mock)
        .mockResolvedValueOnce(userMock) // pour chercher le user cible
        .mockResolvedValueOnce(currentUserMock); // pour chercher le user connecté

      req.params = { id: '2' };

      await userController.show(req as Request, res as Response, next);

      expect(res.render).toHaveBeenCalledWith('pages/user', {
        user: userMock,
        isSelf: false,
        isFollowing: true,
      });
    });
  });

  describe('toggleFollow', () => {
    it('should return 400 if trying to follow self', async () => {
      req.params = { id: '1' }; // id = connecté

      await userController.toggleFollow(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Tu ne peux pas te suivre toi-même',
      });
    });

    it('should return 404 if user or current user not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValueOnce(null);

      req.params = { id: '2' };

      await userController.toggleFollow(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Utilisateur introuvable',
      });
    });

    it('should add follow if not following', async () => {
      const userMock = {
        addFollower: jest.fn(),
      };
      const currentUserMock = {
        isFollowing: jest.fn().mockResolvedValue(false),
      };

      (User.findByPk as jest.Mock)
        .mockResolvedValueOnce(userMock) // cible
        .mockResolvedValueOnce(currentUserMock); // connecté

      req.params = { id: '2' };

      await userController.toggleFollow(req as Request, res as Response, next);

      expect(userMock.addFollower).toHaveBeenCalledWith(currentUserMock);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        isFollowing: expect.any(Boolean),
      });
    });

    it('should remove follow if already following', async () => {
      const userMock = {
        removeFollower: jest.fn(),
      };
      const currentUserMock = {
        isFollowing: jest.fn().mockResolvedValue(true),
      };

      (User.findByPk as jest.Mock)
        .mockResolvedValueOnce(userMock) // cible
        .mockResolvedValueOnce(currentUserMock); // connecté

      req.params = { id: '2' };

      await userController.toggleFollow(req as Request, res as Response, next);

      expect(userMock.removeFollower).toHaveBeenCalledWith(currentUserMock);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        isFollowing: expect.any(Boolean),
      });
    });
  });
});
