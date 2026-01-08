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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const coherent_1 = require("@cashfree-intl/coherent");
const Icon_1 = __importDefault(require("../Icon"));
const common_1 = require("../../utils/common");
const Copy = ({ value, onClick, showToast = false, className = 'pointer ml-1', }) => {
    const [copied, setCopied] = (0, react_1.useState)(false);
    if (!value) {
        return null;
    }
    const handleCopy = (e) => {
        e.stopPropagation();
        (0, common_1.copyToClipboard)(String(value));
        if (showToast) {
            coherent_1.toast.success('Copied to clipboard!');
        }
        else {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        if (onClick) {
            onClick(e);
        }
    };
    return (react_1.default.createElement(Icon_1.default, { name: copied ? 'tick' : 'copy', "data-event-name": "Copy", "data-testid": "copy-btn", className: className, onClick: handleCopy }));
};
exports.default = Copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Db3B5L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUF3QztBQUN4QyxzREFBZ0Q7QUFDaEQsbURBQTJCO0FBQzNCLCtDQUFxRDtBQUdyRCxNQUFNLElBQUksR0FBRyxDQUFDLEVBQ1osS0FBSyxFQUNMLE9BQU8sRUFDUCxTQUFTLEdBQUcsS0FBSyxFQUNqQixTQUFTLEdBQUcsY0FBYyxHQUNoQixFQUFFLEVBQUU7SUFDZCxNQUFNLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUU1QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQStDLEVBQUUsRUFBRTtRQUNyRSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFcEIsSUFBQSx3QkFBZSxFQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRS9CLElBQUksU0FBUyxFQUFFLENBQUM7WUFDZCxnQkFBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7YUFBTSxDQUFDO1lBQ04sU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUNMLDhCQUFDLGNBQUksSUFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0scUJBQ2QsTUFBTSxpQkFDVixVQUFVLEVBQ3RCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE9BQU8sRUFBRSxVQUFVLEdBQ25CLENBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLGtCQUFlLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnQGNhc2hmcmVlLWludGwvY29oZXJlbnQnO1xuaW1wb3J0IEljb24gZnJvbSAnLi4vSWNvbic7XG5pbXBvcnQgeyBjb3B5VG9DbGlwYm9hcmQgfSBmcm9tICcuLi8uLi91dGlscy9jb21tb24nO1xuaW1wb3J0IHR5cGUgeyBDb3B5UHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgQ29weSA9ICh7XG4gIHZhbHVlLFxuICBvbkNsaWNrLFxuICBzaG93VG9hc3QgPSBmYWxzZSxcbiAgY2xhc3NOYW1lID0gJ3BvaW50ZXIgbWwtMScsXG59OiBDb3B5UHJvcHMpID0+IHtcbiAgY29uc3QgW2NvcGllZCwgc2V0Q29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBoYW5kbGVDb3B5ID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQsIE1vdXNlRXZlbnQ+KSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNvcHlUb0NsaXBib2FyZChTdHJpbmcodmFsdWUpKTtcblxuICAgIGlmIChzaG93VG9hc3QpIHtcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoJ0NvcGllZCB0byBjbGlwYm9hcmQhJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldENvcGllZCh0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkKGZhbHNlKSwgMjAwMCk7XG4gICAgfVxuXG4gICAgaWYgKG9uQ2xpY2spIHtcbiAgICAgIG9uQ2xpY2soZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPEljb25cbiAgICAgIG5hbWU9e2NvcGllZCA/ICd0aWNrJyA6ICdjb3B5J31cbiAgICAgIGRhdGEtZXZlbnQtbmFtZT1cIkNvcHlcIlxuICAgICAgZGF0YS10ZXN0aWQ9XCJjb3B5LWJ0blwiXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvcHk7XG5leHBvcnQgdHlwZSB7IENvcHlQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuIl19