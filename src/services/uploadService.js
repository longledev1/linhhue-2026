import { supabase } from "../config/supabaseClient";

/**
 * Upload 1 ảnh Thumbnail
 *
 * @param {File} file
 * @param {string} bucket
 * @param {string} folder
 *
 * Ví dụ:
 * apartments/thumbnails/...
 * houses/thumbnails/...
 * lands/thumbnails/...
 */
export const uploadSingleImage = async (
  file,
  bucket = "apartments",
  folder = "apartments",
) => {
  try {
    if (!file) return null;

    const fileExt = "webp";

    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}.${fileExt}`;

    const filePath = `${folder}/thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Lỗi uploadSingleImage:", error.message);
    throw error;
  }
};

/**
 * Upload nhiều ảnh Slides
 *
 * @param {File[]} files
 * @param {string} bucket
 * @param {string} folder
 *
 * Ví dụ:
 * apartments/slides/...
 * houses/slides/...
 * lands/slides/...
 */
export const uploadMultipleImages = async (
  files,
  bucket = "apartments",
  folder = "apartments",
) => {
  try {
    if (!files || files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
      const fileExt = "webp";

      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;

      const filePath = `${folder}/slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      return data.publicUrl;
    });

    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Lỗi uploadMultipleImages:", error.message);
    throw error;
  }
};
