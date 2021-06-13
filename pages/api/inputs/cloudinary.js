import nc from "next-connect";

import schema from "../../../src/schemas/cloudinary";
import toNotion from "../../../src/inputs/notion/post";

const middleware = async (req, res, next) => {
  try {
    const body = await req.body;
    const data = await schema.validate({
      ...body,
      database: req.query.database,
    });
    req.body.input = normalize(data);
    next();
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

const handler = nc().use(middleware).post(toNotion);

export default handler;

function normalize(data) {
  return {
    timestamp: data.original_filename,
    description: data.metadata.metadata_ocr,
    url: data.metadata.metadata_url,
    database: data.database,
    initiator: {
      which: "cloudinary",
      imageUrl: data.secure_url,
      id: data.asset_id,
    },
  };
}
