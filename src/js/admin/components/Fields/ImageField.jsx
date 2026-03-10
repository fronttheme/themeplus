/**
 * ThemePlus ImageField Component
 *
 * File: src/js/admin/components/Fields/ImageField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Button from "../Common/Button";
import FileUpload from "../Common/FileUpload";

function ImageField({
                      id,
                      label,
                      value = {},
                      onChange,
                      help = '',
                    }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!window.wp || !window.wp.media) {
      alert(__('WordPress Media Library not available', 'themeplus'));
      return;
    }

    setUploading(true);

    const frame = window.wp.media({
      title: __('Select or Upload Image', 'themeplus'),
      button: {
        text: __('Use this image', 'themeplus'),
      },
      multiple: false,
    });

    frame.on('select', function () {
      const attachment = frame.state().get('selection').first().toJSON();

      onChange({
        id: attachment.id,
        url: attachment.url,
        width: attachment.width,
        height: attachment.height,
        alt: attachment.alt || '',
        title: attachment.title || '',
      });

      setUploading(false);
    });

    frame.on('close', function () {
      setUploading(false);
    });

    frame.open();
  };

  const handleRemove = () => {
    onChange({});
  };

  return (
    <div className="tpo-field tpo-field--image">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-image">
          {value?.url ? (
            <div className="tpo-image__preview">
              <img
                src={value.url}
                alt={value.alt || label}
                className="tpo-image__img"
              />
              <div className="tpo-image__actions tpo-field-group--button">
                <Button
                  color="success"
                  size="small"
                  onClick={handleUpload}
                  disabled={uploading}>
                  {__('Change Image', 'themeplus')}
                </Button>
                <Button
                  color="danger"
                  size="small"
                  onClick={handleRemove}>
                  {__('Remove', 'themeplus')}
                </Button>
              </div>
            </div>
          ) : (
            <FileUpload
              variant="button"
              icon={uploading ? "fa-spinner fa-spin" : "fa-image"}
              label={uploading ? __('Uploading...', 'themeplus') : __('Upload Image', 'themeplus')}
              onClick={handleUpload}
              disabled={uploading}
              className="tpo-image__upload"
            />
          )}
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

export default ImageField;