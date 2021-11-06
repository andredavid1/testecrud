import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import City from '../../../models/City'

type CityType = {
  _id?: string;
  uf: string;
  name: string;
}

type Data = {
  success: boolean;
  data?: CityType[] | CityType;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req
  
  await dbConnect()
  
  switch (method) {
    case 'GET':
      try {
        const cities = await City.find({})
        res.status(200).json({ success: true, data: cities })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const city = await City.create(
          req.body
        )
        res.status(201).json({ success: true, data: city })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
