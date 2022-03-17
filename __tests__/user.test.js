const {
    getUserByEmail,
    getAllUsers,
    getUserById,
    deleteUserById
} = require('../src/services/userServices')

const models = require('../src/models/index');

jest.mock('../src/models/index');
const body = {
    email: "test123@email.com",
    password: "1234"
};
const returnedUsers = [{
    id: "15b2c4bf-0507-45df-8703-707333871c0e",
    email: "test123@email.com",
    password: "$2a$08$ScwyCb43Qvzyqmxi82fm2etrb0QXBO/ZiuuUGETJqGNs3PVXJhq7O",
    created_date: "2022-03-17T12:07:25.969Z",
    modified_date: "2022-03-17T12:07:25.969Z"
},
{
    id: "15b2c4bf-0507-45df-7777-707333871c0e",
    email: "test@email.com",
    password: "$2a$08$ScwyCb43Qvzyqmxi82fm2etrb0QXBO/ZiuuUGETJqGNs3PVXJhq7O",
    created_date: "2022-03-17T12:07:25.969Z",
    modified_date: "2022-03-17T12:07:25.969Z"
}
]

describe('User Service', () => {
    beforeEach(() => {
        models.pool.query.mockResolvedValue({
            rows: returnedUsers
        });
    })
    it('Get User By Email', async () => {
        const { rows } = await getUserByEmail(body.email);
        expect(rows[0]).not.toBeNull();
        expect(rows[0].email).toEqual(body.email);
    })
    it('Get User By Id', async () => {
        const { rows } = await getUserById(returnedUsers[0].id);
        expect(rows[0]).not.toBeNull();
        expect(rows[0].id).toEqual(returnedUsers[0].id);
    })
    it('Get All Users', async () => {
        const { rows } = await getAllUsers();
        expect(rows[0]).not.toBeNull();
        expect(rows[1].email).toEqual(returnedUsers[1].email);
        expect(rows.length).toEqual(returnedUsers.length);
    })
    it('Delete User By Id', async () => {
        const { rows } = await deleteUserById(returnedUsers[0].id);
        expect(rows[0]).not.toBeNull();
        expect(rows[0].id).toEqual(returnedUsers[0].id);
    })
})