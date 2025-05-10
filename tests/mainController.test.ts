import { getHomePage, getSkillsSearch } from '../src/controllers/mainController';
import { Op } from 'sequelize';

jest.mock('../src/models', () => ({
  User: {
    findAll: jest.fn(),
  },
}));

jest.mock('../src/models/sequelizeClient', () => ({
  sequelizeClient: {
    fn: jest.fn(() => 'RANDOM()'),
  },
}));

jest.mock('../src/utils/validationSchemas', () => ({
  searchSkillSchema: {
    validate: jest.fn(),
  },
}));

// Importation après les mocks
import { User } from '../src/models';
import { searchSkillSchema } from '../src/utils/validationSchemas';
import { sequelizeClient } from '../src/models/sequelizeClient';

describe('mainController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      render: jest.fn(),
    };
    jest.clearAllMocks(); // Nettoyage entre les tests
  });

  describe('getHomePage', () => {
    it('should render the home page with random users', async () => {
      const usersMock = [
        { id: 1, firstname: 'User1' },
        { id: 2, firstname: 'User2' },
      ];
      (User.findAll as jest.Mock).mockResolvedValue(usersMock);

      await getHomePage(req, res);

      expect(User.findAll).toHaveBeenCalledWith({
        include: [{ association: 'skills' }],
        order: sequelizeClient.fn('RANDOM'),
        limit: 6,
      });
      expect(res.render).toHaveBeenCalledWith('pages/home', { users: usersMock });
    });
  });

  describe('getSkillsSearch', () => {
    it('should render error if search query is invalid', async () => {
      (searchSkillSchema.validate as jest.Mock).mockReturnValue({ error: { message: 'Invalid' } });

      await getSkillsSearch(req, res);

      expect(res.render).toHaveBeenCalledWith('pages/searchResults', {
        users: [],
        query: '',
        error: 'La recherche ne peut pas être vide',
      });
    });

    it('should render search results if search query is valid', async () => {
      req.query.query = 'Node.js';
      (searchSkillSchema.validate as jest.Mock).mockReturnValue({ error: null });

      const usersMock = [{ id: 1, firstname: 'Dev1' }];
      (User.findAll as jest.Mock).mockResolvedValue(usersMock);

      await getSkillsSearch(req, res);

      expect(User.findAll).toHaveBeenCalledWith({
        include: [
          {
            association: 'skills',
            where: {
              description: {
                [Op.iLike]: '%Node.js%',
              },
            },
          },
        ],
      });
      expect(res.render).toHaveBeenCalledWith('pages/searchResults', {
        users: usersMock,
        query: 'Node.js',
        error: null,
      });
    });
  });
});
