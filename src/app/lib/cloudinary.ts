import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadBase64Image(base64: string, folder = "miners") {
  const dataUri = base64.startsWith("data:") ? base64 : `data:image/jpeg;base64,${base64}`;
  const res = await cloudinary.uploader.upload(dataUri, { folder });
  return { url: res.secure_url, public_id: res.public_id };
}

export async function destroyByPublicId(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}
