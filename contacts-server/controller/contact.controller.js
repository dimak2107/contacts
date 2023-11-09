const db = require('../db')


class ContactController {
    async createContact(request, response) {
        const {name, phone}=request.body
        const newContact = await db.query(`INSERT INTO contact (name, phone) values ($1, $2) RETURNING *`, [name, phone])
        response.json(newContact.rows[0])
    }
    async getContacts(request, response) {
        const contacts = await db.query(`SELECT * FROM contact`)
        response.json(contacts.rows)
    }
    async updateContact(request, response) {
        const {id, name, phone} = request.body
        const updatedContact = await db.query(`UPDATE contact set name = $1, phone = $2 where id=$3 RETURNING *`, [name, phone, id])
        response.json(updatedContact.rows[0])
    }
    async deleteContact(request, response) {
        const id = request.params.id
        const deletedContact = await db.query(`DELETE FROM contact WHERE id=$1 RETURNING *`, [id])
        response.json(deletedContact.rows[0])
    }
}

module.exports = new ContactController()