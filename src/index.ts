import express, { type Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import router from './routers/router';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import './models/sequelizeClient';
import dotenv from 'dotenv';
import { connectedUserToLocals } from './middlewares/connectedUserToLocals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 3000;

const sessionSecret: string = process.env.SESSION_SECRET as string;
const environment: string = process.env.NODE_ENV as string;

dotenv.config();

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure assets routes (static folder)
app.use(express.static(path.join(__dirname, 'public')));

// Configure request body parsing
app.use(express.urlencoded({ extended: false }));

// Configure session
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: sessionSecret,
    cookie: {
      secure: environment === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    },
  }),
);

// Make session connectedUser available in all views
app.use(connectedUserToLocals);

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
