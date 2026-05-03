import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null 
        //upload the file on cloudinary
        const fixedPath = localFilePath.replace(/\\/g, "/")  // ← NEW LINE
        const response = await cloudinary.uploader.upload(fixedPath, {  // ← CHANGED
            resource_type: "auto",
        })
        // file has beem uploaded successfully
        // console.log("file is uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log("CLOUDINARY ERROR:", error.message)  // ← NEW LINE
        fs.unlinkSync(localFilePath)
        return null;
    }
}



export {uploadOnCloudinary}