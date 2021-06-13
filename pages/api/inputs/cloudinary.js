import nc from "next-connect";

import schema from "../../../src/schemas/cloudinary";
import toNotion from "../../../src/inputs/notion/post";

const middleware = async (req, res, next) => {
  try {
    const body = await req.body;
    console.log(typeof body, "bod");
    console.log(body.secure_url, "secure");
    const data = await schema.validate({
      ...body,
      database: req.query.database,
    });
    req.body.input = normalize(data);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
    return;
  }
};

const handler = nc().use(middleware).post(toNotion);

export default handler;

function normalize(data) {
  return {
    timestamp: data.originalFileName,
    description: data.metadata.metadataOcr,
    url: data.metadata.metadataUrl,
    database: data.database,
    initiator: {
      which: "cloudinary",
      imageUrl: data.secureUrl,
      id: data.assetId,
    },
  };
}
