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
const calculatePagination_1 = require("../../utils/calculatePagination");
const pick_1 = require("../../utils/pick");
const CreateBazar = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExist = yield prisma_1.default.member.findUnique({
        where: {
            id: payload.purchased_by,
        },
    });
    if (!isMemberExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Member not found');
    }
    const result = yield prisma_1.default.bazar.create({
        data: payload,
    });
    return result;
});
const GetAllBazars = (query) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (query === null || query === void 0 ? void 0 : query.purchased_by) {
        whereConditions.purchased_by = query.purchased_by;
    }
    const data = yield prisma_1.default.bazar.findMany({
        where: whereConditions,
        include: {
            member: true,
        },
        skip,
        take: limit,
        orderBy: {
            created_at: 'desc',
        },
    });
    const total = yield prisma_1.default.bazar.count({
        where: whereConditions,
    });
    const totalBazarAmount = yield prisma_1.default.bazar.aggregate({
        _sum: {
            amount: true,
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
            bazars: data,
            total_bazar_amount: totalBazarAmount._sum.amount || 0,
        },
    };
});
const EditBazar = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBazarExist = yield prisma_1.default.bazar.findUnique({
        where: {
            id,
        },
    });
    if (!isBazarExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bazar not found');
    }
    const result = yield prisma_1.default.bazar.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const DeleteBazar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBazarExist = yield prisma_1.default.bazar.findUnique({
        where: {
            id,
        },
    });
    if (!isBazarExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bazar not found');
    }
    yield prisma_1.default.bazar.delete({
        where: {
            id,
        },
    });
});
const BazarService = {
    CreateBazar,
    GetAllBazars,
    EditBazar,
    DeleteBazar,
};
exports.default = BazarService;
