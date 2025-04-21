import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import helmet from 'helmet';
import router from './routers/router.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';
import './models/sequelizeClient.js';
import dotenv from 'dotenv';
import { connectedUserToLocals } from './middlewares/connectedUserToLocals.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;
const sessionSecret = process.env.SESSION_SECRET;
const environment = process.env.NODE_ENV;
// helmet middleware to secure the app
app.use(helmet());
app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
}));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'data:'],
        imgSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'data:'],
        fontSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'data:'],
        connectSrc: ["'self'", 'https://facebook.com', 'https://twitter.com', 'https://linkedin.com'],
    },
}));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));
app.use(helmet.dnsPrefetchControl({ allow: false }));
// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Configure assets routes (static folder)
app.use(express.static(path.join(__dirname, 'public')));
// Configure request body parsing
app.use(express.urlencoded({ extended: false }));
// Configure JSON parsing
app.use(express.json());
// Configure session
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: sessionSecret,
    cookie: {
        secure: environment === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
    },
}));
// Make session connectedUser available in all views
app.use(connectedUserToLocals);
app.use(router);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
