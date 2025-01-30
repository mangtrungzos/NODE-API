import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ProductRoute from "./src/routes/product.route";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', ProductRoute);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to Database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

// start
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
