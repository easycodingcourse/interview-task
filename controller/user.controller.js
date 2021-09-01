const Users = require('../models').Users
const { checkHashPassword } = require('../utils/utils')
var jwt = require('jsonwebtoken');
const { secrate_key } = require('../utils/constantValue')


const userLogin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: false, message: "missing field" })
    }


    // call database to check user by email
    const result = await Users.findOne({ where: { email: email } })

    // if no found any user then return user not register
    !result ? response(res, 200, { status: false, message: "user not register." }) : null


    // if we found the user then check the hash password ,
    // no match password directly return from here
    !checkHashPassword(password, result.password) ? response(res, 200, { status: false, message: "password Not match" }) : null



    // this object create for json web token 
    const dataForJsonWebToken = {
        id: result.id,
        name: result.name,
        time: new Date()
    }


    // create a json web token || without giving expiry time  --> if needed then give . No problem
    const jsontoken = jwt.sign(dataForJsonWebToken, secrate_key, {});

    let tokenList = [];
    let tokenNeed = 3;  // number of token limit - only 3 device use the same account --- * its static field now but|| we can use it dynamically also

    if (result.jwt !== null) {
        tokenList = result.jwt;
        if (tokenList.length >= tokenNeed) {
            tokenList.splice(0, (tokenList.length - (tokenNeed - 1)));
        }
    }
    tokenList.push(jsontoken)


    // Update token in database for device control . others no need to store this token
    
    // * => Asynchronous has been used here because we don't need its response . so, dont wait here ..just update
    Users.update({ jwt: tokenList }, {
        where: {
            id: result.id
        }
    }).then(result => {
        console.log(result);
    }).catch(error=>console.log(error))

    

    const user = {
        id:result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        profile: result.profile,
        phone: result.phone
    }

    res.json({ status: true, message: "Successfully login", user, accessToken: jsontoken, })

}



const response = (res, code, result) => {
    return res.status(code).json(result)
}



module.exports = {
    userLogin
}

