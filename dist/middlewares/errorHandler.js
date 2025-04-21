import HttpError from '../errors/HttpError.js';
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Un problème est survenu, veuillez réessayer plus tard.';
    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        if (statusCode === 404 || statusCode === 401) {
            message = 'La page que vous recherchez est introuvable.';
        }
    }
    console.log('ERROR', err);
    res.status(statusCode).render('pages/error', { message });
};
export default errorHandler;
