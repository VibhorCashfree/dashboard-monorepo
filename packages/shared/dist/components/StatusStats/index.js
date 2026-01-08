"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const coherent_1 = require("@cashfree-intl/coherent");
const startCase_1 = __importDefault(require("lodash/startCase"));
const StatusStats = ({ data }) => {
    if (!data)
        return null;
    const { total, ...rest } = data;
    return (react_1.default.createElement(coherent_1.Space, { gap: 6, className: "pb-1" },
        total !== undefined && (react_1.default.createElement("div", null,
            react_1.default.createElement(coherent_1.Text, { color: "bodyLight", className: "mb-1" }, "Total"),
            react_1.default.createElement(coherent_1.Text, { variant: "h16" }, total))),
        Object.keys(rest)
            .filter((key) => data[key])
            .map((key) => (react_1.default.createElement("div", { key: key },
            react_1.default.createElement(coherent_1.Text, { color: "bodyLight", className: "mb-1" }, (0, startCase_1.default)(key)),
            react_1.default.createElement(coherent_1.Text, { variant: "h16" }, data[key]))))));
};
exports.default = StatusStats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TdGF0dXNTdGF0cy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsc0RBQXNEO0FBQ3RELGlFQUEwQztBQU0xQyxNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFvQixFQUFFLEVBQUU7SUFDakQsSUFBSSxDQUFDLElBQUk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUN2QixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBRWhDLE9BQU8sQ0FDTCw4QkFBQyxnQkFBSyxJQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFDLE1BQU07UUFDNUIsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUN0QjtZQUNFLDhCQUFDLGVBQUksSUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxNQUFNLFlBRWpDO1lBQ1AsOEJBQUMsZUFBSSxJQUFDLE9BQU8sRUFBQyxLQUFLLElBQUUsS0FBSyxDQUFRLENBQzlCLENBQ1A7UUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNmLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDWix1Q0FBSyxHQUFHLEVBQUUsR0FBRztZQUNYLDhCQUFDLGVBQUksSUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxNQUFNLElBQ3JDLElBQUEsbUJBQVUsRUFBQyxHQUFHLENBQUMsQ0FDWDtZQUNQLDhCQUFDLGVBQUksSUFBQyxPQUFPLEVBQUMsS0FBSyxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBUSxDQUNsQyxDQUNQLENBQUMsQ0FDRSxDQUNULENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixrQkFBZSxXQUFXLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3BhY2UsIFRleHQgfSBmcm9tICdAY2FzaGZyZWUtaW50bC9jb2hlcmVudCc7XG5pbXBvcnQgX3N0YXJ0Q2FzZSBmcm9tICdsb2Rhc2gvc3RhcnRDYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBTdGF0dXNTdGF0c1Byb3BzIHtcbiAgZGF0YTogUmVjb3JkPHN0cmluZywgbnVtYmVyIHwgc3RyaW5nPjtcbn1cblxuY29uc3QgU3RhdHVzU3RhdHMgPSAoeyBkYXRhIH06IFN0YXR1c1N0YXRzUHJvcHMpID0+IHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgeyB0b3RhbCwgLi4ucmVzdCB9ID0gZGF0YTtcblxuICByZXR1cm4gKFxuICAgIDxTcGFjZSBnYXA9ezZ9IGNsYXNzTmFtZT1cInBiLTFcIj5cbiAgICAgIHt0b3RhbCAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8VGV4dCBjb2xvcj1cImJvZHlMaWdodFwiIGNsYXNzTmFtZT1cIm1iLTFcIj5cbiAgICAgICAgICAgIFRvdGFsXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJoMTZcIj57dG90YWx9PC9UZXh0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgICB7T2JqZWN0LmtleXMocmVzdClcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBkYXRhW2tleV0pXG4gICAgICAgIC5tYXAoKGtleSkgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXtrZXl9PlxuICAgICAgICAgICAgPFRleHQgY29sb3I9XCJib2R5TGlnaHRcIiBjbGFzc05hbWU9XCJtYi0xXCI+XG4gICAgICAgICAgICAgIHtfc3RhcnRDYXNlKGtleSl9XG4gICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8VGV4dCB2YXJpYW50PVwiaDE2XCI+e2RhdGFba2V5XX08L1RleHQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgIDwvU3BhY2U+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdGF0dXNTdGF0cztcbiJdfQ==