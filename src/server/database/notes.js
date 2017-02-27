const knex = require('knex')

module.exports = {
  addNote,
  deleteNote,
  getNotesByFlatId
}

function addNote (note) {
  return knex('notes')
    .insert({
      flat_id: note.flat_id,
      content: note.content,
      author: note.author
    })
    .returning('id')
    .then(noteId => {
      return getNoteById(noteId[0])
    })
}

function deleteNote (id) {
  return knex('notes')
    .where('id', id)
    .del()
}

function getNoteById (id) {
  return knex('notes')
    .where('id', id)
}

function getNotesByFlatId (flatId) {
  console.log('getting notes for', flatId)
  return knex('notes')
    .where('flat_id', flatId)
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
