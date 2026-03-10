/**
 * ThemePlus Universal Select Component
 *
 * A fully accessible, keyboard-navigable select component
 * that can be reused anywhere in theme options
 *
 * File: src/js/admin/components/Common/Select.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useRef, useEffect, useCallback} from '@wordpress/element';
import useScrollbar from '../../hooks/useScrollbar'; // Scrollbar custom hook
import Button from "./Button";

/**
 * Normalize options to consistent format
 */
function normalizeOptions(options) {
  if (!options) return [];

  // Already an array
  if (Array.isArray(options)) {
    return options.map(option => {
      if (typeof option === 'object' && option !== null) {
        return {
          value: option.value ?? option,
          label: option.label ?? option.value ?? option,
        };
      }
      return {value: option, label: String(option)};
    });
  }

  // Object (PHP associative array)
  if (typeof options === 'object') {
    return Object.entries(options).map(([value, label]) => ({
      value,
      label: String(label),
    }));
  }

  return [];
}

/**
 * Universal Select Component
 *
 * @param {Object} props
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Change handler (value) => void
 * @param {Array|Object} props.options - Options array or object
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.className] - Additional CSS class
 * @param {boolean} [props.disabled] - Disabled state
 * @param {boolean} [props.searchable] - Enable search (auto for 10+ options)
 * @param {number} [props.searchThreshold] - Show search at N options (default: 10)
 * @param {string} [props.size] - Size variant: 'default' | 'small' | 'large'
 * @param {number} [props.maxHeight] - Max dropdown height in pixels
 */
