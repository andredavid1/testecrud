import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import City from '../../../models/City'

type CityType = {
  _id: string;
  uf: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type Data = {
  success: boolean;
  data?: {} | CityType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const city = await City.findById(id)
        if (!city) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: city })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':
      try {
        const city = await City.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!city) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: city })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const deletedCity = await City.deleteOne({ _id: id })
        if (!deletedCity) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
