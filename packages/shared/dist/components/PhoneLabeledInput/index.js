"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const coherent_1 = require("@cashfree-intl/coherent");
const PhoneLabeledInput = ({ label, name, ...props }) => (
// @ts-ignore
react_1.default.createElement(coherent_1.InputWithAction, { label: label, name: name, ...props }));
exports.default = PhoneLabeledInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9QaG9uZUxhYmVsZWRJbnB1dC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQTBEO0FBUTFELE1BQU0saUJBQWlCLEdBQXFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ3pGLGFBQWE7QUFDYiw4QkFBQywwQkFBZSxJQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksS0FBTSxLQUFLLEdBQUksQ0FDekQsQ0FBQztBQUVGLGtCQUFlLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IElucHV0V2l0aEFjdGlvbiB9IGZyb20gJ0BjYXNoZnJlZS1pbnRsL2NvaGVyZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBQaG9uZUxhYmVsZWRJbnB1dFByb3BzIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmNvbnN0IFBob25lTGFiZWxlZElucHV0OiBSZWFjdC5GQzxQaG9uZUxhYmVsZWRJbnB1dFByb3BzPiA9ICh7IGxhYmVsLCBuYW1lLCAuLi5wcm9wcyB9KSA9PiAoXG4gIC8vIEB0cy1pZ25vcmVcbiAgPElucHV0V2l0aEFjdGlvbiBsYWJlbD17bGFiZWx9IG5hbWU9e25hbWV9IHsuLi5wcm9wc30gLz5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFBob25lTGFiZWxlZElucHV0O1xuIl19