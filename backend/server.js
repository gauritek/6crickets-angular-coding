import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.port || 3000;


//Set a fixed deadline (e.g., 1 hour from server start)
const defaultDeadline = new Date(Date.now() + 60 * 60 * 1000);

app.get('/api/deadline', (req, res) => {
    const now = new Date();
    const diffInSeconds = Math.max(0, Math.floor((defaultDeadline - now) / 1000));
    res.json({ secondsLeft: diffInSeconds });
})

app.listen(PORT, () => {
    console.log(`Server started and running successfully at http://localhost:${PORT}`);
})