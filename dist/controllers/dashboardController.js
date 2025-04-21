var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Skill, User } from '../models/index.js';
import HttpError from '../errors/HttpError.js';
import { editUserSchema, editBioSchema, interestSchema, skillSchema, } from '../utils/validationSchemas.js';
export const dashboardController = {
    show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const user = yield User.findByPk(userId, {
                include: [
                    { association: 'skills' },
                    { association: 'interests' },
                    { association: 'availabilities' },
                    { association: 'followers' },
                    { association: 'following' },
                ],
            });
            if (!user) {
                return next(new HttpError('Utilisateur introuvable', 404));
            }
            const skills = yield Skill.findAll({ order: [['description', 'ASC']] });
            return res.render('pages/dashboard', { user, skills });
        });
    },
    editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const { value: { firstname, lastname, email, location }, error, } = editUserSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    violation: true,
                });
            }
            try {
                yield User.update({ firstname, lastname, email, location }, { where: { id: userId } });
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de la mise à jour de l'utilisateur.",
                });
            }
            return res.status(200).json({ error: false, message: "Mise à jour de l'utilisateur réussie" });
        });
    },
    editBio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const { value: { bio }, error, } = editBioSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de la mise à jour de la bio de l'utilisateur.",
                });
            }
            try {
                yield User.update({ bio }, { where: { id: userId } });
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de la mise à jour de la bio de l'utilisateur.",
                });
            }
            return res.status(200).json({ error: false, message: 'Bio mise à jour' });
        });
    },
    addInterest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const { value: { interestId }, error, } = interestSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de l'ajout de l'intérêt.",
                });
            }
            try {
                // Check if the interest exists
                const interest = yield Skill.findByPk(interestId);
                if (!interest) {
                    return res.status(500).json({
                        error: true,
                        message: 'Compétence introuvable',
                    });
                }
                // Check if the user exists
                const user = yield User.findByPk(userId);
                if (!user) {
                    return res.status(500).json({
                        error: true,
                        message: 'Utilisateur introuvable',
                    });
                }
                // Check if the user already has this skill as an interest
                const existingInterests = yield user.$get('interests', {
                    where: { id: interestId },
                });
                if (existingInterests.length > 0) {
                    return res.status(500).json({
                        error: true,
                        message: 'Vous avez déjà cette compétence',
                    });
                }
                // Add the skill to the user's interests
                yield user.$add('interests', interest, { through: { priority: 1 } });
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de l'ajout de l'intérêt",
                });
            }
            return res.status(200).json({ error: false, message: 'Intérêt ajouté' });
        });
    },
    addSkill(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const { value: { skillId }, error, } = skillSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de l'ajout de la compétence.",
                });
            }
            try {
                // Check if the skill exists
                const skill = yield Skill.findByPk(skillId);
                if (!skill) {
                    return res.status(500).json({
                        error: true,
                        message: 'Compétence introuvable',
                    });
                }
                // Check if the user exists
                const user = yield User.findByPk(userId);
                if (!user) {
                    return res.status(500).json({
                        error: true,
                        message: 'Utilisateur introuvable',
                    });
                }
                // Check if the user already has this skill
                const existingSkills = yield user.$get('skills', {
                    where: { id: skillId },
                });
                if (existingSkills.length > 0) {
                    return res.status(500).json({
                        error: true,
                        message: 'Vous avez déjà cette compétence',
                    });
                }
                // Add the skill to the user's skills
                yield user.$add('skills', skill, { through: { priority: 1 } });
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de l'ajout de la compétence",
                });
            }
            return res.status(200).json({ error: false, message: 'Compétence ajoutée' });
        });
    },
    removeInterest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const { value: { interestId }, error, } = interestSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de la suppression de l'intérêt.",
                });
            }
            try {
                // Check if the user exists
                const user = yield User.findByPk(userId);
                if (!user) {
                    return res.status(500).json({
                        error: true,
                        message: 'Utilisateur introuvable',
                    });
                }
                // Check if the interest exists
                const interest = yield Skill.findByPk(interestId);
                if (!interest) {
                    return res.status(500).json({
                        error: true,
                        message: 'Compétence introuvable',
                    });
                }
                // Check if the user has this interest
                const existingInterests = yield user.$get('interests', {
                    where: { id: interestId },
                });
                if (existingInterests.length === 0) {
                    return res.status(500).json({
                        error: true,
                        message: "Vous n'avez pas cette intérêt",
                    });
                }
                // Remove the skill from the user's interests
                yield user.$remove('interests', interest);
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: "Erreur lors de la suppression de l'intérêt",
                });
            }
            return res.status(200).json({ error: false, message: 'Intérêt supprimé' });
        });
    },
    removeSkill(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.session.connectedUser) === null || _a === void 0 ? void 0 : _a.id;
            const { value: { skillId }, error, } = skillSchema.validate(req.body);
            if (error) {
                return res.status(500).json({
                    error: true,
                    message: 'Erreur lors de la suppression de la compétence.',
                });
            }
            try {
                // Check if the user exists
                const user = yield User.findByPk(userId);
                if (!user) {
                    return res.status(500).json({
                        error: true,
                        message: 'Utilisateur introuvable',
                    });
                }
                // Check if the skill exists
                const skill = yield Skill.findByPk(skillId);
                if (!skill) {
                    return res.status(500).json({
                        error: true,
                        message: 'Compétence introuvable',
                    });
                }
                // Check if the user has this skill
                const existingSkills = yield user.$get('skills', {
                    where: { id: skillId },
                });
                if (existingSkills.length === 0) {
                    return res.status(500).json({
                        error: true,
                        message: "Vous n'avez pas cette compétence",
                    });
                }
                // Remove the skill from the user's skills
                yield user.$remove('skills', skill);
            }
            catch (error) {
                return res.status(500).json({
                    error: true,
                    message: 'Erreur lors de la suppression de la compétence',
                });
            }
            return res.status(200).json({ error: false, message: 'Compétence supprimée' });
        });
    },
};
