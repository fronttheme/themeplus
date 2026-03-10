/**
 * ThemePlus Shortcode Field - With Paste Button
 *
 * File: src/js/admin/components/Fields/ShortcodeField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Button from "../Common/Button";

function ShortcodeField({
                          id,
                          label,
                          value = '',
                          onChange,
                          placeholder = '[my-shortcode]',
                          help = '',
                        }) {
  const [pasted, setPasted] = useState(false);

  /**
   * Paste from clipboard
   */
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch (err) {
      console.error('Failed to paste:', err);
      // Fallback: show an alert if clipboard API fails
      alert(__('Clipboard access denied. Please paste manually (Ctrl+V or Cmd+V).', 'themeplus'));
    }
  };

  return (
    <div className="tpo-field tpo-field--shortcode">
      {label && (
        <div className="tpo-field__header">
          <label htmlFor={id} className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-shortcode tpo-field-has-btn">
          <input
            id={id}
            name={id}
            type="text"
            className="tpo-shortcode__input tpo-field-has-btn__input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
          />
          <Button
            size="auto"
            onClick={handlePaste}
            title={__('Paste from clipboard', 'themeplus')}>
            {pasted ? (
              <>
                <i className="fas fa-check"/>
                <span>{__('Pasted!', 'themeplus')}</span>
              </>
            ) : (
              <>
                <i className="fas fa-paste"/>
                <span>{__('Paste', 'themeplus')}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default ShortcodeField;