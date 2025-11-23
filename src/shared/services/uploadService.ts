import {
    SUPABASE_BUCKET_NAME,
    SUPABASE_FINAL_FOLDER,
    SUPABASE_TMP_FOLDER,
} from "@/features/config/enviroment";
import { supabaseClient } from "@/features/config/supabaseClient";
import { fileUriToArrayBuffer } from "../utils/fileUriToArrayBuffer";

export interface StorageRepository {
    uploadFile(
        fileUri: string,
        fileName: string,
        mimeType: string
    ): Promise<{ path: string; publicUrl: string; finalPath: string }>;

    confirmUpload(fromPath: string): Promise<{ path: string; publicUrl: string }>;

    discardFile(path: string): Promise<void>;

    deleteFile(path: string): Promise<void>;
}

export const storageRepository: StorageRepository = {
    async uploadFile(
        fileUri: string,
        fileName: string,
        mimeType: string
    ): Promise<{ path: string; publicUrl: string; finalPath: string }> {
        const filePath = `${SUPABASE_TMP_FOLDER}/${fileName}`;

        const arrayBuffer = await fileUriToArrayBuffer(fileUri);

        const { error } = await supabaseClient.storage
            .from(SUPABASE_BUCKET_NAME)
            .upload(filePath, arrayBuffer, {
                contentType: mimeType,
                upsert: false,
            });

        if (error) {
            console.error("Error en uploadFile:", error);
        }

        const { data } = supabaseClient.storage.from(SUPABASE_BUCKET_NAME).getPublicUrl(filePath);

        const finalPath = data.publicUrl.replace(`${SUPABASE_TMP_FOLDER}/`, `${SUPABASE_FINAL_FOLDER}/`);

        return { path: filePath, publicUrl: data.publicUrl, finalPath };
    },

    async confirmUpload(fromPath: string): Promise<{ path: string; publicUrl: string }> {
        const toPath = fromPath.replace(`${SUPABASE_TMP_FOLDER}/`, `${SUPABASE_FINAL_FOLDER}/`);

        const { error } = await supabaseClient.storage
            .from(SUPABASE_BUCKET_NAME)
            .move(fromPath, toPath);

        if (error) {
            console.error("Error en confirmUpload:", error);
        }

        const { data } = supabaseClient.storage.from(SUPABASE_BUCKET_NAME).getPublicUrl(toPath);
        return { path: toPath, publicUrl: data.publicUrl };
    },

    async discardFile(path: string): Promise<void> {
        const { error } = await supabaseClient.storage.from(SUPABASE_BUCKET_NAME).remove([path]);

        if (error) {
            console.error("Error en discardFile:", error);
        }
    },

    async deleteFile(path: string): Promise<void> {
        const { error } = await supabaseClient.storage.from(SUPABASE_BUCKET_NAME).remove([path]);

        if (error) {
            console.error("Error en deleteFile:", error);
        }
    },
};
