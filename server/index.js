import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/* CREATE PROFILE */
app.post("/profiles", async (req, res) => {
  try {
    const { name, age, gender, bio, email } = req.body;
    const parsedAge = Number(age);
    if (!name || !parsedAge || !email){
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (parsedAge < 18){
      return res.status(400).json({ message: "Must be 18+" });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        age: Number(age),
        gender,
        bio,
        email,
      },
    });

    return res.status(201).json(profile);
  } catch (error){
    console.error(error)
    return res.status(500).json({ message: "Email already exists or server error" });
  }
});

/* GET ALL PROFILES */
app.get("/profiles", async (req, res) => {
  const profiles = await prisma.profile.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(profiles);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});