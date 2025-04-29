"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const member_routes_1 = require("../modules/member/member.routes");
const meal_routes_1 = require("../modules/meal/meal.routes");
const bazar_routes_1 = require("../modules/bazar/bazar.routes");
const router = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/members',
        route: member_routes_1.MemberRoutes,
    },
    {
        path: '/meals',
        route: meal_routes_1.MealRoutes,
    },
    {
        path: '/bazars',
        route: bazar_routes_1.BazarRoutes,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
