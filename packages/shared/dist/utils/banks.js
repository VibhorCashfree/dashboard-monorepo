"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCode = void 0;
const getCode = (ifsc) => {
    if (!ifsc) {
        return '';
    }
    return ifsc.toUpperCase().substr(0, 4);
};
exports.getCode = getCode;
exports.default = {
    getCode: exports.getCode,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFua3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvYmFua3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQU5XLFFBQUEsT0FBTyxXQU1sQjtBQUVGLGtCQUFlO0lBQ2IsT0FBTyxFQUFQLGVBQU87Q0FDUixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGdldENvZGUgPSAoaWZzYzogc3RyaW5nKSA9PiB7XG4gIGlmICghaWZzYykge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiBpZnNjLnRvVXBwZXJDYXNlKCkuc3Vic3RyKDAsIDQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRDb2RlLFxufTtcbiJdfQ==