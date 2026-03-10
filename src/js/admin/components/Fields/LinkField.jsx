/**
 * ThemePlus Link Field
 *
 * File: src/js/admin/components/Fields/LinkField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Checkbox from '../Common/Checkbox';

function LinkField({id, label, value = {}, onChange, help = ''}) {
  const [link, setLink] = useState({
    url: value.url || '',
    text: value.text || '',
    target: value.target || '_self',
    rel: value.rel || '',
  });

  const updateLink = (key, val) => {
    const newLink = {...link, [key]: val};
    setLink(newLink);
    onChange(newLink);
  };

  return (
    <div className="tpo-field tpo-field--link">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-link">
          <input
            type="url"
            value={link.url}
            onChange={(e) => updateLink('url', e.target.value)}
            placeholder={__('https://example.com', 'themeplus')}
            className="tpo-link__input"
          />

          <input
            type="text"
            value={link.text}
            onChange={(e) => updateLink('text', e.target.value)}
            placeholder={__('Link Text (optional)', 'themeplus')}
            className="tpo-link__input"
          />

          <div className="tpo-link__options">
            <Checkbox
              id={`${id}-target`}
              checked={link.target === '_blank'}
              onChange={(checked) => updateLink('target', checked ? '_blank' : '_self')}
              label={__('Open in new tab', 'themeplus')}
              size="small"
            />

            <Checkbox
              id={`${id}-nofollow`}
              checked={link.rel.includes('nofollow')}
              onChange={(checked) => updateLink('rel', checked ? 'nofollow' : '')}
              label={__('Add nofollow', 'themeplus')}
              size="small"
            />
          </div>
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default LinkField;