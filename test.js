import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userSchema from "./models/userSchema.js";

const dataConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://umar:040401@cluster0.1cmquul.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Successfully logged in"));
};
dataConnect();
const PORT = process.env.PORT || 8083


const app = express();

app.use(json());
app.use(cors());

app.get('/getAll', async (req, res)=>{
    const data = await userSchema.find()
    res.json(data)
})

app.post("/post", async (req, res) => {
  try {
    const { userName, title } = req.body;
    if(!userName || !title) return res.status(400).json({ message: "userName or title do not find" });
    const post = new userSchema({ userName, title });
    await post.save();
    res.status(200).json({ message: "OK" });
  } catch (err) {
    res.status(400).json({ message: "Error /post" });
  }
});

app.get('/test', (res, req)=> {
    res.send('<h1>Server Working</h1>')
})


app.listen(PORT, () => console.log("Server yurdi " + PORT));
