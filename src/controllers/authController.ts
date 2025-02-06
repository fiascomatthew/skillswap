import { Request, Response } from 'express';
import { User } from '../models';

export const authController = {
  async register(req: Request, res: Response) {
    console.log(req.body);

    const { email, password } = req.body;

    // check if the user already exists
    // try {
    //     const user = await User.findOne({ email});

    //     if (user) {
    //         throw new Error('Utilisateur déjà existant, veuillez vous connecter')
    //     }

    // // on prépare l'enregistrement dans la db en hashant le password
    // const hashedPassword = bcrypt.hashSync(password, 10)

    // // créer puis enregistrer le nouveau User dans la db
    // const newUser = new User({ username, password: hashedPassword });
    // // === sequelize.sync()
    // const createdUser = await newUser.save();

    // if (!createdUser) {
    //     throw new Error('Utilisateur non créé')
    // }
    // // créer un token et l'envoyer dans la réponse
    // const token = generateToken({ id: createdUser._id, username, role: 2 });

    // res.redirect('/');

    // } catch (error: any) {
    //     console.log("REGISTER ERR : ", error);
    //     res.status(401).json({ error, message: error.message })
    // }
  },
};
