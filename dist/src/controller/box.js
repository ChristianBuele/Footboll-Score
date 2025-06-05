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
exports.getPeleaById = exports.getPeleas = void 0;
const box_1 = __importDefault(require("../models/box"));
"../models/box";
const getPeleas = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield box_1.default.findAll();
    resp.json({ categories });
});
exports.getPeleas = getPeleas;
const getPeleaById = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pelea = yield box_1.default.findByPk(id);
    if (!pelea) {
        return resp.status(404).json({
            msg: `No existe una pelea con el id ${id}`
        });
    }
    resp.json({ pelea });
});
exports.getPeleaById = getPeleaById;
//# sourceMappingURL=box.js.map