const Achievement = require('../models/Achievement')
const asyncWrapper = require('../middlewares/async-wrapper')

const getAchievements = asyncWrapper(async (req, res) => {
  const achievements = await Achievement.find({})
  if (achievements) {
    return res.status(200).send(achievements)
  }
  return res.status(404).send({ errorMessage: 'Achievements not found' })
})

const getAchievement = asyncWrapper(async (req, res) => {
  const achievement = await Achievement.findById(req.params.achievementId)
  if (achievement) {
    return res.status(200).send(achievement)
  }
  return res.status(404).send({ errorMessage: 'Achievement not found' })
})

const postAchievement = asyncWrapper(async (req, res) => {
  const user = await Achievement.create(req.body)
  if (user) {
    return res.status(201).send(user)
  }
})

const deleteAchievement = asyncWrapper(async (req, res) => {})

const updateAchievement = asyncWrapper(async (req, res) => {})

module.exports = {
  getAchievements,
  getAchievement,
  postAchievement,
  deleteAchievement,
  updateAchievement,
}
