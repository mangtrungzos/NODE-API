"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./src/models/product.model");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Welcome to the Courses API!");
});
app.get('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.get('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.params;
        const products = yield product_model_1.Product.findById(req.params.id);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.post('/api/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
app.put('/api/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_model_1.Product.findByIdAndUpdate(id, req.body);
        // if (!product) {
        //     return res.status(400).json({message: "Product not found!"});
        // }
        // const updateProduct = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
mongoose_1.default.connect(process.env.MONGODB_URL)
    .then(() => {
    console.log("Connected to Database!");
})
    .catch(() => {
    console.log("Connection failed!");
});
// starts
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
//# sourceMappingURL=index.js.map