/**
 * ThemePlus FileUpload Component
 * Reusable file upload button/area
 *
 * File: src/js/admin/components/Common/FileUpload.jsx
 */

import {__} from '@wordpress/i18n';
import {useRef, useState} from '@wordpress/element';

/**
 * FileUpload Component
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.label Button label text or element
 * @param {React.ReactNode} props.icon Icon element (FontAwesome class, SVG, img, or custom component)
 * @param {Function} props.onClick Click handler
 * @param {boolean} props.disabled Disabled state
 * @param {string} props.variant Visual variant (button, box, dropzone)
 * @param {string} props.size Size (small, medium, large)
 * @param {string} props.className Additional CSS classes
 * @param {string} props.description Optional description text
 * @param {string} props.accept File accept types (e.g., ".jpg,.png")
 * @param {boolean} props.multiple Allow multiple file selection
 * @param {Function} props.onFileSelect Direct file selection handler (bypasses onClick)
 */
function FileUpload({
                      label = __('Upload File', 'themeplus'),
                      icon = 'fa-file-arrow-up', // Can be string (FA class) or React element
                      onClick,
                      disabled = false,
                      variant = 'button',
                      size = 'medium',
                      className = '',
                      description,
                      accept,
                      multiple = false,
                      onFileSelect,
                    }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    if (onFileSelect && e.target.files.length > 0) {
      onFileSelect(multiple ? Array.from(e.target.files) : e.target.files[0]);
    }
  };

  // Handle click
  const handleClick = () => {
    if (disabled) return;

    if (onFileSelect) {
      fileInputRef.current?.click();
    } else if (onClick) {
      onClick();
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || !onFileSelect) return;

    const files = Array.from(e.dataTransfer.files);

    // Filter by accept types if specified
    let filteredFiles = files;
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      filteredFiles = files.filter(file => {
        return acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(type);
        });
      });
    }

    if (filteredFiles.length > 0) {
      onFileSelect(multiple ? filteredFiles : filteredFiles[0]);
    }
  };

  const buttonClasses = [
    'tpo-file-upload',
    `tpo-file-upload--${variant}`,
    `tpo-file-upload--${size}`,
    disabled && 'tpo-file-upload--disabled',
    isDragging && 'tpo-file-upload--dragging',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Render icon based on type
  const renderIcon = () => {
    // If icon is a string, treat as FontAwesome class
    if (typeof icon === 'string') {
      return <i className={`fa-solid ${icon}`}></i>;
    }

    // If icon is a React element, render it directly
    return icon;
  };

  return (
    <>
      <button
        type="button"
        className={buttonClasses}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={disabled}
      >
        <span className="tpo-file-upload__icon">
          {renderIcon()}
        </span>
        <span className="tpo-file-upload__content">
          <span className="tpo-file-upload__label">{label}</span>
          {description && (
            <span className="tpo-file-upload__description">{description}</span>
          )}
        </span>
      </button>

      {/* Hidden file input for direct file selection */}
      {onFileSelect && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          style={{display: 'none'}}
        />
      )}
    </>
  );
}

export default FileUpload;