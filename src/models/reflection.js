const createReflectionTableText =
  `CREATE TABLE IF NOT EXISTS
      reflections(
        id UUID PRIMARY KEY,
        success TEXT NOT NULL,
        low_point TEXT NOT NULL,
        take_away TEXT NOT NULL,
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

const deleteReflectionTableText = 'DROP TABLE IF EXISTS reflections returning *';
const createReflectionQuery = `INSERT INTO
      reflections(id, success, low_point, take_away, owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

const findAllReflectionsQuery = 'SELECT * FROM reflections where owner_id = $1';
const findOneReflectionQuery = 'SELECT * FROM reflections WHERE id = $1 AND owner_id = $2';
const updateOneReflectionQuery = `UPDATE reflections
      SET success=$1,low_point=$2,take_away=$3,modified_date=$4
      WHERE id=$5 AND owner_id = $6 returning *`;
const deleteReflectionQuery = 'DELETE FROM reflections WHERE id=$1 AND owner_id = $2 returning *';
module.exports = {
  createReflectionTableText,
  deleteReflectionTableText,
  createReflectionQuery,
  updateOneReflectionQuery,
  deleteReflectionQuery,
  findOneReflectionQuery,
  findAllReflectionsQuery
}