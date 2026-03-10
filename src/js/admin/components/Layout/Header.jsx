/**
 * ThemePlus Header Component
 *
 * File: src/js/admin/components/Layout/Header.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useEffect} from '@wordpress/element';
import {useTheme} from '../../context/ThemeContext';
import Button from '../Common/Button';

/**
 * Header Component
 *
 * @param {Object} props Component props
 * @param {Function} props.onSave Save callback
 * @param {Function} props.onResetSection Reset section callback
 * @param {Function} props.onResetAll Reset all callback
 * @param {string} props.activeSection Active section name
 * @param {boolean} props.hasUnsavedChanges Unsaved changes status
 */
function Header({onSave, onResetSection, onResetAll, activeSection = '', hasUnsavedChanges = false}) {
  const {theme, toggleTheme} = useTheme();
  const [saving, setSaving] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [wasSaved, setWasSaved] = useState(false);

// Show/hide indicator based on changes
  useEffect(() => {
    if (hasUnsavedChanges) {
      // User is typing - show unsaved
      setShowIndicator(true);
      setWasSaved(false);
    } else if (!hasUnsavedChanges && showIndicator && !wasSaved) {
      // Just saved - show "Saved" for 2 seconds
      setWasSaved(true);

      const timer = setTimeout(() => {
        setShowIndicator(false);
        setWasSaved(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges]); // ONLY hasUnsavedChanges as dependency!

  /**
   * Handle save click
   */
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

  return (
    <header className="tpo-header">
      <div className="tpo-header__left">
        {/* Theme Toggle */}
        <button
          className="tpo-header__theme-toggle"
          onClick={toggleTheme}
          type="button"
          aria-label={__('Toggle theme', 'themeplus')}
          title={theme === 'light' ? __('Switch to dark mode', 'themeplus') : __('Switch to light mode', 'themeplus')}
        >
          <span className="tpo-header__theme-icon">
            {theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
          </span>
        </button>

        {/* Indicator - Show when user is typing or just saved */}
        {showIndicator && (
          <div
            className={`tpo-header__save-indicator ${hasUnsavedChanges ? 'tpo-header__save-indicator--unsaved' : 'tpo-header__save-indicator--saved'}`}
            title={hasUnsavedChanges ? __('You have unsaved changes', 'themeplus') : __('All changes saved', 'themeplus')}
          >
            <span className="tpo-header__save-dot"></span>
            <span className="tpo-header__save-text">
              {hasUnsavedChanges ? __('Unsaved', 'themeplus') : __('Saved', 'themeplus')}
            </span>
          </div>
        )}

        {/* Active Section Name */}
        {activeSection && (
          <div className="tpo-header__section-name">
            {activeSection}
          </div>
        )}
      </div>

      <div className="tpo-header__right">
        {/* Action Buttons */}
        <div className="tpo-header__actions tpo-ui-group--button">
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
    </header>
  );
}

export default Header;