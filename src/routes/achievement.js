const express = require('express')

const router = express.Router()

const {
  postAchievement,
  getAchievement,
  getAchievements,
  updateAchievement,
  deleteAchievement,
} = require('../controllers/achievement')

router.get('/', getAchievements)

router.post('/', postAchievement)

router.get('/:achievementId', getAchievement)

router.put('/:achievementId', updateAchievement)

router.delete('/:achievementId', deleteAchievement)

module.exports = router
