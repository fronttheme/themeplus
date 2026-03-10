/**
 * ThemePlus Developer Field Card
 *
 * File: src/js/admin/components/DevPanel/DevFieldCard.jsx
 */

import {useState} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import Button from "../Common/Button";

function DevFieldCard({field}) {
  const [showUsage, setShowUsage] = useState(false);
  const [copied, setCopied] = useState(null);

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Format value as PHP array syntax
  const formatValue = (value) => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);

    try {
      return formatAsPhpArray(value, 0);
    } catch (e) {
      return String(value);
    }
  };

  // Format as PHP array (not JSON)
  const formatAsPhpArray = (value, indent = 0) => {
    const indentStr = '  '.repeat(indent);
    const nextIndent = '  '.repeat(indent + 1);

    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';

      const items = value.map(item =>
        nextIndent + formatAsPhpArray(item, indent + 1)
      ).join(',\n');
      return `[\n${items}\n${indentStr}]`;
    }

    if (typeof value === 'object' && value !== null) {
      const keys = Object.keys(value);
      if (keys.length === 0) return '[]';

      const items = keys.map(key => {
        const formattedKey = `'${key}'`;
        const formattedValue = formatAsPhpArray(value[key], indent + 1);
        return `${nextIndent}${formattedKey} => ${formattedValue}`;
      }).join(',\n');

      return `[\n${items}\n${indentStr}]`;
    }

    if (typeof value === 'string') return `'${value}'`;
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  // Format dependency for display
  const formatDependency = (dependency) => {
    if (!dependency) return null;

    if (dependency.field && dependency.operator && dependency.value !== undefined) {
      const valueStr = typeof dependency.value === 'string'
        ? `"${dependency.value}"`
        : String(dependency.value);
      return `${dependency.field} ${dependency.operator} ${valueStr}`;
    }

    return formatAsPhpArray(dependency, 0);
  };

  const showUsageButton = field.show_usage !== false;

  return (
    <div className="tpo-dev-card tpo-field-card">
      {/* Header */}
      <div className="tpo-dev-card__header">
        <div className="tpo-dev-card__title">
          <code className="tpo-dev-card__id">{field.id}</code>
          <span className="tpo-dev-card__type">{field.type}</span>
        </div>
        {showUsageButton && (
          <Button
            color="secondary"
            onClick={() => setShowUsage(!showUsage)}>
            <i className={`fa-solid fa-${showUsage ? 'eye-slash' : 'file-code'}`}></i>
            {showUsage ? __('Hide Usage', 'themeplus') : __('Show Usage', 'themeplus')}
          </Button>
        )}
      </div>

      {/* Metadata */}
      <div className="tpo-dev-card__meta">
        {field.title && (
          <div className="tpo-dev-meta-row">
            <span className="tpo-dev-meta-label">{__('Title:', 'themeplus')}</span>
            <span>{field.title}</span>
          </div>
        )}

        <div className="tpo-dev-meta-row">
          <span className="tpo-dev-meta-label">{__('Section:', 'themeplus')}</span>
          <span>
            {field.section_title}
            {field.subsection_title && ` → ${field.subsection_title}`}
          </span>
        </div>

        {showUsageButton && (
          <div className="tpo-dev-meta-row tpo-dev-meta-row--vertical">
            <span className="tpo-dev-meta-label">{__('Current Value:', 'themeplus')}</span>
            <pre className="tpo-dev-value tpo-dev-value--formatted">
              <code>{formatValue(field.current_value)}</code>
            </pre>
            <span className="tpo-dev-type">({field.value_type})</span>
          </div>
        )}

        {showUsageButton && (
          <div className="tpo-dev-meta-row tpo-dev-meta-row--vertical">
            <span className="tpo-dev-meta-label">{__('Default Value:', 'themeplus')}</span>
            <pre className="tpo-dev-value tpo-dev-value--formatted">
              <code>{formatValue(field.default_value)}</code>
            </pre>
          </div>
        )}

        {field.dependency && (
          <div className="tpo-dev-meta-row">
            <span className="tpo-dev-meta-label">{__('Depends on:', 'themeplus')}</span>
            <code className="tpo-dev-value">{formatDependency(field.dependency)}</code>
          </div>
        )}
      </div>

      {/* Usage Examples */}
      {showUsage && field.usage && (
        <div className="tpo-dev-usage">
          <h4>{__('Usage Examples', 'themeplus')}</h4>

          {/* Bulk Access */}
          <div className="tpo-dev-code">
            <div className="tpo-dev-code__header">
              <span>
                <i className="fa-solid fa-star"></i>
                {__('Bulk Access (Recommended for Multiple Fields)', 'themeplus')}
              </span>
              <Button
                color="muted"
                size="small"
                onClick={() => copy(field.usage.bulk, 'bulk')}>
                {copied === 'bulk' ? __('Copied!', 'themeplus') : __('Copy', 'themeplus')}
              </Button>
            </div>
            <pre><code>{field.usage.bulk}</code></pre>
          </div>

          {/* Single Field Helper */}
          <div className="tpo-dev-code">
            <div className="tpo-dev-code__header">
              <span>{__('Single Field Access', 'themeplus')}</span>
              <Button
                color="muted"
                size="small"
                onClick={() => copy(field.usage.helper, 'helper')}>
                {copied === 'helper' ? __('Copied!', 'themeplus') : __('Copy', 'themeplus')}
              </Button>
            </div>
            <pre><code>{field.usage.helper}</code></pre>
          </div>

          {/* Template Usage */}
          <div className="tpo-dev-code">
            <div className="tpo-dev-code__header">
              <span>{__('In Template File', 'themeplus')}</span>
              <Button
                color="muted"
                size="small"
                onClick={() => copy(field.usage.template, 'template')}>
                {copied === 'template' ? __('Copied!', 'themeplus') : __('Copy', 'themeplus')}
              </Button>
            </div>
            <pre><code>{field.usage.template}</code></pre>
          </div>

          {/* Direct Access */}
          <div className="tpo-dev-code">
            <div className="tpo-dev-code__header">
              <span>{__('Direct Access (Advanced)', 'themeplus')}</span>
              <Button
                color="muted"
                size="small"
                onClick={() => copy(field.usage.direct, 'direct')}>
                {copied === 'direct' ? __('Copied!', 'themeplus') : __('Copy', 'themeplus')}
              </Button>
            </div>
            <pre><code>{field.usage.direct}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default DevFieldCard;