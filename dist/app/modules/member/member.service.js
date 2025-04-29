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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const CreateMember = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExist = yield prisma_1.default.member.findFirst({
        where: {
            phone: payload.phone,
        },
    });
    if (isMemberExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Member already exists');
    }
    const result = yield prisma_1.default.member.create({
        data: payload,
    });
    return result;
});
const GetAllMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.member.findMany({
        orderBy: {
            created_at: 'desc',
        },
    });
    return result;
});
const EditMember = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExist = yield prisma_1.default.member.findUnique({
        where: {
            id,
        },
    });
    if (!isMemberExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Member not found');
    }
    const result = yield prisma_1.default.member.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const DeleteMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExist = yield prisma_1.default.member.findUnique({
        where: {
            id,
        },
    });
    if (!isMemberExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Member not found');
    }
    yield prisma_1.default.member.delete({
        where: {
            id,
        },
    });
});
const MemberService = {
    CreateMember,
    GetAllMembers,
    EditMember,
    DeleteMember,
};
exports.default = MemberService;
