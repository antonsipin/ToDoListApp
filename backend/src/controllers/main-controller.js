import 'dotenv/config'
import path from 'path'

export const index = async (req, res) => {

  try {
    res.sendFile(path.resolve('../frontend/build/index.html'))
  } catch (err) {
    res.status(500)
  }
}
