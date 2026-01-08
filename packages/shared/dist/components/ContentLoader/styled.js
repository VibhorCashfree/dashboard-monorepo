"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledDimmable = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.StyledDimmable = styled_components_1.default.div `
  position: relative;
  ${(props) => props.dimmed && 'opacity: 0.5; pointer-events: none;'}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQ29udGVudExvYWRlci9zdHlsZWQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBFQUF1QztBQUUxQixRQUFBLGNBQWMsR0FBRywyQkFBTSxDQUFDLEdBQUcsQ0FBc0I7O0lBRTFELENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLHFDQUFxQztDQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWREaW1tYWJsZSA9IHN0eWxlZC5kaXY8eyBkaW1tZWQ/OiBib29sZWFuIH0+YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICR7KHByb3BzKSA9PiBwcm9wcy5kaW1tZWQgJiYgJ29wYWNpdHk6IDAuNTsgcG9pbnRlci1ldmVudHM6IG5vbmU7J31cbmA7XG4iXX0=