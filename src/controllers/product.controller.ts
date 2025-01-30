import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.model";

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getProductsById = async (req: Request, res: Response) => {
    try {
        // const { id } = req.params;
        const products = await Product.findById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return next(res.status(400).json({message: "Product not found!"}));
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
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
};

export { getProducts, getProductsById, createProduct, updateProduct, deleteProduct };


