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
exports.postCategorie = exports.getCategories = void 0;
const category_1 = __importDefault(require("../models/category"));
const getCategories = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_1.default.findAll();
    resp.json({ categories });
});
exports.getCategories = getCategories;
const postCategorie = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const categorie = yield category_1.default.create({
        name
    });
    resp.json(categorie);
});
exports.postCategorie = postCategorie;
//# sourceMappingURL=categories.js.map