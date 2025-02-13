import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import './models/sequelizeClient';
import router from './routers/router';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import './models/sequelizeClient';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 3000;

// helmet middleware to secure the app
app.use(helmet());

// ! Activate only in production
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  }),
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'data:'],
      imgSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'data:'],
      fontSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'data:'],
      connectSrc: ["'self'", 'https://facebook.com', 'https://twitter.com', 'https://linkedin.com'],
    },
  }),
);

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

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
