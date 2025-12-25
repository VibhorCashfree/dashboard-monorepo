import _pick from 'lodash/pick';
import _upperCase from 'lodash/upperCase';
import _startCase from 'lodash/startCase';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _flatten from 'lodash/flatten';

// constants
import {
  KYC_LINK_PRODUCT_MAPPING,
  ALL_FIELD_MAPPING,
  LOGICAL_MAPPING,
} from './constants';

export const getConditionOutput = products => {
  const subProducts = _pick(KYC_LINK_PRODUCT_MAPPING, products);
  return Object.keys(subProducts).reduce((previous, current) => {
    if (KYC_LINK_PRODUCT_MAPPING[current]) {
      const { outputFields } = KYC_LINK_PRODUCT_MAPPING[current];
      return [...previous, ...outputFields];
    }

    return previous;
  }, []);
};

export const toDropdownOptions = options =>
  options.map(option => {
    if (typeof option === 'string') {
      return {
        key: option,
        value: option,
        text: option.split('_').join(' '),
      };
    } else {
      return {
        key: option.value,
        value: option.value,
        text: option.text,
      };
    }
  });

export const getPositionX = (length, index = 0) => {
  const case1 = [0];
  const case2 = [-1, 1];
  const case3 = [-1, 0, 1];
  const case4 = [-2, -1, 1, 2];
  const case5 = [-2, -1, 0, 1, 2];
  const case6 = [-3, -2, -1, 1, 2, 3];
  switch (length) {
    case 1:
      return case1[index];

    case 2:
      return case2[index];

    case 3:
      return case3[index];

    case 4:
      return case4[index];

    case 5:
      return case5[index];

    case 6:
      return case6[index];
  }
};

export const getPositionY = (length, index = 0) => {
  const case1 = [0];
  const case2 = [2, 2];
  const case3 = [2, 2, 2];
  const case4 = [3, 2, 2, 3];
  const case5 = [4, 3, 2, 3, 4];
  const case6 = [4, 3, 2, 2, 3, 4];
  switch (length) {
    case 1:
      return case1[index];

    case 2:
      return case2[index];

    case 3:
      return case3[index];

    case 4:
      return case4[index];

    case 5:
      return case5[index];

    case 6:
      return case6[index];
  }
};

export const getAllProducts = blocks =>
  blocks.reduce((current, block) => [...current, ...block?.products], []);

export const getMetaTitle = products => {
  const productsName = products.map(
    product => ALL_FIELD_MAPPING[product].displayText,
  );

  return productsName.join(', ');
};

export const getSubPages = (products, optional) => {
  const subPages = products.reduce((acc, prev) => {
    let subPage = {
      subPageIdentifier: prev,
    };

    if (ALL_FIELD_MAPPING[prev].optionalNameMatch) {
      subPage.fields = [{ fieldName: 'name', required: !optional[prev] }];
    }

    return [...acc, subPage];
  }, []);

  return subPages;
};

export const getRules = (conditions, rule, nextpageId) => ({
  expression:
    nextpageId === 'end' ? 'true' : getConditionQuery(conditions, rule),
  ruleType: 'EVALUATE',
  decision: {
    action:
      nextpageId === 'end'
        ? 'COMPLETE_ORDER_AND_REDIRECT'
        : 'UPDATE_PAGE_AND_MOVE_TO_NEXT',
    nextPageIndex: nextpageId,
    pageStatus: 'VERIFIED',
  },
});

export const getConditionQuery = (conditions, rule) => {
  let expression = '';
  let lastLogicOperator = null;
  let subExpression = '';
  let subExpressionStarted = false;

  const ruleConditions =
    rule !== 'else'
      ? conditions[rule]
      : _flatten(
          _keys(conditions)
            .filter(
              condition =>
                ['if', 'elseIf'].includes(condition) &&
                conditions[condition].length,
            )
            .map(condition => conditions[condition]),
        );

  ruleConditions.forEach((condition, index) => {
    const multipleSelected = condition.checked.length > 1;
    const selected = condition.checked;
    const [product, field] = condition.output.split('.');
    const jsOperator = LOGICAL_MAPPING[condition.operator];
    const logicOperator = condition.logicOperator === 'AND' ? '&&' : '||';

    let conditionExpression;
    if (multipleSelected) {
      conditionExpression = selected
        .map(
          item => `${product}.get('${field}').asText() ${jsOperator} '${item}'`,
        )
        .join(' || ');
      conditionExpression = `(${conditionExpression})`;
    } else {
      conditionExpression = `${product}.get('${field}').asText() ${jsOperator} '${
        selected[0]
      }'`;
    }

    if (index === 0) {
      expression = conditionExpression;
    } else {
      if (logicOperator === '&&') {
        if (lastLogicOperator === '||') {
          if (subExpressionStarted) {
            subExpression += ` ${lastLogicOperator} ${conditionExpression}`;
          } else {
            subExpressionStarted = true;
            subExpression = `${expression} ${lastLogicOperator} ${conditionExpression}`;
          }
        } else {
          expression += ` ${logicOperator} ${conditionExpression}`;
        }
      } else {
        if (subExpressionStarted) {
          expression = `(${subExpression}) ${logicOperator} ${conditionExpression}`;
          subExpression = '';
          subExpressionStarted = false;
        } else {
          expression += ` ${logicOperator} ${conditionExpression}`;
        }
      }
    }

    lastLogicOperator = logicOperator;
  });

  if (subExpressionStarted) {
    expression = `(${subExpression})`;
  }

  if (rule === 'else') {
    expression = `!(${expression})`;
  }

  return expression;
};

const logicOperator = operator => (operator === 'AND' ? '&&' : '||');

const getOutput = output => {
  const [product] = output.split('.');

  const outputField = _find(ALL_FIELD_MAPPING[product].outputFields, {
    value: output,
  });

  return outputField.filterType;
};

export const getCondition = condition =>
  condition?.reduce((acc, prev, index) => {
    return [
      ...acc,
      `${getOutput(prev.output)} ${
        LOGICAL_MAPPING[prev.operator]
      } ${prev.checked.join(',')} ${
        condition.length - 1 > index
          ? logicOperator(condition[index + 1].logicOperator)
          : ''
      }`,
    ];
  }, []);

export const validateConditions = conditions => {
  // Helper function to validate individual condition objects
  function validateCondition(condition) {
    const { key, output, operator, checked } = condition;

    if (!key || typeof key !== 'string') {
      return false;
    }

    if (!output || typeof output !== 'string') {
      return false;
    }

    if (!operator || typeof operator !== 'string') {
      return false;
    }

    if (!Array.isArray(checked) || checked.length === 0) {
      return false;
    }

    return true;
  }

  for (const condition of conditions) {
    // Validate 'if' conditions
    if (condition.if && Array.isArray(condition.if)) {
      for (const ifCondition of condition.if) {
        if (!validateCondition(ifCondition)) {
          return false;
        }
      }
    } else {
      return false;
    }

    // Validate 'elseIf' conditions
    if (condition.elseIf && Array.isArray(condition.elseIf)) {
      for (const elseIfCondition of condition.elseIf) {
        if (!validateCondition(elseIfCondition)) {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  return true;
};
