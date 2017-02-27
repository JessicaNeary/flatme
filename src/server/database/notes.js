const knex = require('knex')

module.exports = {
  addNote,
  deleteNote,
  getNotes
}

function addNote (note) {
  return knex('notes')
    .insert({
      flat_id: note.flat_id,
      content: note.content,
      author: note.author
    })
    .then(getNotes(note.flat_id))
}

function deleteNote (id) {
  return knex('notes')
    .where('id', id)
    .del()
}

function getNotes (id) {
  return knex('notes')
    .where('flat_id', id)
    .then(notes => {
      return notes.map(note => {
        return {
          id: note.id,
          content: note.content,
          author: note.author
        }
      })
    })
}
