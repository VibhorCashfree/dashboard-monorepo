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
const react_1 = __importDefault(require("react"));
const Sentry = __importStar(require("@sentry/react"));
const coherent_1 = require("@cashfree-intl/coherent");
const ErrorBoundary = ({ children, fallback, product, team, onGlobalError, additionalTags = {}, }) => {
    const handleError = ({ errMsg, componentStack, ...tags }) => {
        if (onGlobalError) {
            onGlobalError();
        }
        Sentry.captureException(errMsg, {
            tags: {
                ...tags,
                ...additionalTags,
            },
            contexts: {
                react: {
                    componentStack,
                },
            },
        });
    };
    return (react_1.default.createElement(coherent_1.ErrorBoundary, { onError: handleError, fallback: fallback, customErrorConfig: {
            product,
            team,
            merchantId: coherent_1.LocalStorage.getItemFromLocalStorage('merchantId'),
            accountId: coherent_1.LocalStorage.getItemFromLocalStorage('accountId'),
            env: coherent_1.LocalStorage.getItemFromLocalStorage('env'),
        } }, children));
};
exports.default = ErrorBoundary;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQixzREFBd0M7QUFDeEMsc0RBQWdHO0FBV2hHLE1BQU0sYUFBYSxHQUFHLENBQUMsRUFDckIsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsSUFBSSxFQUNKLGFBQWEsRUFDYixjQUFjLEdBQUcsRUFBRSxHQUNBLEVBQUUsRUFBRTtJQUN2QixNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQ25CLE1BQU0sRUFDTixjQUFjLEVBQ2QsR0FBRyxJQUFJLEVBS1IsRUFBRSxFQUFFO1FBQ0gsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixhQUFhLEVBQUUsQ0FBQztRQUNsQixDQUFDO1FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLEVBQUU7Z0JBQ0osR0FBRyxJQUFJO2dCQUNQLEdBQUcsY0FBYzthQUNsQjtZQUNELFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUU7b0JBQ0wsY0FBYztpQkFDZjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUNMLDhCQUFDLHdCQUFzQixJQUNyQixPQUFPLEVBQUUsV0FBVyxFQUNwQixRQUFRLEVBQUUsUUFBUSxFQUNsQixpQkFBaUIsRUFBRTtZQUNqQixPQUFPO1lBQ1AsSUFBSTtZQUNKLFVBQVUsRUFBRSx1QkFBWSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQztZQUM5RCxTQUFTLEVBQUUsdUJBQVksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7WUFDNUQsR0FBRyxFQUFFLHVCQUFZLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDO1NBQ2pELElBRUEsUUFBUSxDQUNjLENBQzFCLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixrQkFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvcmVhY3QnO1xuaW1wb3J0IHsgRXJyb3JCb3VuZGFyeSBhcyBFcnJvckJvdW5kYXJ5Q29tcG9uZW50LCBMb2NhbFN0b3JhZ2UgfSBmcm9tICdAY2FzaGZyZWUtaW50bC9jb2hlcmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JCb3VuZGFyeVByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgZmFsbGJhY2s/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHByb2R1Y3Q6IHN0cmluZztcbiAgdGVhbTogc3RyaW5nO1xuICBvbkdsb2JhbEVycm9yPzogKCkgPT4gdm9pZDtcbiAgYWRkaXRpb25hbFRhZ3M/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCB1bmRlZmluZWQ+O1xufVxuXG5jb25zdCBFcnJvckJvdW5kYXJ5ID0gKHtcbiAgY2hpbGRyZW4sXG4gIGZhbGxiYWNrLFxuICBwcm9kdWN0LFxuICB0ZWFtLFxuICBvbkdsb2JhbEVycm9yLFxuICBhZGRpdGlvbmFsVGFncyA9IHt9LFxufTogRXJyb3JCb3VuZGFyeVByb3BzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZUVycm9yID0gKHtcbiAgICBlcnJNc2csXG4gICAgY29tcG9uZW50U3RhY2ssXG4gICAgLi4udGFnc1xuICB9OiB7XG4gICAgZXJyTXNnOiBzdHJpbmc7XG4gICAgY29tcG9uZW50U3RhY2s/OiBzdHJpbmc7XG4gICAgW2tleTogc3RyaW5nXTogYW55O1xuICB9KSA9PiB7XG4gICAgaWYgKG9uR2xvYmFsRXJyb3IpIHtcbiAgICAgIG9uR2xvYmFsRXJyb3IoKTtcbiAgICB9XG5cbiAgICBTZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihlcnJNc2csIHtcbiAgICAgIHRhZ3M6IHtcbiAgICAgICAgLi4udGFncyxcbiAgICAgICAgLi4uYWRkaXRpb25hbFRhZ3MsXG4gICAgICB9LFxuICAgICAgY29udGV4dHM6IHtcbiAgICAgICAgcmVhY3Q6IHtcbiAgICAgICAgICBjb21wb25lbnRTdGFjayxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8RXJyb3JCb3VuZGFyeUNvbXBvbmVudFxuICAgICAgb25FcnJvcj17aGFuZGxlRXJyb3J9XG4gICAgICBmYWxsYmFjaz17ZmFsbGJhY2t9XG4gICAgICBjdXN0b21FcnJvckNvbmZpZz17e1xuICAgICAgICBwcm9kdWN0LFxuICAgICAgICB0ZWFtLFxuICAgICAgICBtZXJjaGFudElkOiBMb2NhbFN0b3JhZ2UuZ2V0SXRlbUZyb21Mb2NhbFN0b3JhZ2UoJ21lcmNoYW50SWQnKSxcbiAgICAgICAgYWNjb3VudElkOiBMb2NhbFN0b3JhZ2UuZ2V0SXRlbUZyb21Mb2NhbFN0b3JhZ2UoJ2FjY291bnRJZCcpLFxuICAgICAgICBlbnY6IExvY2FsU3RvcmFnZS5nZXRJdGVtRnJvbUxvY2FsU3RvcmFnZSgnZW52JyksXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0Vycm9yQm91bmRhcnlDb21wb25lbnQ+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFcnJvckJvdW5kYXJ5O1xuIl19