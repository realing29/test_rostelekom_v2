const { Router } = require('express')
const router = Router()
const { disks } = require('../controllers/disks.controller')

// /api/disks
router.get('/', disks)

module.exports = router