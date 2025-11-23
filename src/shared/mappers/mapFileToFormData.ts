import { ImageFile } from "../components/form/types";

export function mapFileToFormData(file: ImageFile): FormData {
  const formData = new FormData();

  const fileData = {
    uri: file.uri,
    name: file.fileName ?? "image.jpg",
    type: file.mimeType ?? "image/jpeg",
  } as any;

  formData.append("file", fileData);

  return formData;
}