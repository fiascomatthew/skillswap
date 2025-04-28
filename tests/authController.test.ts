import { authController } from '../src/controllers/authController';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../src/models/index.ts';

describe('environment Test', () => {
  it('should load correct .env.test variables', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(process.env.DATABASE_URL).toBe('postgres://test:test@db:5432/test');
  });
});

describe('getLoginPage', () => {
  it('should redirect to home if user is already connected', () => {
    const req = { session: { connectedUser: {} }, query: {} } as unknown as Request;
    const res = { redirect: jest.fn() } as unknown as Response;

    authController.getLoginPage(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  it('should render login page with returnTo query if uses is not connected', () => {
    const req = { session: {}, query: { returnTo: '/home' } } as unknown as Request;
    const res = { render: jest.fn() } as unknown as Response;

    authController.getLoginPage(req, res);

    expect(res.render).toHaveBeenCalledWith('pages/login', { returnTo: '/home' });
  });
});

describe('getRegisterPage', () => {
  it('should redirect to home if user is already connected', () => {
    const req = { session: { connectedUser: {} }, query: {} } as unknown as Request;
    const res = { redirect: jest.fn() } as unknown as Response;

    authController.getRegisterPage(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  it('should render register page with returnTo query if user is not connected', () => {
    const req = { session: {}, query: { returnTo: '/home' } } as unknown as Request;
    const res = { render: jest.fn() } as unknown as Response;

    authController.getRegisterPage(req, res);

    expect(res.render).toHaveBeenCalledWith('pages/register', { returnTo: '/home' });
  });
});

describe('login', () => {
  it('should return 500 if validation fails', async () => {
    const req = { body: { email: 'invalidEmail', password: '' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ violation: true });
  });

  it('should return 401 if user does not exist', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    User.findOne = jest.fn().mockResolvedValue(null);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Adresse e-mail ou mot de passe incorrect.',
    });
  });

  it('should return 401 if password does not match', async () => {
    const req = { body: { email: 'test@example.com', password: 'password' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const mockUser = { password: 'hashedPassword' };
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    bcrypt.compareSync = jest.fn().mockReturnValue(false);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Adresse e-mail ou mot de passe incorrect.',
    });
  });

  it('should return 200 and store user in session if login is successful', async () => {
    const req = {
      body: { email: 'test@example.com', password: 'password' },
      session: {},
    } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    const mockUser = { id: 1, firstname: 'John', image: 'image.png', password: 'hashedPassword' };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compareSync = jest.fn().mockReturnValue(true);

    await authController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Connexion réussie' });
    expect(req.session.connectedUser).toEqual({
      id: 1,
      firstname: 'John',
      image: 'image.png',
    });
  });
});

describe('logout', () => {
  it('should destroy session and redirect to home', async () => {
    const req = {
      session: { destroy: jest.fn((cb) => cb(null)) },
      query: {},
    } as unknown as Request;
    const res = { redirect: jest.fn() } as unknown as Response;

    await authController.logout(req, res);

    expect(req.session.destroy).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/');
  });

  it('should return 500 if session destroy fails', async () => {
    const req = {
      session: {
        connectedUser: { id: 1 },
        destroy: jest.fn().mockImplementation((cb) => cb(new Error('Error'))),
      },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      redirect: jest.fn(),
    } as unknown as Response;

    await authController.logout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: true,
      message: 'Erreur lors de la déconnexion.',
    });
  });
});
