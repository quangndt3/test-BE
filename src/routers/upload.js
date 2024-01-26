import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary";
import { deleteImage, uploadImage } from "../controllers/upload";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nhom3",
    format: [],
  },
});
const upload = multer({
  storage: storage,
});

router.post("/images", upload.array("images", 4), uploadImage);
router.delete("/images/:publicId", deleteImage);
export default router;