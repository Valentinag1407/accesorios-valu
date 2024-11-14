import { MD5 } from "crypto-js";

export function calculateMD5(apiKey, merchantId, reference, price, currency) {
  const concatenatedArray = [apiKey, merchantId, reference, price, currency];
  const concatenatedString = concatenatedArray.join("~");
  const hash = MD5(concatenatedString).toString();
  return hash;
}
