import { getRouteInstructionDataDecoder } from "../generated/instructions/route";

/**
 * Decode Jupiter route instruction data from base64
 * @param base64Data - Base64 encoded instruction data
 * @returns Decoded instruction data or null if failed
 */
export function decodeRouteData(base64Data: string) {
  try {
    const buffer = Buffer.from(base64Data, "base64");
    const uint8Array = new Uint8Array(buffer);
    const decoder = getRouteInstructionDataDecoder();
    const decoded = decoder.decode(uint8Array);
    return decoded;
  } catch (error) {
    console.error("Error decoding instruction data:", error);
    return null;
  }
}

/**
 * Helper to serialize BigInt values for JSON.stringify
 * @param obj - Object that may contain BigInt values
 * @returns Object with BigInt values converted to strings
 */
export function serializeBigInt(obj: any): any {
  if (typeof obj === "bigint") {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }
  if (obj !== null && typeof obj === "object") {
    const result: any = {};
    for (const key in obj) {
      result[key] = serializeBigInt(obj[key]);
    }
    return result;
  }
  return obj;
}

/**
 * Decode and pretty print Jupiter route instruction data
 * @param base64Data - Base64 encoded instruction data
 * @param label - Optional label for the output
 */
export function logDecodedRouteData(base64Data: string, label?: string) {
  const decodedData = decodeRouteData(base64Data);
  if (decodedData) {
    console.log(label ? `\n--- ${label} ---` : "\n--- Decoded Route Data ---");
    console.log(JSON.stringify(serializeBigInt(decodedData), null, 2));
  }
}