const db = require('../database/db-config.js');

module.exports = {
  add,
  find,
  findById,
  findBy,
  remove
};

function find() {
  return db('users').select('id', 'username');
}


async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}


function remove(id){
  return db('users')
  .where('id', id)
  .del()
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findBy(filter){
return db('users').where(filter)
}