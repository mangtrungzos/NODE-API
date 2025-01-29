import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { IProduct, Product } from "./src/models/product.model";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        // const { id } = req.params;
        const products = await Product.findById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put('/api/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return next(res.status(400).json({message: "Product not found!"}));
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/girls/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return next(res.status(400).json({message: "Product not found"}));
        }
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

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
