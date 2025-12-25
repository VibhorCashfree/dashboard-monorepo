export const isAdvanceEnabled = formObj =>
  formObj.retriveTypeOptions.find(option => option.checked)?.value ===
  'advance';
