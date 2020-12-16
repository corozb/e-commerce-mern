import express from 'express'
import expressAsyncHanlder from 'express-async-handler'

import data from '../data.js'
import User from '../models/userModel.js'

const userRouter = express.Router()

userRouter.get(
  '/seed',
  expressAsyncHanlder(async (req, res) => {
    // await User.remove({})
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
  })
)

export default userRouter
