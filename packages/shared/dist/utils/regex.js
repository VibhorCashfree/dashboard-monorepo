"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDocumentInfo = exports.beneId = exports.vpa = exports.iban = exports.gstIn = exports.pan = exports.cin = exports.ifsc = exports.journeyName = exports.voterId = exports.drivingLicense = exports.registrationCertificate = exports.accountName = exports.url = exports.email = exports.digitsAndDecimal = exports.digits = exports.alphaNumericWithWhitespacesUnderscoresAndHyphnes = exports.alphaNumericWithDotHyphen = exports.alphaNumericWithUnderscoresAndHyphnes = exports.alphaNumericWithUnderscores = exports.alphabetsWithWhitespaces = exports.alphaNumericWithWhitespaces = exports.alphaNumeric = exports.ip = void 0;
const identity_1 = __importDefault(require("lodash/identity"));
const ip = (value) => {
    const splits = value.split('.');
    if (splits.length !== 4 || splits.filter(identity_1.default).length !== 4) {
        return false;
    }
    const isPrivate = /(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/.test(value);
    return ((0, exports.digits)(splits.join('')) &&
        !((splits[0] === '224' && splits[1] === '0' && splits[2] === '0') ||
            (splits[0] === '169' && splits[1] === '254') ||
            splits[0] === '127' ||
            isPrivate));
};
exports.ip = ip;
const alphaNumeric = (value) => /^[a-zA-Z0-9]*$/.test(value);
exports.alphaNumeric = alphaNumeric;
const alphaNumericWithWhitespaces = (value) => /^[a-zA-Z0-9 ]*$/.test(value);
exports.alphaNumericWithWhitespaces = alphaNumericWithWhitespaces;
const alphabetsWithWhitespaces = (value) => /^[a-zA-Z ]*$/.test(value);
exports.alphabetsWithWhitespaces = alphabetsWithWhitespaces;
const alphaNumericWithUnderscores = (value) => /^\w*$/.test(value);
exports.alphaNumericWithUnderscores = alphaNumericWithUnderscores;
const alphaNumericWithUnderscoresAndHyphnes = (value) => /^[A-Za-z0-9_-]*$/.test(value);
exports.alphaNumericWithUnderscoresAndHyphnes = alphaNumericWithUnderscoresAndHyphnes;
const alphaNumericWithDotHyphen = (value) => /^[a-zA-Z0-9/&\s.-]+$/.test(value);
exports.alphaNumericWithDotHyphen = alphaNumericWithDotHyphen;
const alphaNumericWithWhitespacesUnderscoresAndHyphnes = (value) => /^[ A-Za-z0-9_-]*$/.test(value);
exports.alphaNumericWithWhitespacesUnderscoresAndHyphnes = alphaNumericWithWhitespacesUnderscoresAndHyphnes;
const digits = (value) => /^\d*$/.test(value);
exports.digits = digits;
const digitsAndDecimal = (value) => /^-?[0-9]+(\.[0-9]+)?$/.test(value);
exports.digitsAndDecimal = digitsAndDecimal;
const email = (value) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value.toLowerCase());
};
exports.email = email;
const url = (value) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i.test(value);
exports.url = url;
const accountName = (value) => /^[a-zA-Z0-9 &./-]*$/.test(value);
exports.accountName = accountName;
const registrationCertificate = (value) => /^([A-Z]|[a-z]){2}( |-)*[0-9]{1,2}(?:( |-)*([A-Z]|[a-z]))?(?:( |-)*([A-Z]|[a-z])*)?( |-)*[0-9]{4}$|^[0-9]{2}BH[0-9]{4}[A-HJ-NP-Z]{1,2}$|^([A-Z]{2}\d{2}[A-Z]{1,2}\d{4}|[A-Z]{2}\d{6,8}|[A-Z]{2}[0-9]{1,2}[0-9]{3}|[A-Z]{2}[A-Z]{1,2}\d{3}|[0-9]{1,4}[A-Z]{1,2}\d{1,4})$/.test(value);
exports.registrationCertificate = registrationCertificate;
const drivingLicense = (value) => /^[a-zA-Z0-9\-\s]+$/.test(value);
exports.drivingLicense = drivingLicense;
const voterId = (value) => /^([a-zA-Z]{3}[0-9]{7}|[A-Z]{2}\/\d{1,3}\/\d{1,4}\/\d{1,7})$/.test(value);
exports.voterId = voterId;
const journeyName = (value) => /^[A-Za-z][A-Za-z0-9._-]*$/.test(value);
exports.journeyName = journeyName;
const ifsc = (value) => /^[A-Z|a-z]{4}[0][A-Z|a-z|0-9]{6}$/.test(value);
exports.ifsc = ifsc;
const cin = (value) => /^([LlUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/.test(value);
exports.cin = cin;
const pan = (value) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
exports.pan = pan;
const gstIn = (value) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
exports.gstIn = gstIn;
const iban = (value) => /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,36}$/.test(value);
exports.iban = iban;
const vpa = (value) => /^[\w\.\-]+@(?!gmail\.com$|yahoo\.com$|outlook\.com$)[\w\.]+$/.test(value);
exports.vpa = vpa;
const beneId = (value) => new RegExp('^[\\|\\w\\d._]+$').test(value);
exports.beneId = beneId;
const formatDocumentInfo = (data) => {
    const formatList = data.map(doc => doc.replace(/_/g, ' ')).join(', ');
    return formatList;
};
exports.formatDocumentInfo = formatDocumentInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVnZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsK0RBQXdDO0FBRWpDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDbEMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVoQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQVMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNqRSxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNLFNBQVMsR0FDYix5R0FBeUcsQ0FBQyxJQUFJLENBQzVHLEtBQUssQ0FDTixDQUFDO0lBRUosT0FBTyxDQUNMLElBQUEsY0FBTSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUNDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUM7WUFDL0QsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7WUFDbkIsU0FBUyxDQUNWLENBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQztBQXJCVyxRQUFBLEVBQUUsTUFxQmI7QUFFSyxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQS9ELFFBQUEsWUFBWSxnQkFBbUQ7QUFDckUsTUFB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eSBmcm9tICdsb2Rhc2gvaWRlbnRpdHknO1xuXG5leHBvcnQgY29uc3QgaXAgPSAodmFsdWU6IHN0cmluZykgPT4ge1xuICBjb25zdCBzcGxpdHMgPSB2YWx1ZS5zcGxpdCgnLicpO1xuXG4gIGlmIChzcGxpdHMubGVuZ3RoICE9PSA0IHx8IHNwbGl0cy5maWx0ZXIoX2lkZW50aXR5KS5sZW5ndGggIT09IDQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBpc1ByaXZhdGUgPVxuICAgIC8oXjEyN1xcLil8KF4xOTJcXC4xNjhcXC4pfCheMTBcXC4pfCheMTcyXFwuMVs2LTldXFwuKXwoXjE3MlxcLjJbMC05XVxcLil8KF4xNzJcXC4zWzAtMV1cXC4pfCheOjoxJCl8KF5bZkZdW2NDZERdKS8udGVzdChcbiAgICAgIHZhbHVlLFxuICAgICk7XG5cbiAgcmV0dXJuIChcbiAgICBkaWdpdHMoc3BsaXRzLmpvaW4oJycpKSAmJlxuICAgICEoXG4gICAgICAoc3BsaXRzWzBdID09PSAnMjI0JyAmJiBzcGxpdHNbMV0gPT09ICcwJyAmJiBzcGxpdHNbMl0gPT09ICcwJykgfHxcbiAgICAgIChzcGxpdHNbMF0gPT09ICcxNjknICYmIHNwbGl0c1sxXSA9PT0gJzI1NCcpIHx8XG4gICAgICBzcGxpdHNbMF0gPT09ICcxMjcnIHx8XG4gICAgICBpc1ByaXZhdGVcbiAgICApXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgYWxwaGFOdW1lcmljID0gKHZhbHVlOiBzdHJpbmcpID0+IC9eW2EtekEtWjAtOV0qJC8udGVzdCh2YWx1ZSk7XG5leHBvcnQgY29uc3QgYWxwaGFOdW1lcmljV2l0aFdoaXRlc3BhY2VzID0gKHZhbHVlOiBzdHJpbmcpID0+XG4gIC9eW2EtekEtWjAtOSBdKiQvLnRlc3QodmFsdWUpO1xuZXhwb3J0IGNvbnN0IGFscGhhYmV0c1dpdGhXaGl0ZXNwYWNlcyA9ICh2YWx1ZTogc3RyaW5nKSA9PiAvXlthLXpBLVogXSokLy50ZXN0KHZhbHVlKTtcbmV4cG9ydCBjb25zdCBhbHBoYU51bWVyaWNXaXRoVW5kZXJzY29yZXMgPSAodmFsdWU6IHN0cmluZykgPT4gL15cXHcqJC8udGVzdCh2YWx1ZSk7XG5leHBvcnQgY29uc3QgYWxwaGFOdW1lcmljV2l0aFVuZGVyc2NvcmVzQW5kSHlwaG5lcyA9ICh2YWx1ZTogc3RyaW5nKSA9PlxuICAvXltBLVphLXowLTlfLV0qJC8udGVzdCh2YWx1ZSk7XG5leHBvcnQgY29uc3QgYWxwaGFOdW1lcmljV2l0aERvdEh5cGhlbiA9ICh2YWx1ZTogc3RyaW5nKSA9PlxuICAvXlthLXpBLVowLTkvJlxccy4tXSskLy50ZXN0KHZhbHVlKTtcbmV4cG9ydCBjb25zdCBhbHBoYU51bWVyaWNXaXRoV2hpdGVzcGFjZXNVbmRlcnNjb3Jlc0FuZEh5cGhuZXMgPSAodmFsdWU6IHN0cmluZykgPT5cbiAgL15bIEEtWmEtejAtOV8tXSokLy50ZXN0KHZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGRpZ2l0cyA9ICh2YWx1ZTogc3RyaW5nKSA9PiAvXlxcZCokLy50ZXN0KHZhbHVlKTtcbmV4cG9ydCBjb25zdCBkaWdpdHNBbmREZWNpbWFsID0gKHZhbHVlOiBzdHJpbmcpID0+IC9eLT9bMC05XSsoXFwuWzAtOV0rKT8kLy50ZXN0KHZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGVtYWlsID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcmVnZXggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gIHJldHVybiByZWdleC50ZXN0KHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVybCA9ICh2YWx1ZTogc3RyaW5nKSA9PlxuICAvXmh0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fK34jPV17MSwyNTZ9XFwuW2EtekEtWjAtOSgpXXsxLDZ9XFxiKFstYS16QS1aMC05KClAOiVfKy5+Iz8mLy89XSopJC9pLnRlc3QoXG4gICAgdmFsdWUsXG4gICk7XG5cbmV4cG9ydCBjb25zdCBhY2NvdW50TmFtZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiAvXlthLXpBLVowLTkgJi4vLV0qJC8udGVzdCh2YWx1ZSk7XG5cbmV4cG9ydCBjb25zdCByZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PlxuICAvXihbQS1aXXxbYS16XSl7Mn0oIHwtKSpbMC05XXsxLDJ9KD86KCB8LSkqKFtBLVpdfFthLXpdKSk/KD86KCB8LSkqKFtBLVpdfFthLXpdKSopPyggfC0pKlswLTldezR9JHxeWzAtOV17Mn1CSFswLTldezR9W0EtSEotTlAtWl17MSwyfSR8XihbQS1aXXsyfVxcZHsyfVtBLVpdezEsMn1cXGR7NH18W0EtWl17Mn1cXGR7Niw4fXxbQS1aXXsyfVswLTldezEsMn1bMC05XXszfXxbQS1aXXsyfVtBLVpdezEsMn1cXGR7M318WzAtOV17MSw0fVtBLVpdezEsMn1cXGR7MSw0fSkkLy50ZXN0KFxuICAgIHZhbHVlLFxuICApO1xuXG5leHBvcnQgY29uc3QgZHJpdmluZ0xpY2Vuc2UgPSAodmFsdWU6IHN0cmluZykgPT4gL15bYS16QS1aMC05XFwtXFxzXSskLy50ZXN0KHZhbHVlKTtcbmV4cG9ydCBjb25zdCB2b3RlcklkID0gKHZhbHVlOiBzdHJpbmcpID0+XG4gIC9eKFthLXpBLVpdezN9WzAtOV17N318W0EtWl17Mn1cXC9cXGR7MSwzfVxcL1xcZHsxLDR9XFwvXFxkezEsN30pJC8udGVzdCh2YWx1ZSk7XG5leHBvcnQgY29uc3Qgam91cm5leU5hbWUgPSAodmFsdWU6IHN0cmluZykgPT4gL15bQS1aYS16XVtBLVphLXowLTkuXy1dKiQvLnRlc3QodmFsdWUpO1xuZXhwb3J0IGNvbnN0IGlmc2MgPSAodmFsdWU6IHN0cmluZykgPT4gL15bQS1afGEtel17NH1bMF1bQS1afGEtenwwLTldezZ9JC8udGVzdCh2YWx1ZSk7XG5leHBvcnQgY29uc3QgY2luID0gKHZhbHVlOiBzdHJpbmcpID0+XG4gIC9eKFtMbFV1XXsxfSkoWzAtOV17NX0pKFtBLVphLXpdezJ9KShbMC05XXs0fSkoW0EtWmEtel17M30pKFswLTldezZ9KSQvLnRlc3QoXG4gICAgdmFsdWUsXG4gICk7XG5cbmV4cG9ydCBjb25zdCBwYW4gPSAodmFsdWU6IHN0cmluZykgPT4gL15bQS1aXXs1fVswLTldezR9W0EtWl17MX0kLy50ZXN0KHZhbHVlKTtcbmV4cG9ydCBjb25zdCBnc3RJbiA9ICh2YWx1ZTogc3RyaW5nKSA9PlxuICAvXlswLTldezJ9W0EtWl17NX1bMC05XXs0fVtBLVpdezF9WzEtOUEtWl17MX1aWzAtOUEtWl17MX0kLy50ZXN0KHZhbHVlKTtcbmV4cG9ydCBjb25zdCBpYmFuID0gKHZhbHVlOiBzdHJpbmcpID0+IC9eW0EtWl17Mn1bMC05XXsyfVtBLVowLTldezEsMzZ9JC8udGVzdCh2YWx1ZSk7XG5cbmV4cG9ydCBjb25zdCB2cGEgPSAodmFsdWU6IHN0cmluZykgPT5cbiAgL15bXFx3XFwuXFwtXStAKD8hZ21haWxcXC5jb20kfHlhaG9vXFwuY29tJHxvdXRsb29rXFwuY29tJClbXFx3XFwuXSskLy50ZXN0KHZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGJlbmVJZCA9ICh2YWx1ZTogc3RyaW5nKSA9PiBuZXcgUmVnRXhwKCdeW1xcXFx8XFxcXHdcXFxcZC5fXSskJykudGVzdCh2YWx1ZSk7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXREb2N1bWVudEluZm8gPSAoZGF0YTogc3RyaW5nW10pID0+IHtcbiAgY29uc3QgZm9ybWF0TGlzdCA9IGRhdGEubWFwKGRvYyA9PiBkb2MucmVwbGFjZSgvXy9nLCAnICcpKS5qb2luKCcsICcpO1xuICByZXR1cm4gZm9ybWF0TGlzdDtcbn07XG4iXX0=