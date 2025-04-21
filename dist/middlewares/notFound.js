import HttpError from '../errors/HttpError.js';
const notFound = (req, res, next) => {
    next(new HttpError('Page not found', 404));
};
export default notFound;
