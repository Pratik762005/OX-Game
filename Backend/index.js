import dotenv from "dotenv";
import express from "express";

const app = express();


app.get('/first_Page/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(process.env.PORT||3000, () => {
    console.log('Server is running on port 3000');
});