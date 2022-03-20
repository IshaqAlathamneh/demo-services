const bcrypt = require('bcryptjs');

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

function comparePassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

module.exports = {hashPassword, comparePassword, isValidEmail}