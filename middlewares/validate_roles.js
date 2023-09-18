
const isAdminRoles = (req, res, next) => {
    if (!req.rolesAdministrative) {
        return res.status(500).json({
            msg: 'Administrative sin roles'
        });
    };
    const roleExists = req.rolesAdministrative.find(role => role.name === 'Administrador');

    if (!roleExists) {
        return res.status(401).json({ 
            msg: 'El administativo no tiene un rol de administrador'
        });
    }

    next();
}

module.exports = {
    isAdminRoles
}