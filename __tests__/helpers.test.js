const {
    generateToken,
    tokenValidator,
    hashPassword,
    comparePassword,
    isValidEmail
} = require('../src/utils');
const jwt = require('jsonwebtoken')
const data = {
    id: '15b2c4bf-0507-45df-8703-707333871c0e',
    password: '12345678',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1YjJjNGJmLTA1MDctNDVkZi04NzAzLTcwNzMzMzg3MWMwZSIsImlhdCI6MTY0NzUyNjA0NiwiZXhwIjoxNjQ4MTMwODQ2fQ.tAvCyX25sabbsvyFEPlvh5THiUcrpOdi1wo6FymJ6lM'
}

describe('Helpers', () => {
    it('Generate a new token', () => {
        const { id } = jwt.decode(data.token)
        const token = generateToken(data.id);
        const parsed = jwt.decode(token)
        expect(id).toEqual(parsed.id);
    })
    it('Validate the token', () => {
        const token = generateToken(data.id);
        const parsed = tokenValidator(token);
        expect(data.id).toEqual(parsed.id);
    })
    it('Hash & Compare password', () => {
        const hashed = hashPassword(data.password);
        expect(comparePassword(data.password, hashed)).toEqual(true);
        expect(comparePassword('111111', hashed)).toEqual(false);
    })
    it('Email validator', () => {
        expect(isValidEmail('email@email.com')).toEqual(true);
        expect(isValidEmail('email.com')).toEqual(false);
    })
})