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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = exports.Banks = exports.Regex = void 0;
exports.Regex = __importStar(require("./utils/regex"));
__exportStar(require("./utils/common"), exports);
exports.Banks = __importStar(require("./utils/banks"));
__exportStar(require("./hooks"), exports);
__exportStar(require("./adapters"), exports);
__exportStar(require("./constants"), exports);
__exportStar(require("./components"), exports);
const sayHello = (name) => {
    return `Hello from shared package, ${name}!`;
};
exports.sayHello = sayHello;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLGlEQUErQjtBQUMvQix1REFBdUM7QUFFdkMsMENBQXdCO0FBQ3hCLDZDQUEyQjtBQUMzQiw4Q0FBNEI7QUFDNUIsK0NBQTZCO0FBSXRCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDdkMsT0FBTyw4QkFBOEIsSUFBSSxHQUFHLENBQUM7QUFDL0MsQ0FBQyxDQUFDO0FBRlcsUUFBQSxRQUFRLFlBRW5CIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogYXMgUmVnZXggZnJvbSAnLi91dGlscy9yZWdleCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2NvbW1vbic7XG5leHBvcnQgKiBhcyBCYW5rcyBmcm9tICcuL3V0aWxzL2JhbmtzJztcblxuZXhwb3J0ICogZnJvbSAnLi9ob29rcyc7XG5leHBvcnQgKiBmcm9tICcuL2FkYXB0ZXJzJztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cyc7XG5cblxuXG5leHBvcnQgY29uc3Qgc2F5SGVsbG8gPSAobmFtZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBgSGVsbG8gZnJvbSBzaGFyZWQgcGFja2FnZSwgJHtuYW1lfSFgO1xufTtcbiJdfQ==