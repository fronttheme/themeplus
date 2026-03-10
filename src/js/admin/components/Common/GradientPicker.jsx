/**
 * Reusable Gradient Picker Component
 * Wrapper around WordPress GradientPicker
 *
 * File: src/js/admin/components/Common/GradientPicker.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import {GradientPicker as WPGradientPicker, Button} from '@wordpress/components';

function GradientPicker({
                          value = '',
                          onChange,
                          label = '',
                          showPreview = true,
                          showCopyButton = true,
                          showOutput = true,
                        }) {
  const [copied, setCopied] = useState(false);

  const handleChange = (newGradient) => {
    onChange(newGradient);
  };

  const copyCSS = () => {
    const css = `background: ${value};`;
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Predefined gradients
  const presetGradients = [
    {
      name: __('Purple Dream', 'themeplus'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      name: __('Warm Flame', 'themeplus'),
      gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    },
    {
      name: __('Ocean Blue', 'themeplus'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      name: __('Sunset', 'themeplus'),
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      name: __('Green Beach', 'themeplus'),
      gradient: 'linear-gradient(135deg, #02aab0 0%, #00cdac 100%)',
    },
    {
      name: __('Rose Water', 'themeplus'),
      gradient: 'linear-gradient(135deg, #e96443 0%, #904e95 100%)',
    },
  ];

  return (
    <div className="tpo-field--component tpo-gradient-picker-component">
      {/* Label (optional) */}
      {label && (
        <label className="tpo-field__label--depth0 tpo-gradient-picker__label">
          {label}
        </label>
      )}

      {/* Live Preview */}
      {showPreview && value && (
        <div className="tpo-gradient-picker__preview-large">
          <div
            className="tpo-gradient-picker__preview-box"
            style={{background: value}}
          >
            <span className="tpo-gradient-picker__preview-label">
              {__('Preview', 'themeplus')}
            </span>
          </div>
        </div>
      )}

      {/* WordPress Gradient Picker */}
      <div className="tpo-gradient-picker__wordpress">
        <WPGradientPicker
          value={value || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}
          onChange={handleChange}
          gradients={presetGradients}
          clearable={false}
          disableCustomGradients={false}
        />
      </div>

      {/* Actions */}
      {value && (showCopyButton || showOutput) && (
        <div className="tpo-gradient-picker__actions">
          {/* Copy CSS Button */}
          {showCopyButton && (
            <Button
              variant="secondary"
              onClick={copyCSS}
              icon={copied ? 'yes' : 'clipboard'}
            >
              {copied ? __('Copied!', 'themeplus') : __('Copy CSS', 'themeplus')}
            </Button>
          )}

          {/* CSS Output */}
          {showOutput && (
            <div className="tpo-gradient-picker__output">
              <code className="tpo-gradient-picker__css">
                {value}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GradientPicker;