export default function (error: unknown, message = "") {
  if (error instanceof Error) {
    return error.message;
  }

  return message;
};