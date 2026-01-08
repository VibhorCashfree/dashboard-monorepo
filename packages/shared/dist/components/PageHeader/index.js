"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const coherent_1 = require("@cashfree-intl/coherent");
const styled_components_1 = __importDefault(require("styled-components"));
const PageHeading = styled_components_1.default.h1 `
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`;
const PageHeader = ({ children, extra }) => (react_1.default.createElement(coherent_1.Space, { justifyContent: "space-between", className: "mb-1", style: { alignItems: 'center' } },
    react_1.default.createElement(PageHeading, null, children),
    extra && react_1.default.createElement("div", { className: "page-header-extra" }, extra)));
exports.default = PageHeader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9QYWdlSGVhZGVyL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQixzREFBZ0Q7QUFDaEQsMEVBQXVDO0FBR3ZDLE1BQU0sV0FBVyxHQUFHLDJCQUFNLENBQUMsRUFBRSxDQUFBOzs7O0NBSTVCLENBQUM7QUFFRixNQUFNLFVBQVUsR0FBOEIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDckUsOEJBQUMsZ0JBQUssSUFBQyxjQUFjLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtJQUNwRiw4QkFBQyxXQUFXLFFBQUUsUUFBUSxDQUFlO0lBQ3BDLEtBQUssSUFBSSx1Q0FBSyxTQUFTLEVBQUMsbUJBQW1CLElBQUUsS0FBSyxDQUFPLENBQ3BELENBQ1QsQ0FBQztBQUVGLGtCQUFlLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTcGFjZSB9IGZyb20gJ0BjYXNoZnJlZS1pbnRsL2NvaGVyZW50JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgUGFnZUhlYWRlclByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFBhZ2VIZWFkaW5nID0gc3R5bGVkLmgxYFxuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuYDtcblxuY29uc3QgUGFnZUhlYWRlcjogUmVhY3QuRkM8UGFnZUhlYWRlclByb3BzPiA9ICh7IGNoaWxkcmVuLCBleHRyYSB9KSA9PiAoXG4gIDxTcGFjZSBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIiBjbGFzc05hbWU9XCJtYi0xXCIgc3R5bGU9e3sgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgPFBhZ2VIZWFkaW5nPntjaGlsZHJlbn08L1BhZ2VIZWFkaW5nPlxuICAgIHtleHRyYSAmJiA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyLWV4dHJhXCI+e2V4dHJhfTwvZGl2Pn1cbiAgPC9TcGFjZT5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VIZWFkZXI7XG5leHBvcnQgdHlwZSB7IFBhZ2VIZWFkZXJQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuIl19