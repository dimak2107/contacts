const Router = require('express')

const router = new Router()

const contactController = require('../controller/contact.controller')

router.post('/contact', contactController.createContact)
router.get('/contact', contactController.getContacts)
router.put('/contact', contactController.updateContact)
router.delete('/contact/:id', contactController.deleteContact)

module.exports = router
