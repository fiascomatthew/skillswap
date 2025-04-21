export const connectedUserToLocals = (req, res, next) => {
    if (req.session.connectedUser) {
        res.locals.connectedUser = req.session.connectedUser;
    }
    else {
        res.locals.connectedUser = false;
    }
    next();
};
