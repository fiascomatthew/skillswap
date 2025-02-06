import express, { Express, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/router';
import notFound from './middlewares/notFound';
import errorHandler from './middlewares/errorHandler';
import './models/sequelizeClient';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 3000;

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure assets routes (static folder)
app.use(express.static(path.join(__dirname, 'public')));

// Configure body parser
app.use(express.urlencoded({ extended: false }));

// Favicon static route
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'images', 'logo.png')));

app.use(router);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
