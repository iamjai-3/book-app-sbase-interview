import { NextFunction, Request, Response } from "express";
import xlsx from "xlsx";
import { db } from "../drizzle/db";
import { Book } from "../drizzle/schema";
import { generateWeeklyReport } from "../library/GenerateReport";

const createBook = (req: Request, res: Response, next: NextFunction) => {};

const readBook = (req: Request, res: Response, next: NextFunction) => {};

const generateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = await generateWeeklyReport();
  res.status(200).json({
    deletedRecords: data?.deletedRecords,
    newRecords: data?.newlyInsertedRecords,
  });
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {};

const uploadData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).send("File not uploaded");
    }
    const filename = `uploads/${req.file.originalname}`;

    const workbook = xlsx.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any = xlsx.utils.sheet_to_json(worksheet);

    const serializedData = data.map((row: any) => {
      const obj: any = {};
      for (let key in row) {
        const lowercaseKey = key.toLowerCase();
        obj[lowercaseKey] = row[key];
      }
      return obj;
    });

    const insertedData = await db
      .insert(Book)
      .values(serializedData)
      .returning();

    if (insertedData?.length === serializedData?.length) {
      res.status(200).json({ message: "Data Uploaded successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
};

export default {
  createBook,
  generateReport,
  readBook,
  updateBook,
  deleteBook,
  uploadData,
};