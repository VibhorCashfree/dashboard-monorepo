"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
const filter_1 = __importDefault(require("lodash/filter"));
const VALID_REPORT_TYPES = [
    'BENEFICIARY',
    'PENDING_TRANSFER',
    'TRANSFER',
    'REVERSED_TRANSFER',
    'ACCOUNT',
    'CASHGRAM',
];
const from = (response) => (0, filter_1.default)(response, (report) => VALID_REPORT_TYPES.includes(report.notifType));
exports.from = from;
exports.default = {
    from: exports.from,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVycy9ub3RpZmljYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUFvQztBQUVwQyxNQUFNLGtCQUFrQixHQUFHO0lBQ3pCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixTQUFTO0lBQ1QsVUFBVTtDQUNYLENBQUM7QUFNSyxNQUFNLElBQUksR0FBRyxDQUFDLFFBQW9CLEVBQUUsRUFBRSxDQUMzQyxJQUFBLGdCQUFPLEVBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFEbEUsUUFBQSxJQUFJLFFBQzhEO0FBRS9FLGtCQUFlO0lBQ2IsSUFBSSxFQUFKLFlBQUk7Q0FDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9maWx0ZXIgZnJvbSAnbG9kYXNoL2ZpbHRlcic7XG5cbmNvbnN0IFZBTElEX1JFUE9SVF9UWVBFUyA9IFtcbiAgJ0JFTkVGSUNJQVJZJyxcbiAgJ1BFTkRJTkdfVFJBTlNGRVInLFxuICAnVFJBTlNGRVInLFxuICAnUkVWRVJTRURfVFJBTlNGRVInLFxuICAnQUNDT1VOVCcsXG4gICdDQVNIR1JBTScsXG5dO1xuXG50eXBlIFJlc3BvbnNlID0ge1xuICBub3RpZlR5cGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBmcm9tID0gKHJlc3BvbnNlOiBSZXNwb25zZVtdKSA9PlxuICBfZmlsdGVyKHJlc3BvbnNlLCAocmVwb3J0KSA9PiBWQUxJRF9SRVBPUlRfVFlQRVMuaW5jbHVkZXMocmVwb3J0Lm5vdGlmVHlwZSkpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZyb20sXG59O1xuIl19