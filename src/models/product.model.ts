import mongoose, { Schema, model } from "mongoose";

interface IProduct {
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

interface IProductDocument extends IProduct {
    createdAt: Date,
    updatedAt: Date
}

const productSchema = new Schema<IProductDocument>(
    {
        name: {
            type: String,
            required: [true, 'Please enter a name'],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
);

const Product = model<IProductDocument>("Product", productSchema);
export { Product, IProduct, IProductDocument };