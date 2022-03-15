const { pool: db } = require('../models/index')
const {
    createReflectionQuery,
    findAllReflectionsQuery,
    findOneReflectionQuery,
    updateOneReflectionQuery,
    deleteReflectionQuery
} = require('../models/reflection');
const uuid = require('uuidv4');
const moment = require('moment');

const createReflection = async (reflection, ownerId) => {
    const values = [
        uuid.uuid(),
        reflection.success,
        reflection.low_point,
        reflection.take_away,
        ownerId,
        moment(new Date()),
        moment(new Date())
    ]
    const { rows } = await db.query(createReflectionQuery, values);
    return rows[0];
}

const getAllReflections = async (ownerId) => await db.query(findAllReflectionsQuery, [ownerId]);
const getReflectionById = async (id, ownerId) => await db.query(findOneReflectionQuery, [id, ownerId]);
const updateReflection = async (data, id, ownerId) => {
    const { rows } = await getReflectionById(id, ownerId)
    if (!rows[0]) throw new Error('reflection not found');
    const values = [
        data.success || rows[0].success,
        data.low_point || rows[0].low_point,
        data.take_away || rows[0].take_away,
        moment(new Date()),
        id,
        ownerId
    ];
    const updated = await db.query(updateOneReflectionQuery, values);
    return updated.rows[0];
}

const deleteReflectionById = async (id, ownerId) => await db.query(deleteReflectionQuery, [id, ownerId]);

module.exports = { createReflection, getAllReflections, getReflectionById, updateReflection, deleteReflectionById }