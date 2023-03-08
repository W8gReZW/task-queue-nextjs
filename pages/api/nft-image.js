// pages/api/nft-image.js
import { nftImageQueue } from '../../lib/queue'
import { validate } from '@hapi/joi'

export default async (req, res) => {
  try {
    // Validate the request body
    const schema = Joi.object({
      image_path: Joi.string().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
      throw new Error(error.details[0].message)
    }

    // Create a new job and return the job ID
    const job = await nftImageQueue.add(req.body)
    res.status(200).json({ task_id: job.id })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Image processing failed' })
  }
}
