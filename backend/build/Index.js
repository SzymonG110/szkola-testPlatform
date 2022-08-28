"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Index = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const Handler_1 = __importDefault(require("./Handler"));
const cors_1 = __importDefault(require("cors"));
class Index {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 8006;
        this.secret = 'OIHUmouINu8JioMHEYIumbBUMuiAMmĆuyiDnuyInyuNSbiuyAuyi';
        this.setup();
        new Handler_1.default(this.app);
        this.listen();
    }
    setup() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, express_session_1.default)({
            secret: `${this.secret}`,
            cookie: {
                maxAge: 60 * 60 * 1000 //60 min
            },
            resave: true,
            saveUninitialized: true
        }));
        this.app.use((0, cors_1.default)());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
}
exports.Index = Index;
new Index();
