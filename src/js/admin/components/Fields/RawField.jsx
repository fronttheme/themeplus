/**
 * ThemePlus Raw Field - Display HTML content
 * Used for custom HTML, notices, instructions, etc.
 *
 * File: src/js/admin/components/Fields/RawField.jsx
 */

import {__} from '@wordpress/i18n';

function RawField({
                    id,
                    label,
                    title,        // FieldRenderer might pass title instead of label
                    content = '',
                    desc,         // Sometimes content comes as desc
                    help = '',
                  }) {

  // Use title if label is not provided
  const displayLabel = label || title;

  // Use desc if content is not provided (fallback)
  const displayContent = content || desc || '';

  // If no content, show a message
  if (!displayContent) {
    return (
      <div className="tpo-field tpo-field--raw">
        {displayLabel && (
          <div className="tpo-field__header">
            <label className="tpo-field__label">
              {displayLabel}
            </label>
          </div>
        )}

        <div className="tpo-field__body">
          <div className="tpo-raw tpo-raw--empty">
            <p className="tpo-raw__empty-message">
              {__('No content to display.', 'themeplus')}
            </p>
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

  return (
    <div className="tpo-field tpo-field--raw">
      {displayLabel && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {displayLabel}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div
          className="tpo-raw"
          dangerouslySetInnerHTML={{__html: displayContent}}
        />
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default RawField;