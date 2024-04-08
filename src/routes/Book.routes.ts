import express from "express";
import BookController from "../controllers/BookController";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";

    // Create the 'uploads/' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/upload", upload.single("file"), BookController.uploadData);
router.get("/generate-report", BookController.generateReport);

router.post("/create", BookController.createBook);
router.get("/get/:bookId", BookController.readBook);
// router.get("/get", BookController.readAll);
router.patch("/update/:bookId", BookController.updateBook);
router.delete("/delete/:bookId", BookController.deleteBook);

export = router;
