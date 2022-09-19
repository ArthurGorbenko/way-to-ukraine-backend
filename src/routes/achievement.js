const express = require('express')

const router = express.Router()

const { postAchievement } = require('../controllers/achievement')

router.get('/', (req, res) => {})

router.post('/', postAchievement)

router.get('/:achievementId', (req, res) => {})

router.put('/:achievementId', (req, res) => {})

router.delete('/:achievementId', (req, res) => {})

module.exports = router
