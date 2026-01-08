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
const styled_components_1 = __importDefault(require("styled-components"));
const StyledDropdownItem = (0, styled_components_1.default)(coherent_1.Dropdown.Item) `
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundLight};
  }
`;
const DropdownButton = ({ id, children, options, onClick, dropdownMinWidth = 224, }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement(coherent_1.Dropdown, { icon: null, trigger: children(open), onOpen: () => setOpen(true), onClose: () => setOpen(false) },
        react_1.default.createElement(coherent_1.DropdownMenu, { id: id, direction: "left", style: { minWidth: dropdownMinWidth } },
            react_1.default.createElement(coherent_1.Dropdown.Menu, { scrolling: true }, options.map((option) => (react_1.default.createElement(StyledDropdownItem, { key: option.value, label: option.description ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(coherent_1.Text, { className: "mb-1" }, option.text),
                    react_1.default.createElement(coherent_1.Text, { variant: "b12", color: "bodyLight" }, option.description))) : (react_1.default.createElement(coherent_1.Space, null,
                    option.icon && (react_1.default.createElement(coherent_1.Image, { inline: true, src: option.icon, className: "mr-1", verticalAlign: "top" })),
                    react_1.default.createElement(coherent_1.Text, null, option.text))), disabled: option.disabled, onClick: () => onClick(option.value) })))))));
};
exports.default = DropdownButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Ecm9wZG93bkJ1dHRvbi9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBd0M7QUFDeEMsc0RBTWlDO0FBQ2pDLDBFQUF1QztBQUV2QyxNQUFNLGtCQUFrQixHQUFHLElBQUEsMkJBQU0sRUFBQyxtQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFBOzs7O3dCQUl4QixDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZTs7Q0FFekUsQ0FBQztBQWtCRixNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQ3RCLEVBQUUsRUFDRixRQUFRLEVBQ1IsT0FBTyxFQUNQLE9BQU8sRUFDUCxnQkFBZ0IsR0FBRyxHQUFHLEdBQ0YsRUFBRSxFQUFFO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhDLE9BQU8sQ0FDTCw4QkFBQyxtQkFBUSxJQUNQLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFDM0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFN0IsOEJBQUMsdUJBQVksSUFDWCxFQUFFLEVBQUUsRUFBRSxFQUNOLFNBQVMsRUFBQyxNQUFNLEVBQ2hCLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRTtZQUVyQyw4QkFBQyxtQkFBUSxDQUFDLElBQUksSUFBQyxTQUFTLFVBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQ3ZCLDhCQUFDLGtCQUFrQixJQUNqQixHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFDakIsS0FBSyxFQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQ25CO29CQUNFLDhCQUFDLGVBQUksSUFBQyxTQUFTLEVBQUMsTUFBTSxJQUFFLE1BQU0sQ0FBQyxJQUFJLENBQVE7b0JBQzNDLDhCQUFDLGVBQUksSUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLElBQ2xDLE1BQU0sQ0FBQyxXQUFXLENBQ2QsQ0FDTixDQUNKLENBQUMsQ0FBQyxDQUFDLENBQ0YsOEJBQUMsZ0JBQUs7b0JBQ0gsTUFBTSxDQUFDLElBQUksSUFBSSxDQUNkLDhCQUFDLGdCQUFLLElBQ0osTUFBTSxRQUNOLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUNoQixTQUFTLEVBQUMsTUFBTSxFQUNoQixhQUFhLEVBQUMsS0FBSyxHQUNuQixDQUNIO29CQUNELDhCQUFDLGVBQUksUUFBRSxNQUFNLENBQUMsSUFBSSxDQUFRLENBQ3BCLENBQ1QsRUFFSCxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFDekIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQ3BDLENBQ0gsQ0FBQyxDQUNZLENBQ0gsQ0FDTixDQUNaLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixrQkFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBJbWFnZSxcbiAgU3BhY2UsXG4gIFRleHQsXG4gIERyb3Bkb3duLFxuICBEcm9wZG93bk1lbnUsXG59IGZyb20gJ0BjYXNoZnJlZS1pbnRsL2NvaGVyZW50JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBTdHlsZWREcm9wZG93bkl0ZW0gPSBzdHlsZWQoRHJvcGRvd24uSXRlbSlgXG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyhwcm9wczogYW55KSA9PiBwcm9wcy50aGVtZS5jb2xvcnMuYmFja2dyb3VuZExpZ2h0fTtcbiAgfVxuYDtcblxuZXhwb3J0IGludGVyZmFjZSBEcm9wZG93bk9wdGlvbiB7XG4gIHZhbHVlOiBhbnk7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIGljb24/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25CdXR0b25Qcm9wcyB7XG4gIGlkPzogc3RyaW5nO1xuICBjaGlsZHJlbjogKG9wZW46IGJvb2xlYW4pID0+IFJlYWN0LlJlYWN0Tm9kZTtcbiAgb3B0aW9uczogRHJvcGRvd25PcHRpb25bXTtcbiAgb25DbGljazogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG4gIGRyb3Bkb3duTWluV2lkdGg/OiBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmNvbnN0IERyb3Bkb3duQnV0dG9uID0gKHtcbiAgaWQsXG4gIGNoaWxkcmVuLFxuICBvcHRpb25zLFxuICBvbkNsaWNrLFxuICBkcm9wZG93bk1pbldpZHRoID0gMjI0LFxufTogRHJvcGRvd25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RHJvcGRvd25cbiAgICAgIGljb249e251bGx9XG4gICAgICB0cmlnZ2VyPXtjaGlsZHJlbihvcGVuKX1cbiAgICAgIG9uT3Blbj17KCkgPT4gc2V0T3Blbih0cnVlKX1cbiAgICAgIG9uQ2xvc2U9eygpID0+IHNldE9wZW4oZmFsc2UpfVxuICAgID5cbiAgICAgIDxEcm9wZG93bk1lbnVcbiAgICAgICAgaWQ9e2lkfVxuICAgICAgICBkaXJlY3Rpb249XCJsZWZ0XCJcbiAgICAgICAgc3R5bGU9e3sgbWluV2lkdGg6IGRyb3Bkb3duTWluV2lkdGggfX1cbiAgICAgID5cbiAgICAgICAgPERyb3Bkb3duLk1lbnUgc2Nyb2xsaW5nPlxuICAgICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICA8U3R5bGVkRHJvcGRvd25JdGVtXG4gICAgICAgICAgICAgIGtleT17b3B0aW9uLnZhbHVlfVxuICAgICAgICAgICAgICBsYWJlbD17XG4gICAgICAgICAgICAgICAgb3B0aW9uLmRlc2NyaXB0aW9uID8gKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFRleHQgY2xhc3NOYW1lPVwibWItMVwiPntvcHRpb24udGV4dH08L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0IHZhcmlhbnQ9XCJiMTJcIiBjb2xvcj1cImJvZHlMaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8U3BhY2U+XG4gICAgICAgICAgICAgICAgICAgIHtvcHRpb24uaWNvbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYz17b3B0aW9uLmljb259XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtci0xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ249XCJ0b3BcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxUZXh0PntvcHRpb24udGV4dH08L1RleHQ+XG4gICAgICAgICAgICAgICAgICA8L1NwYWNlPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17b3B0aW9uLmRpc2FibGVkfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrKG9wdGlvbi52YWx1ZSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0Ryb3Bkb3duLk1lbnU+XG4gICAgICA8L0Ryb3Bkb3duTWVudT5cbiAgICA8L0Ryb3Bkb3duPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRHJvcGRvd25CdXR0b247XG4iXX0=