import { getRouteInstructionDataDecoder } from "../generated/instructions/route";

/**
 * Decode Jupiter route instruction data from base64
 * @param base64Data - Base64 encoded instruction data
 * @returns Decoded instruction data or null if failed
 */
export function decodeRouteData(base64Data: string) {
    const buffer = Buffer.from(base64Data, "base64");
    const uint8Array = new Uint8Array(buffer);
    const decoder = getRouteInstructionDataDecoder();
    const decoded = decoder.decode(uint8Array);
    return decoded;
}
