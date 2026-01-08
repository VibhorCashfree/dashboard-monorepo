"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const CanWrite = ({ children, isAllowed, remove }) => {
    if (isAllowed) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return (react_1.default.createElement("span", { "data-testid": "can-write", className: remove ? 'hide' : 'invisible' }, children));
};
exports.default = CanWrite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DYW5Xcml0ZS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFHMUIsTUFBTSxRQUFRLEdBQTRCLENBQUMsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7SUFDNUUsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNkLE9BQU8sOERBQUcsUUFBUSxDQUFJLENBQUM7SUFDekIsQ0FBQztJQUVELE9BQU8sQ0FDTCx1REFBa0IsV0FBVyxFQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUNuRSxRQUFRLENBQ0osQ0FDUixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsa0JBQWUsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENhbldyaXRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgQ2FuV3JpdGU6IFJlYWN0LkZDPENhbldyaXRlUHJvcHM+ID0gKHsgY2hpbGRyZW4sIGlzQWxsb3dlZCwgcmVtb3ZlIH0pID0+IHtcbiAgaWYgKGlzQWxsb3dlZCkge1xuICAgIHJldHVybiA8PntjaGlsZHJlbn08Lz47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzcGFuIGRhdGEtdGVzdGlkPVwiY2FuLXdyaXRlXCIgY2xhc3NOYW1lPXtyZW1vdmUgPyAnaGlkZScgOiAnaW52aXNpYmxlJ30+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9zcGFuPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FuV3JpdGU7XG5leHBvcnQgdHlwZSB7IENhbldyaXRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbiJdfQ==