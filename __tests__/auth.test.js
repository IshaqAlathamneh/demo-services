const { createUser } = require('../src/services/authService');
const models = require('../src/models/index');

jest.mock('../src/models/index');
const body = {
    email: "test123@email.com",
    password : "1234"
};
const returnedUser = {
        id: "15b2c4bf-0507-45df-8703-707333871c0e",
        email: "test@email.com",
        password: "$2a$08$ScwyCb43Qvzyqmxi82fm2etrb0QXBO/ZiuuUGETJqGNs3PVXJhq7O",
        created_date: "2022-03-17T12:07:25.969Z",
        modified_date: "2022-03-17T12:07:25.969Z"
}
describe('Auth Service', () => {
    it('Create User', async() => {
        models.pool.query.mockResolvedValue({
            rows: [returnedUser]
        });
        const newUser = await createUser(body)
        expect(newUser).not.toBeNull();
        expect(newUser.user.email).toEqual(returnedUser.email);
    })
    // it('Create User & Reflection Tables', () => {
    //     models.pool.query.mockResolvedValue('Tables Created');
    //     models.createTables.mockResolvedValue({message:'Tables Created'});
    //     const data = models.createTables()
    //     expect(data).not.toBeNull();
    // })
})