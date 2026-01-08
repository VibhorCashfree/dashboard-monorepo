"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const coherent_1 = require("@cashfree-intl/coherent");
const AmountLabeledInput = ({ label, name, ...props }) => (
// @ts-ignore
react_1.default.createElement(coherent_1.InputWithAction, { label: label, name: name, ...props }));
exports.default = AmountLabeledInput;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9BbW91bnRMYWJlbGVkSW5wdXQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHNEQUEwRDtBQVExRCxNQUFNLGtCQUFrQixHQUFzQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUMzRixhQUFhO0FBQ2IsOEJBQUMsMEJBQWUsSUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEtBQU0sS0FBSyxHQUFJLENBQ3pELENBQUM7QUFFRixrQkFBZSxrQkFBa0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBJbnB1dFdpdGhBY3Rpb24gfSBmcm9tICdAY2FzaGZyZWUtaW50bC9jb2hlcmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQW1vdW50TGFiZWxlZElucHV0UHJvcHMge1xuICBsYWJlbDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuY29uc3QgQW1vdW50TGFiZWxlZElucHV0OiBSZWFjdC5GQzxBbW91bnRMYWJlbGVkSW5wdXRQcm9wcz4gPSAoeyBsYWJlbCwgbmFtZSwgLi4ucHJvcHMgfSkgPT4gKFxuICAvLyBAdHMtaWdub3JlXG4gIDxJbnB1dFdpdGhBY3Rpb24gbGFiZWw9e2xhYmVsfSBuYW1lPXtuYW1lfSB7Li4ucHJvcHN9IC8+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBBbW91bnRMYWJlbGVkSW5wdXQ7XG4iXX0=