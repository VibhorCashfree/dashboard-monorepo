"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
const react_1 = require("react");
const usePrevious = (value) => {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        ref.current = value;
    });
    return ref.current;
};
exports.usePrevious = usePrevious;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlUHJldmlvdXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3MvdXNlUHJldmlvdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTBDO0FBRW5DLE1BQU0sV0FBVyxHQUFHLENBQUksS0FBUSxFQUFpQixFQUFFO0lBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUEsY0FBTSxHQUFLLENBQUM7SUFFeEIsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLEdBQUcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQVJXLFFBQUEsV0FBVyxlQVF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgdXNlUHJldmlvdXMgPSA8VD4odmFsdWU6IFQpOiBUIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgcmVmID0gdXNlUmVmPFQ+KCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICB9KTtcblxuICByZXR1cm4gcmVmLmN1cnJlbnQ7XG59O1xuIl19