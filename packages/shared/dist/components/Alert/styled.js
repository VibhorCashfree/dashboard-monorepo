"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledActions = exports.StyledContent = exports.StyledAlert = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const stylesByType = (props) => {
    const border = props.bordered
        ? `1px solid ${props.theme.COLORS[props.type || 'info']}`
        : 'none';
    return `
    background: ${props.theme.COLORS[props.type || 'info']}1a;      
    border: ${border};
    `;
};
const stylesByCompact = (props) => props.compact ? 'width: max-content;' : '';
const styledBySize = (props) => {
    switch (props.size) {
        case 'sm':
            return `font-size: 0.75rem;
      line-height: 16px;`;
        case 'md':
            return `font-size: 0.875rem;
        line-height: 18px;`;
        default:
            return `font-size: 0.875rem;
        line-height: 18px;`;
    }
};
exports.StyledAlert = styled_components_1.default.div `
  ${stylesByType}

  display: flex;
  gap: 1.5rem;
  align-items: center;
  color: ${(props) => props.theme.COLORS.body};
  font-family: ${(props) => props.theme.FONTS.semi_bold};
  border-radius: ${(props) => (props.rounded ? 8 : 0)}px;
  padding: 12px 16px;

  ${stylesByCompact}
`;
exports.StyledContent = styled_components_1.default.div `
  ${styledBySize}
  flex: auto;
`;
exports.StyledActions = styled_components_1.default.div `
  flex: 1;
  text-align: right;
  min-width: fit-content;
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvQWxlcnQvc3R5bGVkLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwwRUFBdUM7QUFHdkMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFrQixFQUFFLEVBQUU7SUFDMUMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVE7UUFDM0IsQ0FBQyxDQUFDLGFBQWEsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsRUFBRTtRQUN6RCxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRVgsT0FBTztrQkFDUyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQztjQUM1QyxNQUFNO0tBQ2YsQ0FBQztBQUNOLENBQUMsQ0FBQztBQUVGLE1BQU0sZUFBZSxHQUFHLENBQUMsS0FBaUIsRUFBRSxFQUFFLENBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFN0MsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUdyQixFQUFFLEVBQUU7SUFDSCxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQixLQUFLLElBQUk7WUFDUCxPQUFPO3lCQUNZLENBQUM7UUFFdEIsS0FBSyxJQUFJO1lBQ1AsT0FBTzsyQkFDYyxDQUFDO1FBRXhCO1lBQ0UsT0FBTzsyQkFDYyxDQUFDO0lBQzFCLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFVyxRQUFBLFdBQVcsR0FBRywyQkFBTSxDQUFDLEdBQUcsQ0FBYTtJQUM5QyxZQUFZOzs7OztXQUtMLENBQUMsS0FBa0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSTtpQkFDekMsQ0FBQyxLQUFrQixFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTO21CQUNqRCxDQUFDLEtBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztJQUc5RCxlQUFlO0NBQ2xCLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRywyQkFBTSxDQUFDLEdBQUcsQ0FHckM7SUFDRSxZQUFZOztDQUVmLENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRywyQkFBTSxDQUFDLEdBQUcsQ0FBQTs7OztDQUl0QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgdHlwZSB7IEFsZXJ0UHJvcHMsIFN0eWxlZFByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IHN0eWxlc0J5VHlwZSA9IChwcm9wczogU3R5bGVkUHJvcHMpID0+IHtcbiAgY29uc3QgYm9yZGVyID0gcHJvcHMuYm9yZGVyZWRcbiAgICA/IGAxcHggc29saWQgJHtwcm9wcy50aGVtZS5DT0xPUlNbcHJvcHMudHlwZSB8fCAnaW5mbyddfWBcbiAgICA6ICdub25lJztcblxuICByZXR1cm4gYFxuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMudGhlbWUuQ09MT1JTW3Byb3BzLnR5cGUgfHwgJ2luZm8nXX0xYTsgICAgICBcbiAgICBib3JkZXI6ICR7Ym9yZGVyfTtcbiAgICBgO1xufTtcblxuY29uc3Qgc3R5bGVzQnlDb21wYWN0ID0gKHByb3BzOiBBbGVydFByb3BzKSA9PlxuICBwcm9wcy5jb21wYWN0ID8gJ3dpZHRoOiBtYXgtY29udGVudDsnIDogJyc7XG5cbmNvbnN0IHN0eWxlZEJ5U2l6ZSA9IChwcm9wczoge1xuICBzaXplPzogJ3NtJyB8ICdtZCc7XG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XG59KSA9PiB7XG4gIHN3aXRjaCAocHJvcHMuc2l6ZSkge1xuICAgIGNhc2UgJ3NtJzpcbiAgICAgIHJldHVybiBgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgbGluZS1oZWlnaHQ6IDE2cHg7YDtcblxuICAgIGNhc2UgJ21kJzpcbiAgICAgIHJldHVybiBgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7YDtcbiAgICAgICAgXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7YDtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEFsZXJ0ID0gc3R5bGVkLmRpdjxTdHlsZWRQcm9wcz5gXG4gICR7c3R5bGVzQnlUeXBlfVxuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMS41cmVtO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogJHsocHJvcHM6IFN0eWxlZFByb3BzKSA9PiBwcm9wcy50aGVtZS5DT0xPUlMuYm9keX07XG4gIGZvbnQtZmFtaWx5OiAkeyhwcm9wczogU3R5bGVkUHJvcHMpID0+IHByb3BzLnRoZW1lLkZPTlRTLnNlbWlfYm9sZH07XG4gIGJvcmRlci1yYWRpdXM6ICR7KHByb3BzOiBTdHlsZWRQcm9wcykgPT4gKHByb3BzLnJvdW5kZWQgPyA4IDogMCl9cHg7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcblxuICAke3N0eWxlc0J5Q29tcGFjdH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRDb250ZW50ID0gc3R5bGVkLmRpdjx7XG4gIHNpemU/OiAnc20nIHwgJ21kJztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn0+YFxuICAke3N0eWxlZEJ5U2l6ZX1cbiAgZmxleDogYXV0bztcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRBY3Rpb25zID0gc3R5bGVkLmRpdmBcbiAgZmxleDogMTtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIG1pbi13aWR0aDogZml0LWNvbnRlbnQ7XG5gO1xuIl19