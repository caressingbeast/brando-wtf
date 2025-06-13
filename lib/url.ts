import { nanoid } from "nanoid";

// Generate a random short code
export function generateShortCode(length = 6): string {
  return nanoid(length);
}
