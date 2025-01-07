import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

// routes
app.get("/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Quynh Pham"
        },
        {
            id: 2,
            name: "Queen"
        },
        {
            id: 3,
            name: "Dev"
        }
    ];
    res.json(users);
});

// starts
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});