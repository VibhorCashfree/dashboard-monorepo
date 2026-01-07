"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.from = void 0;
const banks_1 = require("../constants/banks");
const banks_2 = __importDefault(require("../utils/banks"));
const from = (response) => {
    const VALID_BANKS = [banks_1.BANK_CODE.IDFB, banks_1.BANK_CODE.RBLB];
    return response.filter((account) => {
        const code = banks_2.default.getCode(account.ifsc);
        const bankCheck = VALID_BANKS.includes(code);
        const accountNumberCheck = !account.accountNumber.startsWith('808080');
        return bankCheck && accountNumberCheck;
    });
};
exports.from = from;
exports.default = {
    from: exports.from,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjaGFyZ2VBY2NvdW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGFwdGVycy9yZWNoYXJnZUFjY291bnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhDQUErQztBQUMvQywyREFBbUM7QUFRNUIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFvQixFQUFFLEVBQUU7SUFDM0MsTUFBTSxXQUFXLEdBQWEsQ0FBQyxpQkFBUyxDQUFDLElBQUksRUFBRSxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9ELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLGVBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZFLE9BQU8sU0FBUyxJQUFJLGtCQUFrQixDQUFDO0lBQ3pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBVlcsUUFBQSxJQUFJLFFBVWY7QUFFRixrQkFBZTtJQUNiLElBQUksRUFBSixZQUFJO0NBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJBTktfQ09ERSB9IGZyb20gJy4uL2NvbnN0YW50cy9iYW5rcyc7XG5pbXBvcnQgQmFua3MgZnJvbSAnLi4vdXRpbHMvYmFua3MnO1xuXG50eXBlIFJlc3BvbnNlID0ge1xuICBhY2NvdW50TnVtYmVyOiBzdHJpbmc7XG4gIGJhbmtOYW1lOiBzdHJpbmc7XG4gIGlmc2M6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBmcm9tID0gKHJlc3BvbnNlOiBSZXNwb25zZVtdKSA9PiB7XG4gIGNvbnN0IFZBTElEX0JBTktTOiBzdHJpbmdbXSA9IFtCQU5LX0NPREUuSURGQiwgQkFOS19DT0RFLlJCTEJdO1xuXG4gIHJldHVybiByZXNwb25zZS5maWx0ZXIoKGFjY291bnQpID0+IHtcbiAgICBjb25zdCBjb2RlID0gQmFua3MuZ2V0Q29kZShhY2NvdW50Lmlmc2MpO1xuICAgIGNvbnN0IGJhbmtDaGVjayA9IFZBTElEX0JBTktTLmluY2x1ZGVzKGNvZGUpO1xuICAgIGNvbnN0IGFjY291bnROdW1iZXJDaGVjayA9ICFhY2NvdW50LmFjY291bnROdW1iZXIuc3RhcnRzV2l0aCgnODA4MDgwJyk7XG5cbiAgICByZXR1cm4gYmFua0NoZWNrICYmIGFjY291bnROdW1iZXJDaGVjaztcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZyb20sXG59O1xuIl19