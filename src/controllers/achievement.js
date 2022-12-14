const Achievement = require('../models/Achievement')
const asyncWrapper = require('../middlewares/async-wrapper')
const { deleteFiles } = require('../utils/files')

const getAchievements = asyncWrapper(async (req, res) => {
  const achievements = await Achievement.find({})
  if (achievements) {
    return res.status(200).send({ data: achievements })
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
  return res.status(404).send({ errorMessage: 'Achievement not found' })
})

const deleteAchievement = asyncWrapper(async (req, res) => {
  const achievement = await Achievement.findByIdAndDelete(
    req.params.achievementId
  )
  if (achievement) {
    const errors = []
    if (achievement.images.length) {
      errors.push(...(await deleteFiles(achievement.images)))
    }

    if (achievement.videos.length) {
      errors.push(...(await deleteFiles(achievement.videos)))
    }
    return res.status(200).send({ id: achievement.id, errors })
  }
  return res.status(404).send({ errorMessage: 'Achievement not found' })
})

const updateAchievement = asyncWrapper(async (req, res) => {
  const achievementOld = await Achievement.findById(req.params.achievementId)

  if (!achievementOld) {
    return res.status(404).send({ errorMessage: 'Achievement not found' })
  }

  const errors = []

  if (achievementOld.images.length) {
    const unusedImages = []
    for (const image of achievementOld.images) {
      if (!req.body.images.includes(image)) {
        unusedImages.push(image)
      }
    }

    if (unusedImages.length) {
      errors.push(...(await deleteFiles(unusedImages)))
    }
  }

  if (achievementOld.videos.length) {
    const unusedVideos = []
    for (const video of achievementOld.videos) {
      if (!req.body.videos.includes(video)) {
        unusedVideos.push(video)
      }
    }

    if (unusedVideos.length) {
      errors.push(...(await deleteFiles(unusedVideos)))
    }
  }

  const achievement = await Achievement.findByIdAndUpdate(
    req.params.achievementId,
    req.body,
    { new: true }
  )
  if (achievement) {
    return res.status(200).send({ achievement, errors })
  }
  return res.status(404).send({ errorMessage: 'Achievement not found' })
})

module.exports = {
  getAchievements,
  getAchievement,
  postAchievement,
  deleteAchievement,
  updateAchievement,
}
