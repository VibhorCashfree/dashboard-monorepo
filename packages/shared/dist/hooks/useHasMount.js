"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHasMount = void 0;
const react_1 = require("react");
const useHasMount = () => {
    const hasMountRef = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(() => {
        hasMountRef.current = false;
    }, []);
    return hasMountRef.current;
};
exports.useHasMount = useHasMount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlSGFzTW91bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaG9va3MvdXNlSGFzTW91bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTBDO0FBRW5DLE1BQU0sV0FBVyxHQUFHLEdBQUcsRUFBRTtJQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFBLGNBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztJQUVqQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsV0FBVyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRVAsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDO0FBQzdCLENBQUMsQ0FBQztBQVJXLFFBQUEsV0FBVyxlQVF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgdXNlSGFzTW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc01vdW50UmVmID0gdXNlUmVmKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaGFzTW91bnRSZWYuY3VycmVudCA9IGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGhhc01vdW50UmVmLmN1cnJlbnQ7XG59O1xuIl19