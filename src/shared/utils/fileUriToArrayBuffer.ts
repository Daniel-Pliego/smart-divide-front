import { decode } from "base64-arraybuffer";
import { readAsStringAsync } from "expo-file-system/legacy";

export async function fileUriToArrayBuffer(uri: string): Promise<ArrayBuffer> {
  const base64 = await readAsStringAsync(uri, {
    encoding: "base64",
  });

  return decode(base64);
}