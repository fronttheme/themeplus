/**
 * ThemePlus Footer Component
 *
 * File: src/js/admin/components/Layout/Footer.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import Button from '../Common/Button';

function Footer({onSave, onResetSection, onResetAll}) {
  const [saving, setSaving] = useState(false);

  // Read from localStorage — default ON (true)
  const [preloaderEnabled, setPreloaderEnabled] = useState(() => {
    const stored = localStorage.getItem('themeplus_preloader_enabled');
    return stored === null ? true : stored === 'true';
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreloaderToggle = () => {
    const next = !preloaderEnabled;
    setPreloaderEnabled(next);
    localStorage.setItem('themeplus_preloader_enabled', String(next));
  };

  return (
    <footer className="tpo-footer">
      <div className="tpo-footer__left">
        {/* Social Links */}
        <div className="tpo-footer__social">
          <a href="https://www.facebook.com/FrontTheme/"
             target="_blank"
             rel="noopener noreferrer"
             className="tpo-footer__social-link"
             aria-label="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://x.com/FrontTheme"
             target="_blank"
             rel="noopener noreferrer"
             className="tpo-footer__social-link"
             aria-label="X">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://dribbble.com/FrontTheme"
             target="_blank"
             rel="noopener noreferrer"
             className="tpo-footer__social-link"
             aria-label="Dribbble">
            <i className="fa-brands fa-dribbble"></i>
          </a>
          <a href="https://www.behance.net/FrontTheme"
             target="_blank"
             rel="noopener noreferrer"
             className="tpo-footer__social-link"
             aria-label="Behance">
            <i className="fa-brands fa-behance"></i></a>
          <a href="https://www.fronttheme.com/"
             target="_blank"
             rel="noopener noreferrer"
             className="tpo-footer__social-link"
             aria-label="Website">
            <i className="fa-solid fa-earth-americas"></i>
          </a>
        </div>
      </div>

      <div className="tpo-footer__center">
        {/* Preloader Toggle */}
        <button
          className={`tpo-footer__preloader-toggle ${preloaderEnabled ? 'is-enabled' : 'is-disabled'}`}
          onClick={handlePreloaderToggle}
          type="button"
          aria-label={__('Toggle preloader', 'themeplus')}
          title={
            preloaderEnabled
              ? __('Preloader ON — click to disable', 'themeplus')
              : __('Preloader OFF — click to enable', 'themeplus')
          }>
          <span className="tpo-footer__preloader-icon">
            <i className={`fa-solid ${preloaderEnabled ? 'fa-spinner' : 'fa-ban'}`}></i>
          </span>
          <span className="tpo-footer__preloader-label">
            {preloaderEnabled
              ? __('Preloader: ON', 'themeplus')
              : __('Preloader: OFF', 'themeplus')
            }
          </span>
        </button>
      </div>

      <div className="tpo-footer__right">
        {/* Action Buttons */}
        <div className="tpo-footer__actions tpo-ui-group--button">
          <Button
            color="gradient"
            onClick={handleSave}
            loading={saving}>
            {saving ? __('Saving...', 'themeplus') : __('Save Changes', 'themeplus')}
          </Button>
          <Button
            color="secondary"
            onClick={onResetSection}>
            {__('Reset Section', 'themeplus')}
          </Button>
          <Button
            color="danger"
            onClick={onResetAll}>
            {__('Reset All', 'themeplus')}
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;