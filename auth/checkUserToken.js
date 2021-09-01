const { verify } = require("jsonwebtoken");
const { secrate_key } = require("../utils/constantValue");
const Users = require('../models').Users


const checkUserToken = async (req, res, next) => {
    var token = req.get("authorization");
    !token ? errorHandler(res, 401, "Access denied! unauthorized user") : null
    token = token.slice(7);
    try {
        const { id } = verify(token, secrate_key);
        !id ? errorHandler(res, 403, "Invalid token") : null
        req.accessUserId = id
        const user = await Users.findOne({ where: { id:id } }).catch(error => console.log(error));
        !user ? errorHandler(res, 403, "Invalid token") : null
        const tokenList = user.jwt;
        !tokenList.includes(token) ? errorHandler(res, 403, "Invalid token") : null
        next()
    } catch (err) {
        // console.log(err);
        errorHandler(res,403,"Invalid token")
    }
}

const errorHandler = (res, code, message) => {
    return res.status(code).json({ status: false, message })
}

module.exports = checkUserToken;