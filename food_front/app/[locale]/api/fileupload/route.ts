import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const folderName = (formData.get("folderName") as string) || "products";
    const coverFileName = formData.get("coverFileName") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ msg: "No files found", statusCode: 404 });
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cloudinaryResult = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: folderName },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(buffer);
      });

      const isCover = file.name === coverFileName;

      return {
        url: cloudinaryResult.secure_url,
        isCover: isCover,
        public_id: cloudinaryResult.public_id,
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    return NextResponse.json({
      msg: "All files uploaded successfully",
      images: uploadedImages,
      statusCode: 200,
    });
  } catch (error) {
    return NextResponse.json({ msg: "Error in file upload", statusCode: 500 });
  }
}
