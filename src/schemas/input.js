import { object, number, string } from "yup";

export default object({
  timestamp: number().test("is-time-allowed", "Time not allowed", (value) => {
    const time = new Date(value).getTime();

    // TODO: split timestamp and time gap validations.
    if (!isNumeric(time)) return false;
    if (Date.now() / 1000 - time > 3600) return false;

    return value;
  }),
  url: string().url().required(),
  description: string().optional(),
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
