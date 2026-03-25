/**
 * Field Helper Utilities
 *
 * File: src/js/admin/utils/fieldHelpers.js
 */

/** Supported operators:
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
 * Supported 'required' formats:
 *
 * 1. Single condition (shorthand):
 *    'required' => ['field_id', '==', 'value']
 *
 * 2. Multiple conditions — AND (all must pass):
 *    'required' => [
 *      ['field_id', '==', 'value'],
 *      ['other_field', '!=', ''],
 *    ]
 *
 * 3. Multiple conditions — OR (any must pass):
 *    'required' => [
 *      'relation' => 'OR',
 *      ['field_id', '==', 'red'],
 *      ['field_id', '==', 'blue'],
 *    ]
 *
 * 4. Array of values — OR within a single rule (== any / != all):
 *    'required' => ['field_id', '==', ['classic', 'minimal']]
 *    'required' => ['field_id', '!=', ['classic', 'minimal']]
 *
 * 5. Mixed AND + array values:
 *    'required' => [
 *      ['enable_footer',     '==', true],
 *      ['site_footer_style', '==', ['classic', 'minimal']],
 *    ]
 */

/**
 * Resolve a scalar comparison value from any field type.
 * Array fields (dimensions, spacing, border, typography, background)
 * can be targeted via dot notation: 'container_width.width'
 *
 * @param {string} fieldId  e.g. 'container_width' or 'container_width.width'
 * @param {Object} options  Current saved options
 * @param {Object} defaults Field default values map
 * @returns {*}
 */
const resolveValue = (fieldId, options, defaults = {}) => {
  if (fieldId.includes('.')) {
    const [key, subKey] = fieldId.split('.');
    const parent = options[key] ?? defaults[key];
    if (parent && typeof parent === 'object') {
      return parent[subKey];
    }
    return undefined;
  }

  const value = options[fieldId];
  return value !== undefined ? value : defaults[fieldId];
};

/**
 * Evaluate a single condition rule
 *
 * @param rule
 * @param {Object} options Current saved options
 * @param {Object} defaults Field default values map
 * @returns {boolean}
 */
const evaluateRule = (rule, options, defaults = {}) => {
  const [fieldId, operator, conditionValue] = rule;
  const currentValue = resolveValue(fieldId, options, defaults);

  // ── Array of values — ['field', '==', ['a', 'b']] ────────────────────────
  if (Array.isArray(conditionValue)) {
    if (operator === '==' || operator === '=') {
      // Match ANY value in the array
      // loose == intentional — handles "1" == true and numeric string coercion
      // noinspection EqualityComparisonWithCoercionJS
      return conditionValue.some(val => currentValue == val);
    }
    if (operator === '!=') {
      // Match NONE of the values in the array
      // noinspection EqualityComparisonWithCoercionJS
      return conditionValue.every(val => currentValue != val);
    }
  }

  switch (operator) {
    // Equality
    case '==':
    case '=':
      // noinspection EqualityComparisonWithCoercionJS
      return currentValue == conditionValue; // loose == intentional (handles "1" == true)

    // Inequality
    case '!=':
      // noinspection EqualityComparisonWithCoercionJS
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
 * @param {Object} defaults Field default values map
 * @returns {boolean}
 */
export const shouldShowField = (field, options, defaults = {}) => {
  if (!field.required) return true;

  const required = field.required;

  // ── Format 1: shorthand single rule ──────────────────────────────────────
  // 'required' => ['field_id', '==', 'value']
  if (typeof required[0] === 'string') {
    return evaluateRule(required, options, defaults);
  }

  // ── Format 2 & 3: multiple rules with AND (default) or OR ────────────────
  // 'required' => [['field','==','val'], ['other','!=','']]           → AND
  // 'required' => ['relation'=>'OR', ['field','==','a'], [...]]       → OR
  const relation = (required.relation || 'AND').toUpperCase();

  // Collect only the actual rule arrays (skip the 'relation' key)
  const rules = Object.values(required).filter(item => Array.isArray(item));

  if (relation === 'OR') {
    return rules.some(rule => evaluateRule(rule, options, defaults));
  }

  // AND (default)
  return rules.every(rule => evaluateRule(rule, options, defaults));
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