function Select({
                  value,
                  onChange,
                  options = [],
                  placeholder = __('Select...', 'themeplus'),
                  className = '',
                  disabled = false,
                  multiple = false,
                  clearable = false,
                  searchable = null, // null = auto-decide
                  searchThreshold = 10,
                  size = 'default',
                  maxHeight = 320, // 8 options × 40px
                }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [typeaheadQuery, setTypeaheadQuery] = useState('');
  const [typeaheadTimeout, setTypeaheadTimeout] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('bottom'); // 'top' or 'bottom'

  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);

  // Scrollbar hook
  const {scrollRef: listRef, scrollbarClass} = useScrollbar({
    hideDelay: 1000,
    showOnHover: true,
    isOpen: isOpen, // ← Pass isOpen state
  });

  // Normalize options
  const normalizedOptions = normalizeOptions(options);

  // Normalize value for multi-select
  const normalizedValue = multiple
    ? (Array.isArray(value) ? value : [])
    : value;

  // Auto-determine if search should be shown
  const shouldShowSearch = searchable ?? (normalizedOptions.length >= searchThreshold);

  // Filter options by search query
  const filteredOptions = searchQuery
    ? normalizedOptions.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : normalizedOptions;

  // Get selected option(s)
  const selectedOption = multiple
    ? normalizedOptions.filter(opt => normalizedValue.includes(opt.value))
    : normalizedOptions.find(opt => opt.value === normalizedValue);

  const selectedLabel = multiple
    ? null // We'll show badges instead
    : (selectedOption?.label || placeholder);

  // Get selected index in filtered list
  const selectedIndex = multiple
    ? -1
    : filteredOptions.findIndex(opt => opt.value === normalizedValue);

  /**
   * Calculate dropdown position (top or bottom)
   * Based on available space in viewport
   */
  const calculateDropdownPosition = useCallback(() => {
    if (!selectRef.current) return 'bottom';

    const buttonRect = selectRef.current.getBoundingClientRect();
    const dropdownHeight = maxHeight + (shouldShowSearch ? 48 : 0); // Add search height if present

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    // If more space below, open downward
    if (spaceBelow >= dropdownHeight) {
      return 'bottom';
    }

    // If more space above, open upward
    if (spaceAbove >= dropdownHeight) {
      return 'top';
    }

    // If neither has enough space, use the side with more room
    return spaceAbove > spaceBelow ? 'top' : 'bottom';
  }, [maxHeight, shouldShowSearch]);

  /**
   * Close dropdown
   */
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  }, []);

  /**
   * Open dropdown
   */
  const openDropdown = useCallback(() => {
    if (disabled) return;

    // Calculate position before opening
    const position = calculateDropdownPosition();
    setDropdownPosition(position);

    setIsOpen(true);
    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);

    // Focus search input or first option
    setTimeout(() => {
      if (shouldShowSearch) {
        searchInputRef.current?.focus();
      }
    }, 0);
  }, [disabled, selectedIndex, shouldShowSearch, calculateDropdownPosition]);

  /**
   * Handle option select
   */
  const handleSelect = useCallback((optionValue) => {
    if (multiple) {
      const newValue = normalizedValue.includes(optionValue)
        ? normalizedValue.filter(v => v !== optionValue)
        : [...normalizedValue, optionValue];
      onChange(newValue);
      // Don't close dropdown for multi-select
    } else {
      onChange(optionValue);
      closeDropdown();
    }
  }, [multiple, normalizedValue, onChange, closeDropdown]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback((e) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;

      case ' ':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else if (multiple && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          // Space toggles selection in multi-select
          handleSelect(filteredOptions[focusedIndex].value);
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (isOpen) {
          closeDropdown();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          const nextIndex = focusedIndex < filteredOptions.length - 1
            ? focusedIndex + 1
            : focusedIndex;
          setFocusedIndex(nextIndex);

          // Scroll into view
          optionRefs.current[nextIndex]?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;
          setFocusedIndex(prevIndex);

          // Scroll into view
          optionRefs.current[prevIndex]?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
        break;

      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
          optionRefs.current[0]?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
        break;

      case 'End':
        if (isOpen) {
          e.preventDefault();
          const lastIndex = filteredOptions.length - 1;
          setFocusedIndex(lastIndex);
          optionRefs.current[lastIndex]?.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
        break;

      case 'Tab':
        if (isOpen) {
          closeDropdown();
        }
        break;

      default:
        // Type-to-search (when dropdown is open and search not shown)
        if (isOpen && !shouldShowSearch && e.key.length === 1) {
          e.preventDefault();

          // Clear previous timeout
          if (typeaheadTimeout) {
            clearTimeout(typeaheadTimeout);
          }

          // Build search query
          const newQuery = typeaheadQuery + e.key.toLowerCase();
          setTypeaheadQuery(newQuery);

          // Find matching option
          const matchIndex = filteredOptions.findIndex(option =>
            option.label.toLowerCase().startsWith(newQuery)
          );

          if (matchIndex >= 0) {
            setFocusedIndex(matchIndex);
            optionRefs.current[matchIndex]?.scrollIntoView({
              block: 'nearest',
              behavior: 'smooth'
            });
          }

          // Reset typeahead after 1 second
          const timeout = setTimeout(() => {
            setTypeaheadQuery('');
          }, 1000);
          setTypeaheadTimeout(timeout);
        }
        break;
    }
  }, [
    disabled,
    isOpen,
    focusedIndex,
    filteredOptions,
    openDropdown,
    closeDropdown,
    handleSelect,
    shouldShowSearch,
    typeaheadQuery,
    typeaheadTimeout,
  ]);

  /**
   * Recalculate position on scroll/resize
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleRecalculate = () => {
      const position = calculateDropdownPosition();
      setDropdownPosition(position);
    };

    window.addEventListener('scroll', handleRecalculate, true);
    window.addEventListener('resize', handleRecalculate);

    return () => {
      window.removeEventListener('scroll', handleRecalculate, true);
      window.removeEventListener('resize', handleRecalculate);
    };
  }, [isOpen, calculateDropdownPosition]);

  /**
   * Click outside to close
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, closeDropdown]);

  /**
   * Scroll to selected option when opened
   */
  useEffect(() => {
    if (isOpen && selectedIndex >= 0) {
      setTimeout(() => {
        optionRefs.current[selectedIndex]?.scrollIntoView({
          block: 'nearest',
          behavior: 'auto'
        });
      }, 0);
    }
  }, [isOpen, selectedIndex]);

  /**
   * Cleanup typeahead timeout
   */
  useEffect(() => {
    return () => {
      if (typeaheadTimeout) {
        clearTimeout(typeaheadTimeout);
      }
    };
  }, [typeaheadTimeout]);

  return (
    <div
      ref={selectRef}
      className={`tpo-select tpo-select--${size} tpo-select--${dropdownPosition} ${isOpen ? 'tpo-select--open' : ''} ${disabled ? 'tpo-select--disabled' : ''} ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Select Button */}
      <button
        ref={buttonRef}
        type="button"
        className="tpo-select__button"
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
      >
        {multiple ? (
          <div className="tpo-select__badges">
            {selectedOption.length > 0 ? (
              selectedOption.map(opt => (
                <span key={opt.value} className="tpo-select__badge">
            {opt.label}
                  <button
                    type="button"
                    className="tpo-select__badge-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(opt.value);
                    }}
                    aria-label={__('Remove', 'themeplus')}
                  >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </span>
              ))
            ) : (
              <span className="tpo-select__placeholder">{placeholder}</span>
            )}
          </div>
        ) : (
          <span className="tpo-select__value">{selectedLabel}</span>
        )}

        {/* Clear Button */}
        {clearable && !multiple && value && (
          <Button
            size="small"
            color="muted"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            ariaLabel={__('Clear selection', 'themeplus')}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
        )}

        <span className={`tpo-select__arrow ${isOpen ? 'tpo-select__arrow--open' : ''}`}>
    <i className="fa-solid fa-chevron-down"></i>
  </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="tpo-select__dropdown"
          style={{maxHeight: `${maxHeight}px`}}
        >
          {/* Search Input */}
          {shouldShowSearch && (
            <div className="tpo-select__search">
              <input
                ref={searchInputRef}
                type="text"
                className="tpo-select__search-input"
                placeholder={__('Search...', 'themeplus')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(0); // Reset focus to first result
                }}
                onClick={(e) => e.stopPropagation()}
                aria-label={__('Search options', 'themeplus')}
              />
            </div>
          )}

          {/* Options List */}
          <ul
            ref={listRef}
            className={`tpo-select__list tpo-field-card-alt ${scrollbarClass}`}
            role="listbox"
            aria-label={__('Select options', 'themeplus')}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={`tpo-select__option ${
                    multiple
                      ? (normalizedValue.includes(option.value) ? 'tpo-select__option--selected' : '')
                      : (value === option.value ? 'tpo-select__option--selected' : '')
                  } ${
                    focusedIndex === index ? 'tpo-select__option--focused' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={multiple ? normalizedValue.includes(option.value) : value === option.value}
                >
                  {option.label}
                  {(multiple ? normalizedValue.includes(option.value) : value === option.value) && (
                    <span className="tpo-select__checkmark" aria-hidden="true">
                      <i className="fa-solid fa-circle-check"></i>
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="tpo-select__option tpo-select__option--empty">
                {__('No options found', 'themeplus')}
              </li>
            )}
          </ul>

          {/* Done Button for Multi-Select */}
          {multiple && (
            <div className="tpo-select__actions">
              <div className="tpo-select__bulk-actions tpo-field-group--button">
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => {
                    const allValues = filteredOptions.map(opt => opt.value);
                    onChange(allValues);
                  }}>
                  {__('Select All', 'themeplus')}
                </Button>
                <Button
                  color="muted"
                  size="small"
                  onClick={() => onChange([])}>
                  {__('Deselect All', 'themeplus')}
                </Button>
              </div>
              <div className="tpo-field-group--button">
                <Button
                  color="success"
                  size="small"
                  onClick={closeDropdown}>
                  {__('Done', 'themeplus')}
                </Button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default Select;