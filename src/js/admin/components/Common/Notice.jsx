/**
 * ThemePlus Notice Component
 * Reusable notice/alert component with dismiss functionality
 *
 * File: src/js/admin/components/Common/Notice.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useEffect} from '@wordpress/element';
import Button from './Button';

/**
 * Notice Component
 *
 * @param {Object} props Component props
 * @param {('success'|'info'|'warning'|'danger')} props.status Notice type/color
 * @param {React.ReactNode} props.children Notice content
 * @param {boolean} props.isDismissible Can be dismissed by user
 * @param {number|null} props.autoDismiss Auto-dismiss after X milliseconds (null = no auto-dismiss)
 * @param {Function} props.onDismiss Callback when dismissed
 * @param {string} props.className Additional CSS classes
 * @param {string} props.title Optional title
 */
function Notice({
                  status = 'info',
                  children,
                  isDismissible = false,
                  autoDismiss = null,
                  onDismiss,
                  className = '',
                  title,
                }) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss timer
  useEffect(() => {
    if (autoDismiss && autoDismiss > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismiss);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) return null;

  const icons = {
    success: 'fa-circle-check',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
    danger: 'fa-circle-exclamation',
  };

  return (
    <div className={`tpo-notice tpo-notice--${status} ${className}`}>
      <div className="tpo-notice__icon">
        <i className={`fa-solid ${icons[status]}`}/>
      </div>
      <div className="tpo-notice__content">
        {title && (
          <div className="tpo-notice__title">
            {title}
          </div>
        )}
        <div className="tpo-notice__text">
          {children}
        </div>
      </div>
      {isDismissible && (
        <div className="tpo-notice__dismiss">
          <Button
            size="small"
            className="tpo-button--small-dismiss"
            iconOnly={true}
            ariaLabel={__('Dismiss notice', 'themeplus')}
            onClick={handleDismiss}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Notice;