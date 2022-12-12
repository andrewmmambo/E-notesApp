const con = require("./db_connect");

async function createTable()
{
    let sql = `CREATE TABLE IF NOT EXISTS notes(
        note_id INT NOT NULL AUTO_INCREMENT,
        noteContent VARCHAR(8000),
        user_id INT NOT NULL,
        CONSTRAINT note_pk PRIMARY KEY(note_id),
        CONSTRAINT user_fk FOREIGN KEY(user_id) REFERENCES users(user_id)            
    );`
      await con.query(sql);
}
createTable();

async function createNote(note)
{
    let sql; 
    sql =`INSERT INTO notes (noteContent, user_id)
    VALUES ("${note.noteContent}", "${note.user_id}");`
    return con.query(sql);
}

async function getNote(user)
{
    let sql;
    sql =`SELECT * FROM notes
        WHERE user_id = "${user.user_id}";`
    return con.query(sql);
}

/*async function editNote(note)
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
*/
module.exports = { createNote, getNote};