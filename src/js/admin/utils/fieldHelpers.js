/**
 * Field Helper Utilities
 *
 * File: src/js/admin/utils/fieldHelpers.js
 *
 * Supported 'required' formats:
 *
 * 1. Single condition (shorthand array):
 *    'required' => ['field_id', '==', 'value']
 *
 * 2. Multiple conditions with AND (all must pass):
 *    'required' => [
 *      ['field_id', '==', 'value'],
 *      ['other_field', '!=', ''],
 *    ]
 *
 * 3. Multiple conditions with OR (any must pass):
 *    'required' => [
 *      'relation' => 'OR',
 *      ['field_id', '==', 'red'],
 *      ['field_id', '==', 'blue'],
 *    ]
 *
 * Supported operators:
 *   ==, =        Equal to
 *   !=           Not equal to
 *   >            Greater than (numeric)
 *   <            Less than (numeric)
 *   >=           Greater than or equal to (numeric)
 *   <=           Less than or equal to (numeric)
 *   contains     Value contains string, or array contains item
 *   !contains    Value does not contain string, or array does not contain item
 *   empty        Field has no value / is empty
 *   !empty       Field has a value / is not empty
 */

/**
 * Resolve a scalar comparison value from any field type.
 * Array fields (dimensions, spacing, border, typography, background)
 * can be targeted via dot notation: 'container_width.width'
 *
 * @param {string} fieldId  e.g. 'container_width' or 'container_width.width'
 * @param {Object} options  Current saved options
 * @returns {*}
 */
const resolveValue = (fieldId, options) => {
  // Dot notation: 'dimensions_field.width'
  if (fieldId.includes('.')) {
    const [key, subKey] = fieldId.split('.');
    const parent = options[key];
    if (parent && typeof parent === 'object') {
      return parent[subKey];
    }
    return undefined;
  }

  return options[fieldId];
};

/**
 * Evaluate a single condition rule
 *
 * @param {Array}  rule    ['field_id', 'operator', 'value']
 * @param {Object} options Current saved options
 * @returns {boolean}
 */
const evaluateRule = (rule, options) => {
  const [fieldId, operator, conditionValue] = rule;
  const currentValue = resolveValue(fieldId, options);

  switch (operator) {
    // Equality
    case '==':
    case '=':
      return currentValue == conditionValue; // loose == intentional (handles "1" == true)

    // Inequality
    case '!=':
      return currentValue != conditionValue;

    // Numeric comparisons
    case '>':
      return parseFloat(currentValue) > parseFloat(conditionValue);
    case '<':
      return parseFloat(currentValue) < parseFloat(conditionValue);
    case '>=':
      return parseFloat(currentValue) >= parseFloat(conditionValue);
    case '<=':
      return parseFloat(currentValue) <= parseFloat(conditionValue);

    // String / array contains
    case 'contains':
      if (Array.isArray(currentValue)) {
        return currentValue.includes(conditionValue);
      }
      if (typeof currentValue === 'string') {
        return currentValue.toLowerCase().includes(String(conditionValue).toLowerCase());
      }
      return false;

    // String / array does not contain
    case '!contains':
      if (Array.isArray(currentValue)) {
        return !currentValue.includes(conditionValue);
      }
      if (typeof currentValue === 'string') {
        return !currentValue.toLowerCase().includes(String(conditionValue).toLowerCase());
      }
      return true;

    // Empty check (null, undefined, '', [], {})
    case 'empty':
      if (currentValue === null || currentValue === undefined || currentValue === '') return true;
      if (Array.isArray(currentValue)) return currentValue.length === 0;
      if (typeof currentValue === 'object') return Object.keys(currentValue).length === 0;
      return false;

    // Not empty
    case '!empty':
      if (currentValue === null || currentValue === undefined || currentValue === '') return false;
      if (Array.isArray(currentValue)) return currentValue.length > 0;
      if (typeof currentValue === 'object') return Object.keys(currentValue).length > 0;
      return true;

    default:
      return true;
  }
};

/**
 * Check if a field should be displayed based on its 'required' config.
 *
 * @param {Object} field   Field configuration object
 * @param {Object} options Current saved options
 * @returns {boolean}
 */
export const shouldShowField = (field, options) => {
  if (!field.required) return true;

  const required = field.required;

  // ── Format 1: shorthand single rule ──────────────────────────────────────
  // 'required' => ['field_id', '==', 'value']
  if (typeof required[0] === 'string') {
    return evaluateRule(required, options);
  }

  // ── Format 2 & 3: multiple rules with AND (default) or OR ────────────────
  // 'required' => [['field','==','val'], ['other','!=','']]           → AND
  // 'required' => ['relation'=>'OR', ['field','==','a'], [...]]       → OR
  const relation = (required.relation || 'AND').toUpperCase();

  // Collect only the actual rule arrays (skip the 'relation' key)
  const rules = Object.values(required).filter(item => Array.isArray(item));

  if (relation === 'OR') {
    return rules.some(rule => evaluateRule(rule, options));
  }

  // AND (default)
  return rules.every(rule => evaluateRule(rule, options));
};

/**
 * Highlight matching text in search results
 *
 * @param {string} text  Text to highlight
 * @param {string} query Search query
 * @returns {JSX.Element|string}
 */
export const highlightText = (text, query) => {
  if (!query || !text) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return <mark key={index} className="tpo-highlight">{part}</mark>;
    }
    return part;
  });
};