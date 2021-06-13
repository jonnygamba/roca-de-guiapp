import { object, string } from 'yup'

export default object().camelCase().shape({
  originalFileName: string().required(),
  assetId: string().required(),
  secureUrl: string().url().required(),
  metadata: object().camelCase().shape({
    metadataUrl: string().url().required(),
    metadataOcr: string().optional(),
  })
})
