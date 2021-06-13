import { NextApiRequest, NextApiResponse } from "next";
import input from "../../../src/schemas/input.js";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await input.validate(req.body.input);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
}
