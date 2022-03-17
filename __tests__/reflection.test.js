const {
    createReflection, 
    updateReflection, 
    deleteReflectionById, 
    getAllReflections, 
    getReflectionById
} = require('../src/services/refliction');

const models = require('../src/models/index');

jest.mock('../src/models/index');

const body = {
    success : "pending",
    low_point : "lowest",
    take_away : "why not"
}
const mockRows = [{
    id: "fc5db81d-f1c5-4eb1-a59b-f26188885e93",
    success: "pending",
    low_point: "lowest",
    take_away: "why not",
    owner_id: "047213af-1415-49ad-a1a5-82009265bb5a",
    created_date: "2022-03-16T10:17:15.460Z",
    modified_date: "2022-03-16T10:17:15.461Z"
},
{
    id: "fc5db81d-f1c5-4eb1-a59b-f26188885e93",
    success: "zzz",
    low_point: "xxx",
    take_away: "nnn",
    owner_id: "047213af-1415-49ad-a1a5-82009265bb5a",
    created_date: "2022-03-16T10:17:15.460Z",
    modified_date: "2022-03-16T10:17:15.461Z"
}]
describe('Reflection Service', () => {
    beforeEach(()=>{
        models.pool.query.mockResolvedValue({
            rows: mockRows
        });
    })
    it('create new reflection', async ()=> {
        const newReflection = await createReflection(body, mockRows[0].owner_id);
        expect(newReflection).not.toBeNull();
        expect(newReflection.success).toEqual(mockRows[0].success);
    })
    it('update reflection', async ()=> {
        models.pool.query.mockResolvedValue({
            rows: [{...mockRows[0], success: "uuu",
            low_point: "ppp",
            take_away: "ddd"}]
        });
        const updatedReflection = await updateReflection({success: "uuu",
        low_point: "ppp",
        take_away: "ddd"}, mockRows[0].id, mockRows[0].owner_id);
        expect(updatedReflection).not.toBeNull();
        expect(updatedReflection.success).not.toEqual(mockRows[0].success);
    })
    it('delete reflection', async ()=> {
        const deletedReflection = await deleteReflectionById(mockRows[1].id, mockRows[1].owner_id);
        expect(deletedReflection.rows[1]).not.toBeNull();
        expect(deletedReflection.rows[1].success).toEqual(mockRows[1].success);
    })
    it('get reflection by id', async ()=> {
        const {rows} = await getReflectionById(mockRows[1].id, mockRows[1].owner_id);
        expect(rows[1]).not.toBeNull();
        expect(rows[1].success).toEqual(mockRows[1].success);
    })
    it('get all reflections', async ()=> {
        const {rows} = await getAllReflections(mockRows[0].owner_id);
        expect(rows).not.toBeNull();
        expect(rows[0].success).toEqual(mockRows[0].success);
        expect(rows[1].success).toEqual(mockRows[1].success);
        expect(rows.length).toEqual(mockRows.length);
    })
})