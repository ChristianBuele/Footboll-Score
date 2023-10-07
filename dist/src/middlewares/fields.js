"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
const validateFields = (req, resp, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json(errors);
    }
    next();
};
exports.validateFields = validateFields;
//# sourceMappingURL=fields.js.map