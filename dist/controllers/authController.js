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
import bcrypt from 'bcrypt';
import { loginSchema, registerSchema } from '../utils/validationSchemas.js';
export const authController = {
    getLoginPage(req, res) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.connectedUser) {
            return res.redirect('/register');
        }
        const returnTo = req.query.returnTo || '';
        res.render('pages/login', { returnTo });
    },
    getRegisterPage(req, res) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.connectedUser) {
            return res.redirect('/');
        }
        const returnTo = req.query.returnTo || '';
        res.render('pages/register', { returnTo });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value: { email, password }, error, } = loginSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    violation: true,
                });
            }
            const user = yield User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    error: true,
                    message: 'Adresse e-mail ou mot de passe incorrect.',
                });
            }
            const match = bcrypt.compareSync(password, user.password || '');
            if (!match) {
                return res.status(401).json({
                    error: true,
                    message: 'Adresse e-mail ou mot de passe incorrect.',
                });
            }
            // Store user details in session
            req.session.connectedUser = {
                id: user.id,
                firstname: user.firstname,
                image: user.image,
            };
            return res.status(200).json({ error: false, message: 'Connexion réussie' });
        });
    },
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        message: 'Erreur lors de la déconnexion.',
                    });
                }
            });
            return res.redirect('/');
        });
    },
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value: { firstname, lastname, email, password, confirmPassword, location }, error, } = registerSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    violation: true,
                });
            }
            const user = yield User.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ error: 'Utilisateur déjà existant' });
            }
            const hashedPassword = bcrypt.hashSync(password, 10);
            const createdUser = yield User.create({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                location,
            });
            // Store user details in session
            req.session.connectedUser = {
                id: createdUser.id,
                firstname: createdUser.firstname,
                image: createdUser.image,
            };
            return res.status(200).json({ error: false, message: 'Inscription réussie' });
        });
    },
};
