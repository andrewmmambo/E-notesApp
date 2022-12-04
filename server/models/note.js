const { con } = require("./db_connect");

async function createTable()
{
    let sql = `CREATE TABLE IF NOT EXISTS notes(
        note_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        CONSTRAINT user_pk FOREIGN KEY (user_id) REFERENCES users(user_id),
        noteContent VARCHAR(8000) NOT NULL
    );`
      con.query(sql);
}
createTable();

async function getNote(note)
{
    let sql;
    if(note.noteId){
        sql =`SELECT * FROM notes
        WHERE note_id = ${note.noteId};`
    }else {
        sql = `SELECT * FROM notes
        WHERE email = "${note.email}";`
    }
    return con.query(sql);
}

async function editNote(note)
{
    const sql = `UPDATE notes SET email = "${note.email}"
    WHERE note_id = ${note.noteId}`;

    con.query(sql);
    const updatedNote = await getNote(note);
    return updatedNote[0];
}

async function deleteNote(noteId) {
    const sql = `DELETE FROM notes
    WHERE note_id = ${noteId}`;
    con.query(sql);
}

module.exports = { getNote, editNote, deleteNote};