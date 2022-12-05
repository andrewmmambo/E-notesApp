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

async function createNote(note)
{
    let sql;
    if(note.note_id){
        sql =`INSERT * INTO notes (noteContent)
        VALUES ('${note.noteContent}');`
    }else {
        sql = `INSERT * INTO notes
        WHERE user_id = '${user.user_id}';`
    }
    return con.query(sql);
}

async function getNote(note)
{
    let sql;
    if(note.note_id){
        sql =`SELECT * FROM notes
        WHERE note_id = ${note.note_id};`
    }else {
        sql = `SELECT * FROM notes
        WHERE email = "${note.email}";`
    }
    return con.query(sql);
}

async function editNote(note)
{
    const sql = `UPDATE notes SET noteContent = "${note.noteContent}"
    WHERE note_id = ${note.note_id}`;

    con.query(sql);
    const updatedNote = await getNote(note);
    return updatedNote[0];
}

async function deleteNote(note) {
    const sql = `DELETE FROM notes
    WHERE note_id = ${note.note_id}`;
    con.query(sql);
}

module.exports = { createNote, getNote, editNote, deleteNote};