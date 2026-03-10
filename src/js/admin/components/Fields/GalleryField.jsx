/**
 * ThemePlus Gallery Field
 * Multiple image upload and management
 *
 * File: src/js/admin/components/Fields/GalleryField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Button from "../Common/Button";
import FileUpload from "../Common/FileUpload";

function GalleryField({id, label, value = [], onChange, help = ''}) {
  const [images, setImages] = useState(value);

  /**
   * Handle WordPress media upload
   */
  const handleUpload = () => {
    if (window.wp && window.wp.media) {
      const frame = window.wp.media({
        title: __('Select Images', 'themeplus'),
        button: {text: __('Use these images', 'themeplus')},
        multiple: true,
      });

      frame.on('select', () => {
        const attachments = frame.state().get('selection').toJSON();
        const newImages = attachments.map(att => ({
          id: att.id,
          url: att.url,
          alt: att.alt || '',
        }));
        const allImages = [...images, ...newImages];
        setImages(allImages);
        onChange(allImages);
      });

      frame.open();
    }
  };

  /**
   * Remove image
   */
  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="tpo-field tpo-field--gallery">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">{label}</label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-gallery tpo-field-card">
          {/* Images Grid */}
          {images.length > 0 && (
            <div className="tpo-gallery__grid">
              {images.map((img, index) => (
                <div key={index} className="tpo-gallery__item">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="tpo-gallery__image"
                  />
                  <Button
                    className="tpo-gallery__remove tpo-button--small-dismiss"
                    color="danger"
                    size="small"
                    iconOnly={true}
                    onClick={() => removeImage(index)}
                    ariaLabel={__('Remove image', 'themeplus')}>
                    <i className="fa-solid fa-times"/>
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <FileUpload
            variant="button"
            icon="fa-images"
            label={images.length > 0 ? __('Add More Images', 'themeplus') : __('Upload Images', 'themeplus')}
            onClick={handleUpload}
            className="tpo-gallery__upload"
          />

          {/* Image count */}
          {images.length > 0 && (
            <div className="tpo-gallery__count">
              {images.length} {images.length === 1
              ? __('image', 'themeplus')
              : __('images', 'themeplus')
            }
            </div>
          )}
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default GalleryField;