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
import HttpError from '../errors/HttpError.js';
export const userController = {
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { id } = req.params;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const user = yield User.findByPk(id, {
                include: [
                    { association: 'skills' },
                    { association: 'interests' },
                    { association: 'availabilities' },
                    {
                        association: 'reviewsReceived',
                        include: [
                            {
                                model: User,
                                as: 'reviewer',
                                attributes: ['firstname', 'lastname'],
                            },
                        ],
                    },
                ],
            });
            if (!user) {
                return next(new HttpError('Utilisateur introuvable', 404));
            }
            const currentUser = yield User.findByPk(userId);
            const isFollowing = currentUser ? yield currentUser.isFollowing(user) : false;
            return res.render('pages/user', {
                user,
                isSelf: ((_b = req.session.connectedUser) === null || _b === void 0 ? void 0 : _b.id) === user.id,
                isFollowing,
            });
        });
    },
    toggleFollow(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id } = req.params;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            if (Number.parseInt(id) === userId) {
                return res.status(400).json({ success: false, message: 'Tu ne peux pas te suivre toi-même' });
            }
            const user = yield User.findByPk(id);
            const currentUser = yield User.findByPk(userId);
            if (!user || !currentUser) {
                return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
            }
            yield ((yield currentUser.isFollowing(user))
                ? user.removeFollower(currentUser)
                : user.addFollower(currentUser));
            const isFollowing = yield currentUser.isFollowing(user);
            return res.json({ success: true, isFollowing });
        });
    },
};
