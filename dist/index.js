"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + '/../.env' });
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
let users = [
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
// CREATE
app.post('/users', (req, res) => {
    const newUser = {
        name: req.body.name,
        id: Date.now(),
    };
    users.push(newUser);
    res.json(newUser);
});
// READ
app.get('/users', (req, res) => {
    res.json(users);
});
// UPDATE
app.put('/users', (req, res) => {
    const { id, name } = req.body;
    users = users.map(user => {
        if (user.id === id) {
            user.name = name;
        }
        return user;
    });
    res.json(users);
});
// starts
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
//# sourceMappingURL=index.js.map