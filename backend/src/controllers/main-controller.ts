import 'dotenv/config'
import path from 'path'
import { Request, Response } from 'express'

export const index = async (req: Request, res: Response) => {

  try {
    res.sendFile(path.resolve('../frontend/build/index.html'))
  } catch (err) {
    res.status(500)
  }
}
