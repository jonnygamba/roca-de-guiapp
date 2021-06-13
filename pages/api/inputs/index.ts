import { NextApiRequest, NextApiResponse } from 'next'
import input from "../../../src/schemas/input.js"

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try{ 
    //const data =  await input.validate(req.body)
    return res.status(201).json(req.body)
  } catch (error) {
     console.log(error, 'error')
    return res.status(400).json(error)  
  }
}
