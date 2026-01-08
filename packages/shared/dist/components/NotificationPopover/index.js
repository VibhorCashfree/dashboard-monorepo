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
const NotificationPopoverMF = (0, react_1.lazy)(() => 
// @ts-ignore
Promise.resolve().then(() => __importStar(require('CommonModule/NotificationPopover'))).catch(() => ({
    default: () => null,
})));
const NotificationPopover = ({ isShellV2, fallbackComponent: Fallback, errorBoundary: ErrorBoundary }) => {
    const content = (react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(react_1.default.Fragment, null) },
        react_1.default.createElement(NotificationPopoverMF, { isShellV2: isShellV2 })));
    if (ErrorBoundary) {
        return react_1.default.createElement(ErrorBoundary, { fallback: react_1.default.createElement(react_1.default.Fragment, null) }, content);
    }
    return content;
};
exports.default = NotificationPopover;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Ob3RpZmljYXRpb25Qb3BvdmVyL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUc5QyxNQUFNLHFCQUFxQixHQUFHLElBQUEsWUFBSSxFQUFDLEdBQUcsRUFBRTtBQUN0QyxhQUFhO0FBQ2Isa0RBQU8sa0NBQWtDLElBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUk7Q0FDcEIsQ0FBQyxDQUFDLENBQ0osQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQW9JLENBQUMsRUFDNUosU0FBUyxFQUNULGlCQUFpQixFQUFFLFFBQVEsRUFDM0IsYUFBYSxFQUFFLGFBQWEsRUFDN0IsRUFBRSxFQUFFO0lBQ0gsTUFBTSxPQUFPLEdBQUcsQ0FDZCw4QkFBQyxnQkFBUSxJQUFDLFFBQVEsRUFBRSw2REFBSztRQUN2Qiw4QkFBQyxxQkFBcUIsSUFBQyxTQUFTLEVBQUUsU0FBUyxHQUFJLENBQ3RDLENBQ1osQ0FBQztJQUVGLElBQUksYUFBYSxFQUFFLENBQUM7UUFDbEIsT0FBTyw4QkFBQyxhQUFhLElBQUMsUUFBUSxFQUFFLDZEQUFLLElBQUcsT0FBTyxDQUFpQixDQUFDO0lBQ25FLENBQUM7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBsYXp5LCBTdXNwZW5zZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblByb3BzIH0gZnJvbSAnLi4vTm90aWZpY2F0aW9uL3R5cGVzJztcblxuY29uc3QgTm90aWZpY2F0aW9uUG9wb3Zlck1GID0gbGF6eSgoKSA9PlxuICAvLyBAdHMtaWdub3JlXG4gIGltcG9ydCgnQ29tbW9uTW9kdWxlL05vdGlmaWNhdGlvblBvcG92ZXInKS5jYXRjaCgoKSA9PiAoe1xuICAgIGRlZmF1bHQ6ICgpID0+IG51bGwsXG4gIH0pKVxuKTtcblxuY29uc3QgTm90aWZpY2F0aW9uUG9wb3ZlcjogUmVhY3QuRkM8Tm90aWZpY2F0aW9uUHJvcHMgJiB7IGVycm9yQm91bmRhcnk/OiBSZWFjdC5Db21wb25lbnRUeXBlPHsgZmFsbGJhY2s6IFJlYWN0LlJlYWN0Tm9kZSwgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9PiB9PiA9ICh7IFxuICBpc1NoZWxsVjIsIFxuICBmYWxsYmFja0NvbXBvbmVudDogRmFsbGJhY2ssIFxuICBlcnJvckJvdW5kYXJ5OiBFcnJvckJvdW5kYXJ5IFxufSkgPT4ge1xuICBjb25zdCBjb250ZW50ID0gKFxuICAgIDxTdXNwZW5zZSBmYWxsYmFjaz17PD48Lz59PlxuICAgICAgPE5vdGlmaWNhdGlvblBvcG92ZXJNRiBpc1NoZWxsVjI9e2lzU2hlbGxWMn0gLz5cbiAgICA8L1N1c3BlbnNlPlxuICApO1xuXG4gIGlmIChFcnJvckJvdW5kYXJ5KSB7XG4gICAgcmV0dXJuIDxFcnJvckJvdW5kYXJ5IGZhbGxiYWNrPXs8PjwvPn0+e2NvbnRlbnR9PC9FcnJvckJvdW5kYXJ5PjtcbiAgfVxuXG4gIHJldHVybiBjb250ZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uUG9wb3ZlcjtcbiJdfQ==