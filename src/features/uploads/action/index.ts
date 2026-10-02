"use server";

import type { UploadApiResponse } from "cloudinary";
import cloudinary from "@/src/lib/cloudinary";
import { withAuthAction } from "@/src/middleware/auth.middleware";

export const uploadImageAction = withAuthAction(
  async (auth, formData: FormData) => {
    try {
      const file = formData.get("file") as File;
      if (!file) throw new Error("No file provided");

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "portfolio" }, (err, res) => {
            if (err || !res) return reject(err ?? new Error("Upload failed"));
            resolve(res);
          })
          .end(buffer);
      });

      return {
        success: true,
        url: result.secure_url,
      };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Upload failed" };
    }
  }
);