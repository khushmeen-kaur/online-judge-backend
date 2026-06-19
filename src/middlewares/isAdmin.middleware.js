const isAdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({
            message: "access denied, oye tu admin nhi hai"
        });
    }
    next();
};
module.exports = isAdminMiddleware;