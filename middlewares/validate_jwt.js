const jwt = require('jsonwebtoken');

const { _getAdministrativeRolesByAdministrative_Id } = require('../controllers/administrative_roles.controller');

const validateJWT = async(req, res, next)=>{
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const rolesAdministrative = await _getAdministrativeRolesByAdministrative_Id(uid);
        req.rolesAdministrative = rolesAdministrative;
        next();
    } catch(error){
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validateJWT
}