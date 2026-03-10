/**
 * ThemePlus Modal Component
 * Custom modal with full accessibility and footer support
 *
 * File: src/js/admin/components/Common/Modal.jsx
 */

import {__} from '@wordpress/i18n';
import {useRef, useEffect, createPortal} from '@wordpress/element';
import useScrollbar from '../../hooks/useScrollbar';
import Button from './Button';

function Modal({
                 isOpen,
                 onClose,
                 title,
                 children,
                 footer,
                 showFooter = false,
                 className = '',
                 closeOnClickOutside = true,
                 closeOnEscape = true,
                 showCloseButton = true,
                 size = 'medium',             // small, medium, large, full
               }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Scrollbar hook for body
  const {scrollRef: bodyRef, scrollbarClass: bodyScrollClass} = useScrollbar({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: isOpen,
  });

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Save current focus
      previousActiveElement.current = document.activeElement;

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Focus modal
      modalRef.current?.focus();
    } else {
      // Unlock body scroll
      document.body.style.overflow = '';

      // Restore focus
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="tpo-modal-overlay" onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={`tpo-modal tpo-modal--${size} ${showFooter ? 'tpo-modal--has-footer' : ''} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tpo-modal-title"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="tpo-modal__header">
          <h2 id="tpo-modal-title" className="tpo-modal__title">
            {title}
          </h2>
          {showCloseButton && (
            <Button
              style="plain"
              color="muted"
              size="small"
              iconOnly={true}
              ariaLabel={__('Close modal', 'themeplus')}
              onClick={onClose}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
          )}
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          className={`tpo-modal__body tpo-field-card-alt ${bodyScrollClass}`}
        >
          {children}
        </div>

        {/* Footer - Only shows if showFooter is true */}
        {showFooter && footer && (
          <div className="tpo-modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Render in portal
  return createPortal(modalContent, document.body);
}

export default Modal;