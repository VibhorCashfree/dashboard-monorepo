"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const startCase_1 = __importDefault(require("lodash/startCase"));
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const status_1 = require("../../constants/status");
// This component will need styled component from apps
// For now, creating a simple version that apps can wrap
const StatusLabel = ({ children, ...props }) => {
    if (!children) {
        return react_1.default.createElement(react_1.default.Fragment, null, "\u2013");
    }
    const label = status_1.CORE_LABEL_BY_STATUS[children] || (0, capitalize_1.default)((0, startCase_1.default)(children));
    return react_1.default.createElement("div", { ...props }, label);
};
exports.default = StatusLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9TdGF0dXNMYWJlbC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsaUVBQTBDO0FBQzFDLG1FQUE0QztBQUM1QyxtREFBOEQ7QUFHOUQsc0RBQXNEO0FBQ3RELHdEQUF3RDtBQUN4RCxNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxFQUFvQixFQUFFLEVBQUU7SUFDL0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsT0FBTyx1RUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLEtBQUssR0FBRyw2QkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFBLG9CQUFXLEVBQUMsSUFBQSxtQkFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFbEYsT0FBTywwQ0FBUyxLQUFLLElBQUcsS0FBSyxDQUFPLENBQUM7QUFDdkMsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsV0FBVyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBfc3RhcnRDYXNlIGZyb20gJ2xvZGFzaC9zdGFydENhc2UnO1xuaW1wb3J0IF9jYXBpdGFsaXplIGZyb20gJ2xvZGFzaC9jYXBpdGFsaXplJztcbmltcG9ydCB7IENPUkVfTEFCRUxfQllfU1RBVFVTIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3N0YXR1cyc7XG5pbXBvcnQgdHlwZSB7IFN0YXR1c0xhYmVsUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuLy8gVGhpcyBjb21wb25lbnQgd2lsbCBuZWVkIHN0eWxlZCBjb21wb25lbnQgZnJvbSBhcHBzXG4vLyBGb3Igbm93LCBjcmVhdGluZyBhIHNpbXBsZSB2ZXJzaW9uIHRoYXQgYXBwcyBjYW4gd3JhcFxuY29uc3QgU3RhdHVzTGFiZWwgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfTogU3RhdHVzTGFiZWxQcm9wcykgPT4ge1xuICBpZiAoIWNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIDw+4oCTPC8+O1xuICB9XG5cbiAgY29uc3QgbGFiZWwgPSBDT1JFX0xBQkVMX0JZX1NUQVRVU1tjaGlsZHJlbl0gfHwgX2NhcGl0YWxpemUoX3N0YXJ0Q2FzZShjaGlsZHJlbikpO1xuICBcbiAgcmV0dXJuIDxkaXYgey4uLnByb3BzfT57bGFiZWx9PC9kaXY+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RhdHVzTGFiZWw7XG5leHBvcnQgdHlwZSB7IFN0YXR1c0xhYmVsUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbiJdfQ==