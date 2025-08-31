import { nanoid } from "nanoid";

export const generateNanoId = (length) => {
    return nanoid(length); // Generates a short code of specified length
}