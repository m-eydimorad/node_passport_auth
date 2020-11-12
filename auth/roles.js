const AccessControl = require("accesscontrol");
const ac = new AccessControl();

let roles = (function () {
    ac.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")
        .readAny("article")

    ac.grant("admin")
        .extend("basic")

        .readAny("article")
        .updateAny("article")
        .deleteAny("article")

        .readAny("profile")
        .updateAny("profile")
        .deleteAny("profile")

    return ac;
})();

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        console.log(req)
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
