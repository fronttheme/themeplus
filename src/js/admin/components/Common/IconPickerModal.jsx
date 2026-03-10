/**
 * ThemePlus Icon Picker Modal Component
 * FontAwesome only, extensible later
 *
 * File: src/js/admin/components/Common/IconPickerModal.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useEffect} from '@wordpress/element';
import {icons, iconCategories} from '../../data/icons';
import Select from './Select';
import useScrollbar from '../../hooks/useScrollbar';
import Button from "./Button";

function IconPickerModal({
                           isOpen,
                           onClose,
                           onSelect,
                           selectedIcon = '',
                         }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']);

  // Scrollbar hook for body
  const {scrollRef: bodyRef, scrollbarClass: bodyScrollClass} = useScrollbar({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: isOpen,
  });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedCategories(['all']);
    }
  }, [isOpen]);

  // Filter icons when search or categories change
  const filteredIcons = (() => {
    let filtered = icons;

    // Filter by search
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(icon =>
        icon.name.toLowerCase().includes(searchLower) ||
        icon.id.toLowerCase().includes(searchLower)
      );
    }

    // Filter by categories (if not searching)
    if (!searchQuery && !selectedCategories.includes('all') && selectedCategories.length > 0) {
      filtered = filtered.filter(icon =>
        selectedCategories.includes(icon.category)
      );
    }

    return filtered;
  })();

  // Handle category selection with proper "All" logic
  const handleCategoryChange = (categories) => {
    // If empty array, show all
    if (categories.length === 0) {
      setSelectedCategories(['all']);
      return;
    }

    // Get previous and current state
    const hadAll = selectedCategories.includes('all');
    const hasAll = categories.includes('all');

    // Case 1: User just selected "All" (wasn't selected before)
    if (hasAll && !hadAll) {
      setSelectedCategories(['all']);
      return;
    }

    // Case 2: User deselected "All" (but other items exist)
    if (!hasAll && hadAll) {
      // Remove 'all', keep others
      const withoutAll = categories.filter(cat => cat !== 'all');
      setSelectedCategories(withoutAll.length > 0 ? withoutAll : ['all']);
      return;
    }

    // Case 3: User selected specific category while "All" was selected
    if (hasAll && categories.length > 1) {
      // Remove 'all', keep only the new selections
      const withoutAll = categories.filter(cat => cat !== 'all');
      setSelectedCategories(withoutAll);
      return;
    }

    // Case 4: Normal selection (no "All" involved)
    setSelectedCategories(categories);
  };

  // Handle icon selection
  const handleSelect = (icon) => {
    onSelect(icon); // Pass full icon object with 'class' property
    onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Prepare category options for Select component
  const categoryOptions = iconCategories.map(cat => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <div className="tpo-icon-picker-modal">
      {/* Overlay */}
      <div
        className="tpo-icon-picker-modal__overlay"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="tpo-icon-picker-modal__container">
        {/* Header */}
        <div className="tpo-icon-picker-modal__header">
          <h2 className="tpo-icon-picker-modal__title">
            {__('Select Icon', 'themeplus')}
          </h2>
          {/* Modal Close Button */}
          <Button
            color="muted"
            size="small"
            iconOnly={true}
            ariaLabel={__('Close modal', 'themeplus')}
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </Button>
        </div>

        {/* Search */}
        <div className="tpo-icon-picker-modal__search">
          <input
            type="text"
            className="tpo-icon-picker-modal__search-input"
            placeholder={__('Search icons...', 'themeplus')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <Button
              color="muted"
              size="small"
              iconOnly={true}
              ariaLabel={__('Clear search', 'themeplus')}
              onClick={() => setSearchQuery('')}
            >
              <i className="fa-solid fa-xmark"></i>
            </Button>
          )}
        </div>

        {/* Categories with Multi-Select */}
        {!searchQuery && (
          <div className="tpo-icon-picker-modal__categories">
            <Select
              value={selectedCategories}
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder={__('Filter by categories...', 'themeplus')}
              multiple={true}
              searchable={false}
              clearable={false}
              className="tpo-icon-picker-modal__category-select"
            />
          </div>
        )}

        {/* Icons Grid with Scrollbar */}
        <div
          ref={bodyRef}
          className={`tpo-icon-picker-modal__body tpo-field-card-alt ${bodyScrollClass}`}
        >
          {filteredIcons.length > 0 ? (
            <div className="tpo-icon-picker-modal__grid">
              {filteredIcons.map((icon) => (
                <button
                  key={icon.id}
                  type="button"
                  className={`tpo-icon-picker-modal__icon ${
                    selectedIcon === icon.id ? 'selected' : ''
                  }`}
                  onClick={() => handleSelect(icon)}
                  title={icon.name}
                >
                  <i className={icon.class}/>
                  <span className="tpo-icon-picker-modal__icon-name">
                    {icon.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="tpo-icon-picker-modal__empty">
              <span className="tpo-icon-picker-modal__empty-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <p className="tpo-icon-picker-modal__empty-text">
                {__('No icons found', 'themeplus')}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="tpo-icon-picker-modal__footer">
          <div className="tpo-icon-picker-modal__footer-info">
            {filteredIcons.length} {__('icons', 'themeplus')}
          </div>
          {/* Modal Close Button */}
          <Button
            color="secondary"
            onClick={onClose}>
            {__('Close', 'themeplus')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IconPickerModal;