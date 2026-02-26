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

/* ADD LIKE TO DATABASE */
app.post("/like", async (req, res) => {
  try{
    const { fromID, toID } = req.body;
    // You can't like yourself
    if(fromID === toID){
      return res.status(400).json({ message: "You cannot like yourself" });
    }
    // Check if like already exists
    const existingLike = await prisma.like.findUnique({
      where: {
        fromID_toID: {
          fromID: Number(fromID),
          toID: Number(toID)
        }
      }
    });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this user" });
    }
    // Create like
    await prisma.like.create({
      data: {
        fromID: Number(fromID),
        toID: Number(toID),
      }
    })
    // Check if reverse like exists
    const reverse = await prisma.like.findFirst({
      where: {
        fromID: Number(toID),
        toID: Number(fromID),
      }
    })
    if(reverse){
      return res.json({ match: true, message: "It's a match!!!"})
    }
    return res.json({ match: false, message:"Liked!"})
  }
  catch(error){
    console.log(error)
    res.status(500).json({ message: "Already liked or error"});
  }
})

/* GET ALL PROFILES */
app.get("/profiles", async (req, res) => {
  const profiles = await prisma.profile.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(profiles);
});
/* GET PROFILES */
app.get("/discover/:userID", async (req, res) => {
  try{
    const userID = Number(req.params.userID);
    const myLikes = await prisma.like.findMany({
      where: { fromID: userID }
    })
    const likedIDs = myLikes.map(like => like.toID);
    const likedMe = await prisma.like.findMany({
      where: { toID: userID }
    })
    const likedMeIDs = likedMe.map(like => like.fromID);
    const matchIDs = likedIDs.filter(id => likedMeIDs.includes(id));
    const matches = await prisma.profile.findMany({
      where: { id: { in: matchIDs }}
    }) 
    const notMatched = await prisma.profile.findMany({
      where: {
        id: {
          not: userID,
          notIn: matchIDs,
        }
      }
    })
    res.json({
      matches,
      notMatched,
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" })
  }
})
app.listen(5000, () => {
  console.log("Server running on port 5000");
});