/**
 * ThemePlus Preloader Component
 *
 * File: src/js/admin/components/Common/Preloader.jsx
 */

import {__} from '@wordpress/i18n';
import PreloaderLogo from './PreloaderLogo';

function Preloader({
                     message = __('Loading...', 'themeplus'),
                     variant = 'animated', // animated, simple, spin
                     overlay = true,
                     size = 120,
                   }) {
  return (
    <div className={`tpo-preloader ${overlay ? 'tpo-preloader--overlay' : ''}`}>
      <div className="tpo-preloader__content">
        <PreloaderLogo
          size={size}
          className={`tpo-preloader-logo--${variant}`}
        />
        {message && (
          <div className="tpo-preloader__message">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Preloader;