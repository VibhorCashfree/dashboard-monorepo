"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const NotificationBarMF = (0, react_1.lazy)(() => 
// @ts-ignore
Promise.resolve().then(() => __importStar(require('CommonModule/NotificationBar'))).catch(() => ({
    default: () => null,
})));
const NotificationBar = ({ fallbackComponent: Fallback, errorBoundary: ErrorBoundary }) => {
    const content = (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(react_1.default.Fragment, null) },
        react_1.default.createElement(NotificationBarMF, null)));
    if (ErrorBoundary) {
        return react_1.default.createElement(ErrorBoundary, { fallback: react_1.default.createElement(react_1.default.Fragment, null) }, content);
    }
    return content;
};
exports.default = NotificationBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Ob3RpZmljYXRpb25CYXIvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBRzlDLE1BQU0saUJBQWlCLEdBQUcsSUFBQSxZQUFJLEVBQUMsR0FBRyxFQUFFO0FBQ2xDLGFBQWE7QUFDYixrREFBTyw4QkFBOEIsSUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtDQUNwQixDQUFDLENBQUMsQ0FDSixDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQW9JLENBQUMsRUFDeEosaUJBQWlCLEVBQUUsUUFBUSxFQUMzQixhQUFhLEVBQUUsYUFBYSxFQUM3QixFQUFFLEVBQUU7SUFDSCxNQUFNLE9BQU8sR0FBRyxDQUNkLDhCQUFDLGdCQUFRLElBQUMsUUFBUSxFQUFFLDZEQUFLO1FBQ3ZCLDhCQUFDLGlCQUFpQixPQUFHLENBQ1osQ0FDWixDQUFDO0lBRUYsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNsQixPQUFPLDhCQUFDLGFBQWEsSUFBQyxRQUFRLEVBQUUsNkRBQUssSUFBRyxPQUFPLENBQWlCLENBQUM7SUFDbkUsQ0FBQztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLGtCQUFlLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBsYXp5LCBTdXNwZW5zZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblByb3BzIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9uL3R5cGVzJztcblxuY29uc3QgTm90aWZpY2F0aW9uQmFyTUYgPSBsYXp5KCgpID0+XG4gIC8vIEB0cy1pZ25vcmVcbiAgaW1wb3J0KCdDb21tb25Nb2R1bGUvTm90aWZpY2F0aW9uQmFyJykuY2F0Y2goKCkgPT4gKHtcbiAgICBkZWZhdWx0OiAoKSA9PiBudWxsLFxuICB9KSlcbik7XG5cbmNvbnN0IE5vdGlmaWNhdGlvbkJhcjogUmVhY3QuRkM8Tm90aWZpY2F0aW9uUHJvcHMgJiB7IGVycm9yQm91bmRhcnk/OiBSZWFjdC5Db21wb25lbnRUeXBlPHsgZmFsbGJhY2s6IFJlYWN0LlJlYWN0Tm9kZSwgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9PiB9PiA9ICh7IFxuICBmYWxsYmFja0NvbXBvbmVudDogRmFsbGJhY2ssIFxuICBlcnJvckJvdW5kYXJ5OiBFcnJvckJvdW5kYXJ5IFxufSkgPT4ge1xuICBjb25zdCBjb250ZW50ID0gKFxuICAgIDxTdXNwZW5zZSBmYWxsYmFjaz17PD48Lz59PlxuICAgICAgPE5vdGlmaWNhdGlvbkJhck1GIC8+XG4gICAgPC9TdXNwZW5zZT5cbiAgKTtcblxuICBpZiAoRXJyb3JCb3VuZGFyeSkge1xuICAgIHJldHVybiA8RXJyb3JCb3VuZGFyeSBmYWxsYmFjaz17PD48Lz59Pntjb250ZW50fTwvRXJyb3JCb3VuZGFyeT47XG4gIH1cblxuICByZXR1cm4gY29udGVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGlmaWNhdGlvbkJhcjtcbiJdfQ==