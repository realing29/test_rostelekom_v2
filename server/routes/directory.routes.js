const { Router } = require('express')
const router = Router()
const { directory } = require('../controllers/directory.controller')

// /api/directory
router.get('/:path', directory)

module.exports = router