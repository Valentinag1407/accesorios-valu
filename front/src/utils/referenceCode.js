import { v4 as uuidv4 } from "uuid";

export const generateReferenceCode = (usuario) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  return `ORDER-${usuario.id}-${timestamp}-${uniqueId}`;
};
