"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controller/categories");
const router = (0, express_1.Router)();
router.get('', categories_1.getCategories);
router.post('', categories_1.postCategorie);
exports.default = router;
//# sourceMappingURL=categories.js.map