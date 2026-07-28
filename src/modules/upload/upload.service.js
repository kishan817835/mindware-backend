import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../helpers/upload/upload.helper.js";
import AppError from "../../errors/AppError.js";

export const uploadMultipleFilesToS3 = async (files) => {
    if (!files || files.length === 0) return [];

    const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await s3Client.send(command);
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    });

    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        throw new AppError("Failed to upload images to S3", 500);
    }
};