"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BazarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const bazar_validations_1 = __importDefault(require("./bazar.validations"));
const bazar_controller_1 = __importDefault(require("./bazar.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, auth_1.default)(client_1.Role.ADMIN), (0, validateRequest_1.default)(bazar_validations_1.default.CreateBazarSchema), bazar_controller_1.default.CreateBazar)
    .get(bazar_controller_1.default.GetAllBazars);
router
    .route('/:id')
    .patch((0, auth_1.default)(client_1.Role.ADMIN), (0, validateRequest_1.default)(bazar_validations_1.default.EditBazarSchema), bazar_controller_1.default.EditBazar)
    .delete((0, auth_1.default)(client_1.Role.ADMIN), bazar_controller_1.default.DeleteBazar);
exports.BazarRoutes = router;
