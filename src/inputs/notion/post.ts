import { NextApiRequest, NextApiResponse } from "next";
import input from "../../../src/schemas/input.js";
import notion from "../../../src/to/notion"

const toNotion = notion('https://api.notion.com/v1/pages')

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await input.validate(req.body.input);
    const result = await toNotion(data);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
}
