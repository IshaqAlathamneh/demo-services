const { Pool } = require('pg');
const {createUserTableText, deleteUserTableText} = require('./user')
const {createReflectionTableText, deleteReflectionTableText} = require('./reflection')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const tables = [
  {
    create: createUserTableText,
    delete: deleteUserTableText
  },
  {
    create: createReflectionTableText,
    delete: deleteReflectionTableText
  }
]

/**
 * Create Tables
 */

const createTables = () => {
  tables.map(model => {
    pool.query(model.create)
      .then((res) => {
        console.log(res);
        // pool.end();
      })
      .catch((err) => {
        console.log(err);
        // pool.end();
      });
  })
}

/**
 * Drop Tables
 */
// const dropTables = () => {
//   tables.map(model => {
//     pool.query(model.delete)
//       .then((res) => {
//         console.log(res);
//         pool.end();
//       })
//       .catch((err) => {
//         console.log(err);
//         pool.end();
//       });
//   })
// }


module.exports = {
  createTables,
  pool
};