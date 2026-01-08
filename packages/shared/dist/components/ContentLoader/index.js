"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const coherent_1 = require("@cashfree-intl/coherent");
const styled_1 = require("./styled");
const ContentLoader = ({ loading, children, ...props }) => (react_1.default.createElement(styled_1.StyledDimmable, { as: loading ? coherent_1.Segment : null, dimmed: loading, ...props },
    loading && react_1.default.createElement(coherent_1.Loader, { active: true, page: false }),
    children));
exports.default = ContentLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db250ZW50TG9hZGVyL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixzREFBMEQ7QUFDMUQscUNBQTBDO0FBRzFDLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxFQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUM3RSw4QkFBQyx1QkFBYyxJQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxLQUFNLEtBQUs7SUFDckUsT0FBTyxJQUFJLDhCQUFDLGlCQUFNLElBQUMsTUFBTSxRQUFDLElBQUksRUFBRSxLQUFLLEdBQUk7SUFDekMsUUFBUSxDQUNNLENBQ2xCLENBQUM7QUFFRixrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTG9hZGVyLCBTZWdtZW50IH0gZnJvbSAnQGNhc2hmcmVlLWludGwvY29oZXJlbnQnO1xuaW1wb3J0IHsgU3R5bGVkRGltbWFibGUgfSBmcm9tICcuL3N0eWxlZCc7XG5pbXBvcnQgdHlwZSB7IENvbnRlbnRMb2FkZXJQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBDb250ZW50TG9hZGVyID0gKHsgbG9hZGluZywgY2hpbGRyZW4sIC4uLnByb3BzIH06IENvbnRlbnRMb2FkZXJQcm9wcykgPT4gKFxuICA8U3R5bGVkRGltbWFibGUgYXM9e2xvYWRpbmcgPyBTZWdtZW50IDogbnVsbH0gZGltbWVkPXtsb2FkaW5nfSB7Li4ucHJvcHN9PlxuICAgIHtsb2FkaW5nICYmIDxMb2FkZXIgYWN0aXZlIHBhZ2U9e2ZhbHNlfSAvPn1cbiAgICB7Y2hpbGRyZW59XG4gIDwvU3R5bGVkRGltbWFibGU+XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBDb250ZW50TG9hZGVyO1xuZXhwb3J0IHR5cGUgeyBDb250ZW50TG9hZGVyUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbiJdfQ==