import { object, string } from "yup";

export default object().shape({
  original_filename: string().required(),
  asset_id: string().required(),
  secure_url: string().url().required(),
  database: string().required(),
  metadata: object().shape({
    metadata_url: string().url().required(),
    metadata_ocr: string().optional(),
  }),
});
