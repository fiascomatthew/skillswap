function isAuthorized(req, res, next) {
    if (!req.session.connectedUser) {
        return res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
    }
    return next();
}
export { isAuthorized };
