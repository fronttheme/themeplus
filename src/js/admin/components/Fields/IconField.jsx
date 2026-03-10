/**
 * ThemePlus Icon Field
 * FontAwesome only
 *
 * File: src/js/admin/components/Fields/IconField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import IconPickerModal from '../Common/IconPickerModal';
import Button from '../Common/Button';
import FileUpload from "../Common/FileUpload";

function IconField({
                     id,
                     label,
                     value = '',
                     onChange,
                     help = '',
                   }) {
  const [showModal, setShowModal] = useState(false);

  /**
   * Parse FontAwesome icon string
   */
  const parseIcon = (iconString) => {
    if (!iconString || typeof iconString !== 'string') {
      return null;
    }

    const parts = iconString.split(' ');
    const iconClass = parts.find(p =>
      p.startsWith('fa-') &&
      !['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone'].includes(p)
    );

    if (!iconClass) return null;

    const iconId = iconClass.replace('fa-', '');
    const iconName = iconId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: iconId,
      name: iconName,
      class: iconString,
    };
  };

  const displayIcon = parseIcon(value);

  const handleSelect = (icon) => {
    onChange(icon.class);
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="tpo-field tpo-field--icon">
      <div className="tpo-field__header">
        <label className="tpo-field__label">
          {label}
        </label>
      </div>

      <div className="tpo-field__body">
        <div className="tpo-icon-field">
          {displayIcon ? (
            <div className="tpo-icon-field__preview">
              <button
                type="button"
                className="tpo-icon-field__preview-icon"
                onClick={() => setShowModal(true)}
                title={__('Click to change icon', 'themeplus')}>
                <i className={displayIcon.class}/>
              </button>
              <div className="tpo-icon-field__preview-info">
                <div className="tpo-icon-field__preview-name">
                  {displayIcon.name}
                </div>
                <div className="tpo-icon-field__preview-id">
                  {displayIcon.class}
                </div>
              </div>
              <div className="tpo-icon-field__preview-actions tpo-field-group--button">

                <Button
                  color="secondary"
                  size="small"
                  onClick={() => setShowModal(true)}>
                  {__('Change', 'themeplus')}
                </Button>

                <Button
                  size="small"
                  color="muted"
                  className="tpo-icon-field__button tpo-icon-field__button--remove tpo-button tpo-button--secondary"
                  onClick={handleRemove}>
                  {__('Remove', 'themeplus')}
                </Button>

              </div>
            </div>
          ) : (
            <FileUpload
              variant="button"
              icon="fa-icons"
              label={__('Select Icon', 'themeplus')}
              onClick={() => setShowModal(true)}
              className="tpo-icon-field__select"
            />
          )}
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}

      <IconPickerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleSelect}
        selectedIcon={displayIcon?.id}
      />
    </div>
  );
}

export default IconField;