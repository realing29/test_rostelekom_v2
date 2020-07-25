const { Router } = require('express')
const router = Router()
const { copy } = require('../controllers/copy.controller')

// /api/copy
router.put('/', copy)

module.exports = router