"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const member_validations_1 = __importDefault(require("./member.validations"));
const member_controller_1 = __importDefault(require("./member.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router
    .route('/')
    .post((0, auth_1.default)(client_1.Role.ADMIN), (0, validateRequest_1.default)(member_validations_1.default.CreateMemberSchema), member_controller_1.default.CreateMember)
    .get(member_controller_1.default.GetAllMembers);
router
    .route('/:id')
    .patch((0, auth_1.default)(client_1.Role.ADMIN), (0, validateRequest_1.default)(member_validations_1.default.EditMemberSchema), member_controller_1.default.EditMember)
    .delete((0, auth_1.default)(client_1.Role.ADMIN), member_controller_1.default.DeleteMember);
exports.MemberRoutes = router;
