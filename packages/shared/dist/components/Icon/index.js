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
exports.iconMap = void 0;
const react_1 = __importDefault(require("react"));
const styled_components_1 = require("styled-components");
const Icons = __importStar(require("../CustomIcons"));
exports.iconMap = {
    add: Icons.Add,
    'auto-collect': Icons.AutoCollect,
    baas: Icons.Bass,
    burger: Icons.Burger,
    'burger-close': Icons.BurgerClose,
    'chevron-down': Icons.ChevronDown,
    'chevron-left': Icons.ChevronLeft,
    'chevron-right': Icons.ChevronRight,
    'chevron-up': Icons.ChevronUp,
    copy: Icons.Copy,
    cross: Icons.Cross,
    crossborder: Icons.CrossBorder,
    csv: Icons.Csv,
    delete: Icons.Delete,
    download: Icons.Download,
    ellipsis: Icons.Ellipsis,
    info: Icons.Info,
    'in-out': Icons.InOut,
    logout: Icons.Logout,
    minus: Icons.Minus,
    'open-link': Icons.OpenLink,
    payout: Icons.Payout,
    pencil: Icons.Pencil,
    pg: Icons.Pg,
    profile: Icons.Profile,
    refresh: Icons.Refresh,
    send: Icons.Send,
    settings: Icons.Settings,
    'status-page': Icons.StatusPage,
    stop: Icons.Stop,
    subscriptions: Icons.Subscriptions,
    switch: Icons.Switch,
    test: Icons.Test,
    tick: Icons.Tick,
    'circle-tick': Icons.CircleTick,
    'tick-outline': Icons.TickOutline,
    'top-right-arrow': Icons.TopRightArrow,
    'verification-suite': Icons.VerificationSuite,
    xls: Icons.Xls,
    // VS Specific names (aliases or unique)
    developers: Icons.Developers || Icons.Settings, // Fallback if not yet migrated
    settlements: Icons.Settlements,
    Aadhaar: Icons.Aadhaar,
    BAV: Icons.Bav,
    UPI: Icons.Upi,
    PAN: Icons.Pan,
    AADHAAR_OCR: Icons.AadhaarOCR,
    PAN_OCR: Icons.PanOCR,
    SecureIdentityVerification: Icons.SecureIdentityVerification,
    Cashfree: Icons.Cashfree,
    MobileKeypad: Icons.MobileKeypad,
    'navigate-right': Icons.NavigateRight,
    reset: Icons.Reset,
    'plus-edge': Icons.PlusEdge,
    'primary-plus': Icons.PrimaryPlus,
    condition: Icons.Condition,
    mobile: Icons.Mobile,
    'circular-left': Icons.CircularChevronLeft,
    'circular-right': Icons.CircularChevronRight,
    'send-kyc-forms': Icons.SendKycForm,
    'api-twotone': Icons.ApiTwoTone,
    'create-new': Icons.CreateNew,
    'employee-onboarding': Icons.EmployeeOnboarding,
    others: Icons.LendingUser,
    undo: Icons.Undo,
    redo: Icons.Redo,
    APIKey: Icons.APIKey,
    Thunder: Icons.Thunder,
    Share: Icons.Share,
    Certified: Icons.Certified,
    vault: Icons.Vault,
    'cashfree-logo': Icons.CashfreeLogo,
    drag: Icons.Drag,
    plus: Icons.Plus,
};
const Icon = ({ name, verticalAlign = 'middle', ...props }) => {
    const Component = exports.iconMap[name];
    if (!Component) {
        console.warn(`Icon "${name}" not found in iconMap`);
        return null;
    }
    return (react_1.default.createElement(Component, { style: { verticalAlign, ...props.style }, role: name, "data-testid": name, ...props }));
};
exports.default = (0, styled_components_1.withTheme)(Icon);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9JY29uL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBMEI7QUFDMUIseURBQThDO0FBQzlDLHNEQUF3QztBQVkzQixRQUFBLE9BQU8sR0FBa0M7SUFDcEQsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO0lBQ2QsY0FBYyxFQUFFLEtBQUssQ0FBQyxXQUFXO0lBQ2pDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtJQUNoQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07SUFDcEIsY0FBYyxFQUFFLEtBQUssQ0FBQyxXQUFXO0lBQ2pDLGNBQWMsRUFBRSxLQUFLLENBQUMsV0FBVztJQUNqQyxjQUFjLEVBQUUsS0FBSyxDQUFDLFdBQVc7SUFDakMsZUFBZSxFQUFFLEtBQUssQ0FBQyxZQUFZO0lBQ25DLFlBQVksRUFBRSxLQUFLLENBQUMsU0FBUztJQUM3QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7SUFDaEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO0lBQ2xCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztJQUM5QixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7SUFDZCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07SUFDcEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO0lBQ3hCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtJQUN4QixJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7SUFDaEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLO0lBQ3JCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtJQUNwQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7SUFDbEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxRQUFRO0lBQzNCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFB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QUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLHdCQUF3QixDQUFDLENBQUM7UUFDcEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsT0FBTyxDQUNMLDhCQUFDLFNBQVMsSUFDUixLQUFLLEVBQUUsRUFBRSxhQUFhLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQ3hDLElBQUksRUFBRSxJQUFJLGlCQUNHLElBQUksS0FDYixLQUFLLEdBQ1QsQ0FDSCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsa0JBQWUsSUFBQSw2QkFBUyxFQUFDLElBQUksQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhUaGVtZSB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCAqIGFzIEljb25zIGZyb20gJy4uL0N1c3RvbUljb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBJY29uUHJvcHMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnRpY2FsQWxpZ24/OiAnYm90dG9tJyB8ICdtaWRkbGUnIHwgJ3RvcCc7XG4gIGZpbGw/OiBzdHJpbmc7XG4gIHRoZW1lPzogYW55O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgb25DbGljaz86IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgaWNvbk1hcDogUmVjb3JkPHN0cmluZywgUmVhY3QuRkM8YW55Pj4gPSB7XG4gIGFkZDogSWNvbnMuQWRkLFxuICAnYXV0by1jb2xsZWN0JzogSWNvbnMuQXV0b0NvbGxlY3QsXG4gIGJhYXM6IEljb25zLkJhc3MsXG4gIGJ1cmdlcjogSWNvbnMuQnVyZ2VyLFxuICAnYnVyZ2VyLWNsb3NlJzogSWNvbnMuQnVyZ2VyQ2xvc2UsXG4gICdjaGV2cm9uLWRvd24nOiBJY29ucy5DaGV2cm9uRG93bixcbiAgJ2NoZXZyb24tbGVmdCc6IEljb25zLkNoZXZyb25MZWZ0LFxuICAnY2hldnJvbi1yaWdodCc6IEljb25zLkNoZXZyb25SaWdodCxcbiAgJ2NoZXZyb24tdXAnOiBJY29ucy5DaGV2cm9uVXAsXG4gIGNvcHk6IEljb25zLkNvcHksXG4gIGNyb3NzOiBJY29ucy5Dcm9zcyxcbiAgY3Jvc3Nib3JkZXI6IEljb25zLkNyb3NzQm9yZGVyLFxuICBjc3Y6IEljb25zLkNzdixcbiAgZGVsZXRlOiBJY29ucy5EZWxldGUsXG4gIGRvd25sb2FkOiBJY29ucy5Eb3dubG9hZCxcbiAgZWxsaXBzaXM6IEljb25zLkVsbGlwc2lzLFxuICBpbmZvOiBJY29ucy5JbmZvLFxuICAnaW4tb3V0JzogSWNvbnMuSW5PdXQsXG4gIGxvZ291dDogSWNvbnMuTG9nb3V0LFxuICBtaW51czogSWNvbnMuTWludXMsXG4gICdvcGVuLWxpbmsnOiBJY29ucy5PcGVuTGluayxcbiAgcGF5b3V0OiBJY29ucy5QYXlvdXQsXG4gIHBlbmNpbDogSWNvbnMuUGVuY2lsLFxuICBwZzogSWNvbnMuUGcsXG4gIHByb2ZpbGU6IEljb25zLlByb2ZpbGUsXG4gIHJlZnJlc2g6IEljb25zLlJlZnJlc2gsXG4gIHNlbmQ6IEljb25zLlNlbmQsXG4gIHNldHRpbmdzOiBJY29ucy5TZXR0aW5ncyxcbiAgJ3N0YXR1cy1wYWdlJzogSWNvbnMuU3RhdHVzUGFnZSxcbiAgc3RvcDogSWNvbnMuU3RvcCxcbiAgc3Vic2NyaXB0aW9uczogSWNvbnMuU3Vic2NyaXB0aW9ucyxcbiAgc3dpdGNoOiBJY29ucy5Td2l0Y2gsXG4gIHRlc3Q6IEljb25zLlRlc3QsXG4gIHRpY2s6IEljb25zLlRpY2ssXG4gICdjaXJjbGUtdGljayc6IEljb25zLkNpcmNsZVRpY2ssXG4gICd0aWNrLW91dGxpbmUnOiBJY29ucy5UaWNrT3V0bGluZSxcbiAgJ3RvcC1yaWdodC1hcnJvdyc6IEljb25zLlRvcFJpZ2h0QXJyb3csXG4gICd2ZXJpZmljYXRpb24tc3VpdGUnOiBJY29ucy5WZXJpZmljYXRpb25TdWl0ZSxcbiAgeGxzOiBJY29ucy5YbHMsXG4gIC8vIFZTIFNwZWNpZmljIG5hbWVzIChhbGlhc2VzIG9yIHVuaXF1ZSlcbiAgZGV2ZWxvcGVyczogKEljb25zIGFzIGFueSkuRGV2ZWxvcGVycyB8fCBJY29ucy5TZXR0aW5ncywgLy8gRmFsbGJhY2sgaWYgbm90IHlldCBtaWdyYXRlZFxuICBzZXR0bGVtZW50czogKEljb25zIGFzIGFueSkuU2V0dGxlbWVudHMsXG4gIEFhZGhhYXI6IChJY29ucyBhcyBhbnkpLkFhZGhhYXIsXG4gIEJBVjogKEljb25zIGFzIGFueSkuQmF2LFxuICBVUEk6IChJY29ucyBhcyBhbnkpLlVwaSxcbiAgUEFOOiAoSWNvbnMgYXMgYW55KS5QYW4sXG4gIEFBREhBQVJfT0NSOiAoSWNvbnMgYXMgYW55KS5BYWRoYWFyT0NSLFxuICBQQU5fT0NSOiAoSWNvbnMgYXMgYW55KS5QYW5PQ1IsXG4gIFNlY3VyZUlkZW50aXR5VmVyaWZpY2F0aW9uOiAoSWNvbnMgYXMgYW55KS5TZWN1cmVJZGVudGl0eVZlcmlmaWNhdGlvbixcbiAgQ2FzaGZyZWU6IChJY29ucyBhcyBhbnkpLkNhc2hmcmVlLFxuICBNb2JpbGVLZXlwYWQ6IChJY29ucyBhcyBhbnkpLk1vYmlsZUtleXBhZCxcbiAgJ25hdmlnYXRlLXJpZ2h0JzogKEljb25zIGFzIGFueSkuTmF2aWdhdGVSaWdodCxcbiAgcmVzZXQ6IChJY29ucyBhcyBhbnkpLlJlc2V0LFxuICAncGx1cy1lZGdlJzogKEljb25zIGFzIGFueSkuUGx1c0VkZ2UsXG4gICdwcmltYXJ5LXBsdXMnOiAoSWNvbnMgYXMgYW55KS5QcmltYXJ5UGx1cyxcbiAgY29uZGl0aW9uOiAoSWNvbnMgYXMgYW55KS5Db25kaXRpb24sXG4gIG1vYmlsZTogKEljb25zIGFzIGFueSkuTW9iaWxlLFxuICAnY2lyY3VsYXItbGVmdCc6IChJY29ucyBhcyBhbnkpLkNpcmN1bGFyQ2hldnJvbkxlZnQsXG4gICdjaXJjdWxhci1yaWdodCc6IChJY29ucyBhcyBhbnkpLkNpcmN1bGFyQ2hldnJvblJpZ2h0LFxuICAnc2VuZC1reWMtZm9ybXMnOiAoSWNvbnMgYXMgYW55KS5TZW5kS3ljRm9ybSxcbiAgJ2FwaS10d290b25lJzogKEljb25zIGFzIGFueSkuQXBpVHdvVG9uZSxcbiAgJ2NyZWF0ZS1uZXcnOiAoSWNvbnMgYXMgYW55KS5DcmVhdGVOZXcsXG4gICdlbXBsb3llZS1vbmJvYXJkaW5nJzogKEljb25zIGFzIGFueSkuRW1wbG95ZWVPbmJvYXJkaW5nLFxuICBvdGhlcnM6IChJY29ucyBhcyBhbnkpLkxlbmRpbmdVc2VyLFxuICB1bmRvOiAoSWNvbnMgYXMgYW55KS5VbmRvLFxuICByZWRvOiAoSWNvbnMgYXMgYW55KS5SZWRvLFxuICBBUElLZXk6IChJY29ucyBhcyBhbnkpLkFQSUtleSxcbiAgVGh1bmRlcjogKEljb25zIGFzIGFueSkuVGh1bmRlcixcbiAgU2hhcmU6IChJY29ucyBhcyBhbnkpLlNoYXJlLFxuICBDZXJ0aWZpZWQ6IChJY29ucyBhcyBhbnkpLkNlcnRpZmllZCxcbiAgdmF1bHQ6IChJY29ucyBhcyBhbnkpLlZhdWx0LFxuICAnY2FzaGZyZWUtbG9nbyc6IChJY29ucyBhcyBhbnkpLkNhc2hmcmVlTG9nbyxcbiAgZHJhZzogKEljb25zIGFzIGFueSkuRHJhZyxcbiAgcGx1czogKEljb25zIGFzIGFueSkuUGx1cyxcbn07XG5cbmNvbnN0IEljb24gPSAoeyBuYW1lLCB2ZXJ0aWNhbEFsaWduID0gJ21pZGRsZScsIC4uLnByb3BzIH06IEljb25Qcm9wcykgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSBpY29uTWFwW25hbWVdO1xuXG4gIGlmICghQ29tcG9uZW50KSB7XG4gICAgY29uc29sZS53YXJuKGBJY29uIFwiJHtuYW1lfVwiIG5vdCBmb3VuZCBpbiBpY29uTWFwYCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnRcbiAgICAgIHN0eWxlPXt7IHZlcnRpY2FsQWxpZ24sIC4uLnByb3BzLnN0eWxlIH19XG4gICAgICByb2xlPXtuYW1lfVxuICAgICAgZGF0YS10ZXN0aWQ9e25hbWV9XG4gICAgICB7Li4ucHJvcHN9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhUaGVtZShJY29uKTtcbiJdfQ==