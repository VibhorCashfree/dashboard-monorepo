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
const sayHello = (name) => {
    return `Hello from shared package, ${name}!`;
};
exports.sayHello = sayHello;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQXVDO0FBQ3ZDLGlEQUErQjtBQUMvQix1REFBdUM7QUFFdkMsMENBQXdCO0FBQ3hCLDZDQUEyQjtBQUlwQixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO0lBQ3ZDLE9BQU8sOEJBQThCLElBQUksR0FBRyxDQUFDO0FBQy9DLENBQUMsQ0FBQztBQUZXLFFBQUEsUUFBUSxZQUVuQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGFzIFJlZ2V4IGZyb20gJy4vdXRpbHMvcmVnZXgnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9jb21tb24nO1xuZXhwb3J0ICogYXMgQmFua3MgZnJvbSAnLi91dGlscy9iYW5rcyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vaG9va3MnO1xuZXhwb3J0ICogZnJvbSAnLi9hZGFwdGVycyc7XG5cblxuXG5leHBvcnQgY29uc3Qgc2F5SGVsbG8gPSAobmFtZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiBgSGVsbG8gZnJvbSBzaGFyZWQgcGFja2FnZSwgJHtuYW1lfSFgO1xufTtcbiJdfQ==