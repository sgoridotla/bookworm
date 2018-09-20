import express from 'express';
import path from 'path';
import auth from "./routes/auth";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import dotenv from "dotenv";



const app = express();
app.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
app.use('/api/auth', auth);

app.post('/api/auth', (req, res) => {
    res.status(400).json({ errors: { global: "Invalid credentials" }});
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080'));

