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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const pick_1 = require("../../utils/pick");
const calculatePagination_1 = require("../../utils/calculatePagination");
const CreateMeal = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExist = yield prisma_1.default.member.findUnique({
        where: {
            id: payload.member_id,
        },
    });
    if (!isMemberExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Member not found');
    }
    const todaysDate = new Date();
    const year = todaysDate.getFullYear();
    const month = String(todaysDate.getMonth() + 1).padStart(2, '0');
    const day = String(todaysDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const isMealExistOnToday = yield prisma_1.default.meal.findFirst({
        where: {
            member_id: payload.member_id,
            date: formattedDate,
        },
    });
    if (isMealExistOnToday) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Meal already exists for today');
    }
    const result = yield prisma_1.default.meal.create({
        data: payload,
    });
    return result;
});
const EditMeal = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMealExist = yield prisma_1.default.meal.findUnique({
        where: {
            id,
        },
    });
    if (!isMealExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Meal not found');
    }
    const result = yield prisma_1.default.meal.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const GetAllMealsForSingleMember = (id, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const todaysDate = new Date();
    const defaultEndDate = todaysDate.toISOString().split('T')[0];
    const last30Days = new Date(todaysDate);
    last30Days.setDate(last30Days.getDate() - 30);
    const defaultStartDate = last30Days.toISOString().split('T')[0];
    const { start_date, end_date } = query, otherQueries = __rest(query, ["start_date", "end_date"]);
    const startDate = start_date || defaultStartDate;
    const endDate = end_date || defaultEndDate;
    const options = (0, pick_1.pick)(otherQueries, [
        'limit',
        'page',
        'sort_by',
        'sort_order',
    ]);
    const { page, limit, skip } = (0, calculatePagination_1.calculatePagination)(options);
    const whereConditions = {
        member_id: id,
        date: {
            gte: startDate,
            lte: endDate,
        },
    };
    const sortBy = options.sort_by;
    const sortOrder = (_a = options.sort_order) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const orderByCondition = sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
        }
        : {
            created_at: 'desc',
        };
    const data = yield prisma_1.default.meal.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: orderByCondition,
    });
    const total = yield prisma_1.default.meal.count({
        where: whereConditions,
    });
    const totalMeal = yield prisma_1.default.meal.aggregate({
        _sum: {
            quantity: true,
        },
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: {
            meals: data,
            total_meal_quantity: totalMeal._sum.quantity || 0,
        },
    };
});
const GetAllMeals = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const todaysDate = new Date();
    const defaultEndDate = todaysDate.toISOString().split('T')[0];
    const last30Days = new Date(todaysDate);
    last30Days.setDate(last30Days.getDate() - 30);
    const defaultStartDate = last30Days.toISOString().split('T')[0];
    const { start_date, end_date } = query, otherQueries = __rest(query, ["start_date", "end_date"]);
    const startDate = start_date || defaultStartDate;
    const endDate = end_date || defaultEndDate;
    const options = (0, pick_1.pick)(otherQueries, [
        'limit',
        'page',
        'sort_by',
        'sort_order',
    ]);
    const { page, limit, skip } = (0, calculatePagination_1.calculatePagination)(options);
    const whereConditions = {
        date: {
            gte: startDate,
            lte: endDate,
        },
    };
    const sortBy = options.sort_by;
    const sortOrder = (_a = options.sort_order) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const orderByCondition = sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
        }
        : {
            created_at: 'desc',
        };
    const data = yield prisma_1.default.meal.findMany({
        where: whereConditions,
        include: {
            member: true,
        },
        skip,
        take: limit,
        orderBy: orderByCondition,
    });
    const total = yield prisma_1.default.meal.count({
        where: whereConditions,
    });
    const totalMeal = yield prisma_1.default.meal.aggregate({
        _sum: {
            quantity: true,
        },
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: {
            meals: data,
            total_meal_quantity: totalMeal._sum.quantity || 0,
        },
    };
});
const MealService = {
    CreateMeal,
    EditMeal,
    GetAllMealsForSingleMember,
    GetAllMeals,
};
exports.default = MealService;
