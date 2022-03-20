const createUserTableText =
  `CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_date TIMESTAMP,
    modified_date TIMESTAMP
  )`;

const deleteUserTableText = 'DROP TABLE IF EXISTS users returning *';

const createUserQuery = `INSERT INTO
      users(id, email, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
const findUserByEmailQuery = 'SELECT * FROM users WHERE email = $1';
const findUserByIdQuery = 'SELECT * FROM users WHERE id = $1';
const findAllUsersQuery = 'SELECT * FROM users';
const deleteUserQuery = 'DELETE FROM users WHERE id=$1 returning *';
module.exports = { createUserTableText, deleteUserTableText, deleteUserQuery, createUserQuery, findUserByEmailQuery, findAllUsersQuery, findUserByIdQuery }