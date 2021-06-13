import notion from "../../../src/to/notion";
const toNotion = notion("https://api.notion.com/v1/pages");

async function handler(req, res) {
  try {
    const data = await toNotion(req.body);
    return req.status(201).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export default handler;
