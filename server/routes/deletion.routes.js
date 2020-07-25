const { Router } = require('express')
const router = Router()
const { deletion } = require('../controllers/deletion.controller')

// /api/deletion
router.delete('/', deletion)

module.exports = router