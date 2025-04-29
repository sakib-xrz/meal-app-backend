"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const meal_validations_1 = __importDefault(require("./meal.validations"));
const meal_controller_1 = __importDefault(require("./meal.controller"));
const router = express_1.default.Router();
router
    .route('/')
    .post((0, auth_1.default)(client_1.Role.ADMIN), (0, validateRequest_1.default)(meal_validations_1.default.CreateMealSchema), meal_controller_1.default.CreateMeal)
    .get(meal_controller_1.default.GetAllMeals);
router
    .route('/:id')
    .patch((0, auth_1.default)(client_1.Role.ADMIN), (0, validateRequest_1.default)(meal_validations_1.default.EditMealSchema), meal_controller_1.default.EditMeal)
    .get(meal_controller_1.default.GetAllMealsForSingleMember);
exports.MealRoutes = router;
