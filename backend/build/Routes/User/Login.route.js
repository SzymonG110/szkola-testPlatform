"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_type_1 = __importDefault(require("../../Types/Route.type"));
class default_1 extends Route_type_1.default {
    constructor() {
        super();
        this.route = '/user/login';
        this.methods.push({
            method: 'post',
            async run(req, res, next) {
                const userId = 1;
                const username = 'OK';
                req.session.user = {
                    userId,
                    username
                };
                return {
                    success: {
                        username,
                        userId
                    }
                };
            }
        });
    }
}
exports.default = default_1;
