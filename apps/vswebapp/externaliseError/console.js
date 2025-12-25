import fs from 'fs';
export default async function transformer(file, api) {
  const j = api.jscodeshift;
  const source = j(file.source);
  const strings = {};
  const { appendFileSync } = fs;
  source
    .find(j.CallExpression, {
      callee: {
        object: { name: 'console' },
        property: { name: 'error' },
      },
    })
    .forEach(path => {
      const arr = path.value.arguments;
      arr.forEach(str => {
        if (str.type === 'Literal' && typeof str.value === 'string') {
          strings[str.value] = str.value;
        }
        if (str.type === 'TemplateLiteral') {
          const path = str;
          let concatVal = '';
          const quassisArr = path.quasis.map(qua => ({
            value: qua.value.raw,
            start: qua.start,
            end: qua.end,
            type: 'quassis',
          }));
          const expressionsArr = path.expressions.map(exp => ({
            value: exp.name,
            start: exp.start,
            end: exp.end,
            type: 'expressions',
          }));
          const allArr = [...quassisArr, ...expressionsArr];
          allArr.sort((a, b) => a.start - b.start);
          allArr.forEach(item => {
            if (item.type === 'expressions') {
              concatVal += '{{';
              concatVal += item.value;
              concatVal += '}}';
            } else {
              concatVal += item.value;
            }
          });
          strings[concatVal] = concatVal;
        }
      });
    });
  try {
    const jsonString = JSON.stringify(strings, null);
    const filePath = 'consoleErrorsList.json';
    await appendFileSync(filePath, jsonString);
    console.log('JSON file created successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
