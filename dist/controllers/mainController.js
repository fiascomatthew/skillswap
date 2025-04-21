var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/index.js';
import { sequelizeClient } from '../models/sequelizeClient.js';
import { Op } from 'sequelize';
import { searchSkillSchema } from '../utils/validationSchemas.js';
export const getHomePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.findAll({
        include: [{ association: 'skills' }],
        order: sequelizeClient.fn('RANDOM'),
        limit: 6,
    });
    res.render('pages/home', { users });
});
export const getSkillsSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = searchSkillSchema.validate(req.query);
    if (error) {
        return res.render('pages/searchResults', {
            users: [],
            query: '',
            error: 'La recherche ne peut pas être vide',
        });
    }
    const { query } = req.query;
    const users = yield User.findAll({
        include: [
            {
                association: 'skills',
                where: {
                    description: {
                        [Op.iLike]: `%${query}%`,
                    },
                },
            },
        ],
    });
    res.render('pages/searchResults', { users, query, error: null });
});
