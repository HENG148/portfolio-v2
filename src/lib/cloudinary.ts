import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

console.log("cloudinary config check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  secret_length: process.env.CLOUDINARY_API_SECRET?.length,
  secret_preview: process.env.CLOUDINARY_API_SECRET?.slice(0, 3) + "..." + process.env.CLOUDINARY_API_SECRET?.slice(-3),
});

export default cloudinary;