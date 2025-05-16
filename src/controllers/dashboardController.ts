import type { NextFunction, Request, Response } from 'express';
import { Skill, User } from '../models/index';
import HttpError from '../errors/HttpError';
import {
  editUserSchema,
  editBioSchema,
  interestSchema,
  skillSchema,
} from '../utils/validationSchemas';

export const dashboardController = {
  async show(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const user = await User.findByPk(userId, {
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

    const skills = await Skill.findAll({ order: [['description', 'ASC']] });

    return res.render('pages/dashboard', { user, skills });
  },

  async editUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const {
      value: { firstname, lastname, email, location },
      error,
    } = editUserSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        violation: true,
      });
    }

    try {
      await User.update({ firstname, lastname, email, location }, { where: { id: userId } });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la mise à jour de l'utilisateur.",
      });
    }

    return res.status(200).json({ error: false, message: "Mise à jour de l'utilisateur réussie" });
  },

  async editBio(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const {
      value: { bio },
      error,
    } = editBioSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la mise à jour de la bio de l'utilisateur.",
      });
    }

    try {
      await User.update({ bio }, { where: { id: userId } });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la mise à jour de la bio de l'utilisateur.",
      });
    }

    return res.status(200).json({ error: false, message: 'Bio mise à jour' });
  },

  async addInterest(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const {
      value: { interestId },
      error,
    } = interestSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de l'ajout de l'intérêt.",
      });
    }

    try {
      // Check if the interest exists
      const interest = await Skill.findByPk(interestId);
      if (!interest) {
        return res.status(500).json({
          error: true,
          message: 'Compétence introuvable',
        });
      }

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(500).json({
          error: true,
          message: 'Utilisateur introuvable',
        });
      }

      // Check if the user already has this skill as an interest
      const existingInterests = await user.$get('interests', {
        where: { id: interestId },
      });

      if (existingInterests.length > 0) {
        return res.status(500).json({
          error: true,
          message: 'Vous avez déjà cette compétence',
        });
      }

      // Add the skill to the user's interests
      await user.$add('interests', interest, { through: { priority: 1 } });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de l'ajout de l'intérêt",
      });
    }

    return res.status(200).json({ error: false, message: 'Intérêt ajouté' });
  },

  async addSkill(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const {
      value: { skillId },
      error,
    } = skillSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de l'ajout de la compétence.",
      });
    }

    try {
      // Check if the skill exists
      const skill = await Skill.findByPk(skillId);
      if (!skill) {
        return res.status(500).json({
          error: true,
          message: 'Compétence introuvable',
        });
      }

      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(500).json({
          error: true,
          message: 'Utilisateur introuvable',
        });
      }

      // Check if the user already has this skill
      const existingSkills = await user.$get('skills', {
        where: { id: skillId },
      });

      if (existingSkills.length > 0) {
        return res.status(500).json({
          error: true,
          message: 'Vous avez déjà cette compétence',
        });
      }
      // Add the skill to the user's skills
      await user.$add('skills', skill, { through: { priority: 1 } });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de l'ajout de la compétence",
      });
    }

    return res.status(200).json({ error: false, message: 'Compétence ajoutée' });
  },

  async removeInterest(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const {
      value: { interestId },
      error,
    } = interestSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la suppression de l'intérêt.",
      });
    }

    try {
      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(500).json({
          error: true,
          message: 'Utilisateur introuvable',
        });
      }

      // Check if the interest exists
      const interest = await Skill.findByPk(interestId);
      if (!interest) {
        return res.status(500).json({
          error: true,
          message: 'Compétence introuvable',
        });
      }

      // Check if the user has this interest
      const existingInterests = await user.$get('interests', {
        where: { id: interestId },
      });

      if (existingInterests.length === 0) {
        return res.status(500).json({
          error: true,
          message: "Vous n'avez pas cette intérêt",
        });
      }

      // Remove the skill from the user's interests
      await user.$remove('interests', interest);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: "Erreur lors de la suppression de l'intérêt",
      });
    }

    return res.status(200).json({ error: false, message: 'Intérêt supprimé' });
  },

  async removeSkill(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.connectedUser?.id;

    const {
      value: { skillId },
      error,
    } = skillSchema.validate(req.body);

    if (error) {
      return res.status(500).json({
        error: true,
        message: 'Erreur lors de la suppression de la compétence.',
      });
    }

    try {
      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(500).json({
          error: true,
          message: 'Utilisateur introuvable',
        });
      }

      // Check if the skill exists
      const skill = await Skill.findByPk(skillId);
      if (!skill) {
        return res.status(500).json({
          error: true,
          message: 'Compétence introuvable',
        });
      }

      // Check if the user has this skill
      const existingSkills = await user.$get('skills', {
        where: { id: skillId },
      });

      if (existingSkills.length === 0) {
        return res.status(500).json({
          error: true,
          message: "Vous n'avez pas cette compétence",
        });
      }

      // Remove the skill from the user's skills
      await user.$remove('skills', skill);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'Erreur lors de la suppression de la compétence',
      });
    }

    return res.status(200).json({ error: false, message: 'Compétence supprimée' });
  },
};
