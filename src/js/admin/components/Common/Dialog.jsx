/**
 * ThemePlus Dialog Component
 *
 * File: src/js/admin/components/Common/Dialog.jsx
 */

import {__} from '@wordpress/i18n';
import {useEffect} from '@wordpress/element';
import Button from "./Button";

/**
 * Dialog Component
 *
 * @param {Object} props Component props
 * @param {boolean} props.isOpen Dialog open state
 * @param {Function} props.onClose Close handler
 * @param {string} props.title Dialog title
 * @param {string} props.message Dialog message
 * @param {string} props.type Dialog type (success, error, warning, confirm)
 * @param {Function} props.onConfirm Confirm handler (for confirm type)
 * @param {string} props.confirmText Confirm button text
 * @param {string} props.cancelText Cancel button text
 */
function Dialog({
                  isOpen,
                  onClose,
                  title,
                  message,
                  type = 'success',
                  onConfirm,
                  confirmText = __('OK', 'themeplus'),
                  cancelText = __('Cancel', 'themeplus'),
                }) {
  /**
   * Close on Escape key
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  /**
   * Auto-close for non-confirm dialogs
   */
  useEffect(() => {
    if (isOpen && type !== 'confirm') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, type, onClose]);

  if (!isOpen) return null;

  /**
   * Get icon based on type
   */
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fa-solid fa-circle-check"></i>;
      case 'error':
        return <i className="fa-solid fa-bug"></i>;
      case 'warning':
        return <i className="fa-solid fa-triangle-exclamation"></i>;
      case 'confirm':
        return <i className="fa-solid fa-circle-exclamation"></i>;
      default:
        return <i className="fa-solid fa-circle-exclamation"></i>;
    }
  };

  /**
   * Get color class based on type
   */
  const getColorClass = () => {
    return `tpo-dialog--${type}`;
  };

  /**
   * Handle confirm
   */
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="tpo-dialog">
      {/* Overlay */}
      <div
        className="tpo-dialog__overlay"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={`tpo-dialog__container ${getColorClass()}`}>
        {/* Icon */}
        <div className="tpo-dialog__icon">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="tpo-dialog__content">
          {title && (
            <h3 className="tpo-dialog__title">
              {title}
            </h3>
          )}
          {message && (
            <p className="tpo-dialog__message">
              {message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="tpo-dialog__actions tpo-ui-group--button">
          {type === 'confirm' ? (
            <>
              <Button
                color="muted"
                onClick={onClose}>
                {cancelText}
              </Button>

              <Button
                onClick={handleConfirm}>
                {confirmText}
              </Button>
            </>
          ) : (
            <Button
              onClick={onClose}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dialog;