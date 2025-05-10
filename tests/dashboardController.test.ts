import { dashboardController } from '../src/controllers/dashboardController';
import { User, Skill } from '../src/models';
import HttpError from '../src/errors/HttpError';
import {
  editUserSchema,
  editBioSchema,
  interestSchema,
  skillSchema,
} from '../src/utils/validationSchemas';

jest.mock('../src/models');
jest.mock('../src/utils/validationSchemas');

describe('dashboardController', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      session: { connectedUser: { id: 1 } },
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      render: jest.fn(),
    };

    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('show', () => {
    it('should render dashboard page with user and skills', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({ id: 1, firstname: 'John' });
      (Skill.findAll as jest.Mock).mockResolvedValue([{ id: 1, description: 'Skill 1' }]);

      await dashboardController.show(req, res, next);

      expect(User.findByPk).toHaveBeenCalledWith(1, expect.any(Object));
      expect(Skill.findAll).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('pages/dashboard', {
        user: { id: 1, firstname: 'John' },
        skills: [{ id: 1, description: 'Skill 1' }],
      });
    });

    it('should call next with HttpError if user not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await dashboardController.show(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(HttpError));
    });
  });

  describe('editUser', () => {
    it('should update user information', async () => {
      (editUserSchema.validate as jest.Mock).mockReturnValue({
        value: { firstname: 'John', lastname: 'Doe', email: 'john@example.com', location: 'Paris' },
        error: null,
      });

      (User.update as jest.Mock).mockResolvedValue([1]);

      await dashboardController.editUser(req, res, next);

      expect(User.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        error: false,
        message: "Mise à jour de l'utilisateur réussie",
      });
    });

    it('should return 500 if validation error', async () => {
      (editUserSchema.validate as jest.Mock).mockReturnValue({
        value: {},
        error: { message: 'Validation error' },
      });

      await dashboardController.editUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ violation: true });
    });
  });

  describe('editBio', () => {
    it('should update user bio', async () => {
      (editBioSchema.validate as jest.Mock).mockReturnValue({
        value: { bio: 'New bio' },
        error: null,
      });

      (User.update as jest.Mock).mockResolvedValue([1]);

      await dashboardController.editBio(req, res, next);

      expect(User.update).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Bio mise à jour' });
    });

    it('should return 500 if bio validation error', async () => {
      (editBioSchema.validate as jest.Mock).mockReturnValue({
        value: {},
        error: { message: 'Validation error' },
      });

      await dashboardController.editBio(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: true,
        message: "Erreur lors de la mise à jour de la bio de l'utilisateur.",
      });
    });
  });

  // describe('addInterest', () => {
  //   it('should add interest to user', async () => {
  //     jest.spyOn(Skill, 'findByPk').mockResolvedValue({} as unknown as Skill);

  //     const mockUser = { $get: jest.fn().mockResolvedValue([]), $add: jest.fn() };
  //     (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

  //     req.body = { interestId: 1 };

  //     await dashboardController.addInterest(req, res, next);

  //     // Ajout de l'intérêt avec une priorité
  //     expect(mockUser.$add).toHaveBeenCalledWith(
  //       'interests',
  //       { id: 1 },
  //       { through: { priority: 1 } },
  //     );
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Intérêt ajouté' });
  //   });
  // });

  // describe('addSkill', () => {
  //   it('should add skill to user', async () => {
  //     jest.spyOn(Skill, 'findByPk').mockResolvedValue({} as unknown as Skill);

  //     const mockUser = { $get: jest.fn().mockResolvedValue([]), $add: jest.fn() };
  //     (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

  //     req.body = { skillId: 1 };

  //     await dashboardController.addSkill(req, res, next);

  //     // Ajout de la compétence avec une priorité
  //     expect(mockUser.$add).toHaveBeenCalledWith('skills', { id: 1 }, { through: { priority: 1 } });
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Compétence ajoutée' });
  //   });
  // });

  // describe('removeInterest', () => {
  //   it('should remove interest from user', async () => {
  //     jest.spyOn(Skill, 'findByPk').mockResolvedValue({} as unknown as Skill);

  //     const mockUser = { $get: jest.fn().mockResolvedValue([{}]), $remove: jest.fn() };
  //     (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

  //     req.body = { interestId: 1 };

  //     await dashboardController.removeInterest(req, res, next);

  //     // Suppression de l'intérêt
  //     expect(mockUser.$remove).toHaveBeenCalledWith('interests', { id: 1 });
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Intérêt supprimé' });
  //   });
  // });

  // describe('removeSkill', () => {
  //   it('should remove skill from user', async () => {
  //     jest.spyOn(Skill, 'findByPk').mockResolvedValue({} as unknown as Skill);

  //     const mockUser = { $get: jest.fn().mockResolvedValue([{}]), $remove: jest.fn() };
  //     (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

  //     req.body = { skillId: 1 };

  //     await dashboardController.removeSkill(req, res, next);

  //     // Suppression de la compétence
  //     expect(mockUser.$remove).toHaveBeenCalledWith('skills', { id: 1 });
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Compétence supprimée' });
  //   });
  // });
});
