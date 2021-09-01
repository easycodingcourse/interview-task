var bcrypt = require('bcryptjs');
const moment = require('moment');
const dataFormat = "'YYYY-MM-DD HH:mm:ss";



const getHashPassword = (password = "12345") => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

const checkHashPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

const sendResponse = (res, code, result) => {
    return res.status(code).json(result)
}

const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomNumber = (length = 4) => {
    let random = Math.random().toString().substr(2, length);
    return random;
};


const discountCalculate = (amount, percentage) => {
    let beforeDiscount = parseFloat(parseFloat(amount).toFixed(2))
    let discountAmount = parseFloat(((beforeDiscount * percentage) / 100).toFixed(2))
    let afterDiscount = (beforeDiscount - discountAmount)
    return { afterDiscount, beforeDiscount, discountAmount, percentage }
};




const getCurrentDate = () => {
    return moment().format(dataFormat)
}

const formattedDate = (date) => {
    return moment(date).format(dataFormat)
}

module.exports = {
    getHashPassword,
    checkHashPassword,
    sendResponse,
    getRandomNumberBetween,
    getRandomNumber,
    discountCalculate,
    getCurrentDate,
    formattedDate
}