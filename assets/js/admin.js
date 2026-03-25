/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/admin/App.jsx":
/*!******************************!*\
  !*** ./src/js/admin/App.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _context_SettingsContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./context/SettingsContext */ "./src/js/admin/context/SettingsContext.jsx");
/* harmony import */ var _context_ThemeContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context/ThemeContext */ "./src/js/admin/context/ThemeContext.jsx");
/* harmony import */ var _hooks_useUnsavedChanges__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/useUnsavedChanges */ "./src/js/admin/hooks/useUnsavedChanges.js");
/* harmony import */ var _components_Layout_MainWrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Layout/MainWrapper */ "./src/js/admin/components/Layout/MainWrapper.jsx");
/* harmony import */ var _components_Layout_Sidebar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/Layout/Sidebar */ "./src/js/admin/components/Layout/Sidebar.jsx");
/* harmony import */ var _components_Layout_Header__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Layout/Header */ "./src/js/admin/components/Layout/Header.jsx");
/* harmony import */ var _components_Layout_Body__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Layout/Body */ "./src/js/admin/components/Layout/Body.jsx");
/* harmony import */ var _components_Layout_Footer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/Layout/Footer */ "./src/js/admin/components/Layout/Footer.jsx");
/* harmony import */ var _components_Common_Dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/Common/Dialog */ "./src/js/admin/components/Common/Dialog.jsx");
/* harmony import */ var _components_Common_Preloader__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/Common/Preloader */ "./src/js/admin/components/Common/Preloader.jsx");

/**
 * ThemePlus Main App Component
 *
 * File: src/js/admin/App.jsx
 */





// Context



// Custom Hook


// Layout Components







function App() {
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [minTimeElapsed, setMinTimeElapsed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [config, setConfig] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    sections: [],
    fields: {}
  });
  const [options, setOptions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [preloaderEnabled] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    const stored = localStorage.getItem('themeplus_preloader_enabled');
    return stored === null ? true : stored === 'true';
  });

  // Minimum display time: 6500ms (to see full animation)
  const MIN_LOADING_TIME = 7000;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Set minimum time
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, MIN_LOADING_TIME);

    // Actual data loading
    loadData().then(() => {
      setLoading(false);
    });
    return () => clearTimeout(minTimer);
  }, []);

  // Unsaved Changes Hook
  const {
    hasUnsavedChanges,
    currentValues,
    initialize,
    updateValue,
    markAsSaved
  } = (0,_hooks_useUnsavedChanges__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const [dialog, setDialog] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    onConfirm: null,
    confirmText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OK', 'themeplus'),
    cancelText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'themeplus')
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadData().catch(error => {
      console.error('Failed to load data:', error);
    });
  }, []);
  const showDialog = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(({
    type = 'success',
    title = '',
    message = '',
    confirmText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OK', 'themeplus'),
    cancelText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'themeplus'),
    onConfirm = null
  }) => {
    setDialog({
      isOpen: true,
      type,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm
    });
  }, []);
  const closeDialog = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setDialog({
      ...dialog,
      isOpen: false
    });
  }, [dialog]);
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const configResponse = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/themeplus/v1/config',
        method: 'GET'
      });
      if (!configResponse.success) {
        throw new Error('Failed to load configuration');
      }
      const sectionsArray = Object.values(configResponse.data.sections);
      setConfig({
        sections: sectionsArray,
        fields: configResponse.data.fields
      });
      if (sectionsArray.length > 0) {
        const firstSection = sectionsArray[0];
        const defaultTab = firstSection.subsections?.length > 0 ? `${firstSection.id}__${firstSection.subsections[0].id}` : firstSection.id;
        setActiveTab(defaultTab);
      }
      const optionsResponse = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/themeplus/v1/options',
        method: 'GET'
      });
      if (optionsResponse.success) {
        const loadedOptions = optionsResponse.data || {};
        setOptions(loadedOptions);
        initialize(loadedOptions); // Initialize tracking
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message || 'Failed to load data');
      setOptions({});
    } finally {
      setLoading(false);
    }
  };

  // CRITICAL: Custom setOptions wrapper that tracks changes
  const handleSetOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(updater => {
    // If updater is a function (like: prev => ({...prev, ...}))
    if (typeof updater === 'function') {
      setOptions(prevOptions => {
        const newOptions = updater(prevOptions);
        // Find what changed and update tracking
        Object.keys(newOptions).forEach(key => {
          if (newOptions[key] !== prevOptions[key]) {
            updateValue(key, newOptions[key]);
          }
        });
        return newOptions;
      });
    } else {
      // If updater is direct object
      setOptions(updater);
      // Update all values in tracking
      Object.keys(updater).forEach(key => {
        updateValue(key, updater[key]);
      });
    }
  }, [updateValue]);
  const saveOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async () => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/themeplus/v1/options',
        method: 'POST',
        data: {
          options: currentValues
        } // Save currentValues
      });
      if (response.success) {
        // Force re-render by clearing first
        setOptions({});
        setTimeout(() => {
          setOptions(currentValues);
          markAsSaved();
        }, 0);
        showDialog({
          type: 'success',
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Success!', 'themeplus'),
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Options saved successfully!', 'themeplus')
        });
      } else {
        throw new Error(response.message || 'Failed to save options');
      }
    } catch (error) {
      console.error('Error saving options:', error);
      showDialog({
        type: 'error',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error!', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save options: ', 'themeplus') + error.message
      });
    }
  }, [currentValues, markAsSaved, showDialog]);
  const handleTabChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(tabId => {
    setActiveTab(tabId);
  }, []);
  const resetSection = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    showDialog({
      type: 'confirm',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Section?', 'themeplus'),
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to reset this section to default values?', 'themeplus'),
      onConfirm: async () => {
        try {
          const sectionId = activeTab.includes('__') ? activeTab.split('__')[0] : activeTab;
          const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
            path: '/themeplus/v1/options/reset-section',
            method: 'POST',
            data: {
              section_id: sectionId
            }
          });
          if (response.success) {
            const resetData = response.data || {};
            // Force re-render
            setOptions({});
            setTimeout(() => {
              setOptions(resetData);
              initialize(resetData);
            }, 0);
            showDialog({
              type: 'success',
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Success!', 'themeplus'),
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Section reset successfully!', 'themeplus')
            });
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error('Error resetting section:', error);
          showDialog({
            type: 'error',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error!', 'themeplus'),
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to reset section: ', 'themeplus') + error.message
          });
        }
      }
    });
  }, [activeTab, initialize, showDialog]);
  const resetAll = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    showDialog({
      type: 'confirm',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset All Settings?', 'themeplus'),
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to reset ALL settings to default values? This action cannot be undone!', 'themeplus'),
      onConfirm: async () => {
        try {
          const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
            path: '/themeplus/v1/options/reset',
            method: 'POST'
          });
          if (response.success) {
            const resetData = response.data || {};
            // Force re-render
            setOptions({});
            setTimeout(() => {
              setOptions(resetData);
              initialize(resetData);
            }, 0);
            showDialog({
              type: 'success',
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Success!', 'themeplus'),
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All settings reset successfully!', 'themeplus')
            });
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error('Error resetting all:', error);
          showDialog({
            type: 'error',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error!', 'themeplus'),
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to reset settings: ', 'themeplus') + error.message
          });
        }
      }
    });
  }, [initialize, showDialog]);
  const getActiveSectionName = () => {
    if (!activeTab) return '';
    if (activeTab.includes('__')) {
      const [sectionId, subsectionId] = activeTab.split('__');
      const section = config.sections.find(s => s.id === sectionId);
      if (section) {
        const subsection = section.subsections?.find(sub => sub.id === subsectionId);
        if (subsection) {
          return `${section.title} › ${subsection.title}`;
        }
        return section.title;
      }
    }
    const section = config.sections.find(s => s.id === activeTab);
    return section ? section.title : '';
  };
  if (preloaderEnabled && (loading || !minTimeElapsed)) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_Preloader__WEBPACK_IMPORTED_MODULE_13__["default"], {
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading ThemePlus', 'themeplus'),
      variant: "animated",
      overlay: false
    });
  }
  if (error) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-error"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-error__icon"
    }, "\u26A0\uFE0F"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "tpo-error__title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Error Loading ThemePlus', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "tpo-error__message"
    }, error), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "tpo-error__button",
      onClick: loadData
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Try Again', 'themeplus')));
  }

  // CRITICAL: Pass handleSetOptions wrapper instead of raw setOptions
  const settingsValue = {
    options,
    setOptions: handleSetOptions,
    isLoaded: !loading
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_ThemeContext__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_context_SettingsContext__WEBPACK_IMPORTED_MODULE_4__.SettingsProvider, {
    value: settingsValue
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layout_MainWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layout_Sidebar__WEBPACK_IMPORTED_MODULE_8__["default"], {
    sections: config.sections,
    activeTab: activeTab,
    onTabChange: handleTabChange,
    searchQuery: searchQuery,
    onSearchChange: setSearchQuery,
    isLoaded: !loading
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-body-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layout_Header__WEBPACK_IMPORTED_MODULE_9__["default"], {
    onSave: saveOptions,
    onResetSection: resetSection,
    onResetAll: resetAll,
    activeSection: searchQuery ? `Search: "${searchQuery}"` : getActiveSectionName(),
    hasUnsavedChanges: hasUnsavedChanges
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layout_Body__WEBPACK_IMPORTED_MODULE_10__["default"], {
    sections: config.sections,
    activeTab: activeTab,
    showDialog: showDialog,
    searchQuery: searchQuery,
    onClearSearch: () => setSearchQuery('')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Layout_Footer__WEBPACK_IMPORTED_MODULE_11__["default"], {
    onSave: saveOptions,
    onResetSection: resetSection,
    onResetAll: resetAll
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Common_Dialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
    isOpen: dialog.isOpen,
    onClose: closeDialog,
    type: dialog.type,
    title: dialog.title,
    message: dialog.message,
    confirmText: dialog.confirmText,
    cancelText: dialog.cancelText,
    onConfirm: dialog.onConfirm
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/js/admin/components/Common/Button.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/Common/Button.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * ThemePlus Button Component
 * Universal button for consistent UI across the plugin
 *
 * File: src/js/admin/components/Common/Button.jsx
 */



/**
 * Button Component
 *
 * @param {Object} props Component props
 * @param {string} props.style Button visual style
 *   - solid: Filled background (default)
 *   - outline: Outlined with transparent background
 *   - plain: No border, transparent background
 * @param {string} props.color Button semantic color
 *   - primary
 *   - secondary
 *   - light
 *   - success
 *   - danger
 *   - warning
 *   - info
 *   - muted
 *   - gradient
 * @param {string} props.size Button size
 *   - small: Compact button (28px)
 *   - medium: Default size (36px)
 *   - large: Prominent button (48px)
 *   - auto: Inherits height from parent/sibling
 * @param {boolean} props.iconOnly Icon-only button (no text, just icon)
 * @param {string} props.ariaLabel Accessibility label (required for iconOnly buttons)
 * @param {boolean} props.loading Loading state with spinner
 * @param {boolean} props.disabled Disabled state
 * @param {boolean} props.fullWidth Full width button
 * @param {Function} props.onClick Click handler
 * @param {React.ReactNode} props.children Button content (text, icon, or both)
 * @param {string} props.type Button type (button, submit, reset)
 * @param {string} props.className Additional CSS classes
 */
function Button({
  style = 'solid',
  color = 'primary',
  size = 'medium',
  iconOnly = false,
  ariaLabel,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  type = 'button',
  className = '',
  ...props
}) {
  // Detect if button contains only an icon
  const hasOnlyIcon = (() => {
    if (iconOnly) return true;

    // Check if children is a single <i> element
    const childArray = _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Children.toArray(children);
    if (childArray.length === 1) {
      const child = childArray[0];
      if (child?.type === 'i' || child?.props?.className?.includes('fa-')) {
        return true;
      }
    }
    return false;
  })();

  // Build class names
  const classNames = ['tpo-button', `tpo-button--${style}`, `tpo-button--${color}`, `tpo-button--${size}`, hasOnlyIcon && 'tpo-button--icon-only', fullWidth && 'tpo-button--full-width', loading && 'tpo-button--loading', disabled && 'tpo-button--disabled', className].filter(Boolean).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: classNames,
    onClick: onClick,
    disabled: disabled || loading,
    type: type,
    "aria-label": ariaLabel || props['aria-label'],
    ...props
  }, loading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-button__spinner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-spinner fa-spin"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-button__content"
  }, children));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./src/js/admin/components/Common/ButtonSet.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Common/ButtonSet.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Reusable ButtonSet Component
 *
 * File: src/js/admin/components/Common/ButtonSet.jsx
 */

/**
 * ButtonSet Component
 *
 * @param {Object} props Component props
 * @param {string} props.label Field label (optional)
 * @param {string} props.value Selected value
 * @param {Function} props.onChange Change handler
 * @param {Array|Object} props.options Button options
 * @param {string} props.className Additional CSS class
 * @param {boolean} props.showLabel Show label or not
 */
function ButtonSet({
  label = '',
  value,
  onChange,
  options = [],
  className = '',
  showLabel = true
}) {
  /**
   * Normalize options to array format
   * Handles:
   * - Array: [{value: 'left', label: 'Left'}, ...]
   * - Object: {left: 'Left', right: 'Right'}
   */
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options;
    }
    if (typeof options === 'object' && options !== null) {
      return Object.entries(options).map(([key, label]) => ({
        value: key,
        label: label
      }));
    }
    return [];
  };
  const normalizedOptions = normalizeOptions();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-field--component tpo-buttonset-wrapper ${className}`
  }, showLabel && label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-buttonset__label tpo-field__label--depth0"
  }, label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-buttonset tpo-field-group--buttonset",
    role: "group",
    "aria-label": label
  }, normalizedOptions.map(option => {
    const optionValue = option.value !== undefined ? option.value : option;
    const optionLabel = option.label || option;
    const isActive = value === optionValue;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: optionValue,
      type: "button",
      className: `tpo-buttonset__button ${isActive ? 'tpo-buttonset__button--active' : ''}`,
      onClick: () => onChange(optionValue),
      "aria-pressed": isActive
    }, optionLabel);
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonSet);

/***/ }),

/***/ "./src/js/admin/components/Common/Checkbox.jsx":
/*!*****************************************************!*\
  !*** ./src/js/admin/components/Common/Checkbox.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Reusable Checkbox Component
 *
 * File: src/js/admin/components/Common/Checkbox.jsx
 */

function Checkbox({
  id,
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'medium',
  // 'small' | 'medium' | 'large'
  className = ''
}) {
  const sizeClass = `tpo-checkbox--${size}`;
  const disabledClass = disabled ? 'tpo-checkbox--disabled' : '';
  const checkedClass = checked ? 'tpo-checkbox--checked' : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: `tpo-checkbox ${sizeClass} ${disabledClass} ${checkedClass} ${className}`.trim()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    onChange: e => onChange(e.target.checked),
    disabled: disabled,
    className: "tpo-checkbox__input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-checkbox__indicator"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    className: "tpo-checkbox__check",
    viewBox: "0 0 12 10",
    width: "12",
    height: "10"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polyline", {
    points: "1.5 6 4.5 9 10.5 1"
  }))), label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-checkbox__label"
  }, label));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Checkbox);

/***/ }),

/***/ "./src/js/admin/components/Common/ColorPickerButton.jsx":
/*!**************************************************************!*\
  !*** ./src/js/admin/components/Common/ColorPickerButton.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);

/**
 * ThemePlus ColorPickerButton Component
 * Reusable color picker with smart positioning
 *
 * File: src/js/admin/components/Common/ColorPickerButton.jsx
 */





/**
 * ColorPickerButton Component
 *
 * @param {Object} props
 * @param {string} props.value - Current color value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.showInput - Show/hide text input (default: true)
 * @param {string} props.ariaLabel - Aria label for button
 * @param {string} props.className - Additional CSS class
 */
function ColorPickerButton({
  value = '#000000',
  onChange,
  placeholder = '#000000',
  showInput = true,
  ariaLabel = null,
  className = ''
}) {
  const [showPicker, setShowPicker] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [pickerPosition, setPickerPosition] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({
    top: 0,
    left: 0,
    position: 'bottom'
  });
  const buttonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const pickerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);

  // Smart 3-way positioning: bottom → top → right
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!showPicker || !buttonRef.current) return;
    const calculatePosition = () => {
      const buttonRect = buttonRef.current.getBoundingClientRect();

      // Get actual picker dimensions
      const pickerHeight = pickerRef.current?.offsetHeight || 450;
      const pickerWidth = 250;

      // Calculate available space on ALL sides
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const spaceRight = window.innerWidth - buttonRect.right;
      const gap = 8;
      const buffer = 20;
      let top, left, position;

      // PRIORITY 1: Try BOTTOM (default)
      if (spaceBelow >= pickerHeight + buffer) {
        position = 'bottom';
        top = buttonRect.bottom + gap;
        left = buttonRect.left;
      }
      // PRIORITY 2: Try TOP
      else if (spaceAbove >= pickerHeight + buffer) {
        position = 'top';
        top = buttonRect.top - pickerHeight - gap;
        left = buttonRect.left;
      }
      // PRIORITY 3: Try RIGHT
      else if (spaceRight >= pickerWidth + buffer) {
        position = 'right';
        top = buttonRect.top;
        left = buttonRect.right + gap;

        // Adjust vertical position
        if (top + pickerHeight > window.innerHeight - buffer) {
          top = window.innerHeight - pickerHeight - buffer;
        }
        if (top < buffer) {
          top = buffer;
        }
      }
      // FALLBACK: Force bottom
      else {
        position = 'bottom';
        top = buttonRect.bottom + gap;
        left = buttonRect.left;
        if (top + pickerHeight > window.innerHeight - buffer) {
          top = window.innerHeight - pickerHeight - buffer;
        }
      }

      // Adjust horizontal position
      if (position !== 'right') {
        if (left + pickerWidth > window.innerWidth - buffer) {
          left = window.innerWidth - pickerWidth - buffer;
        }
        if (left < buffer) {
          left = buffer;
        }
      }
      setPickerPosition({
        top,
        left,
        position
      });
    };
    setTimeout(calculatePosition, 0);

    // Watch for content changes
    const observer = new MutationObserver(() => {
      setTimeout(calculatePosition, 50);
    });
    if (pickerRef.current) {
      observer.observe(pickerRef.current, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }
    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [showPicker]);

  // Render picker in portal
  const renderPicker = () => {
    if (!showPicker) return null;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createPortal)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: `tpo-color-picker-portal tpo-color-picker--${pickerPosition.position}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-color-picker__overlay",
      onClick: () => setShowPicker(false)
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ref: pickerRef,
      className: "tpo-color-picker__modal",
      style: {
        position: 'fixed',
        top: `${pickerPosition.top}px`,
        left: `${pickerPosition.left}px`,
        zIndex: 1000000
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ColorPicker, {
      color: value || '#000000',
      onChangeComplete: color => {
        onChange(color.hex);
      },
      disableAlpha: false
    }))), document.body);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-color tpo-field-color ${className}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    ref: buttonRef,
    type: "button",
    className: "tpo-color__preview tpo-field-color__preview",
    style: {
      backgroundColor: value || '#000000'
    },
    onClick: () => setShowPicker(!showPicker),
    "aria-label": ariaLabel || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick color', 'themeplus')
  }), showInput && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "tpo-color__input tpo-field-color__input",
    value: value || '',
    onChange: e => {
      const newValue = e.target.value;
      if (/^#[0-9A-F]{0,6}$/i.test(newValue) || newValue === '') {
        onChange(newValue);
      }
    },
    placeholder: placeholder,
    maxLength: 7,
    autoComplete: "off"
  }), renderPicker());
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPickerButton);

/***/ }),

/***/ "./src/js/admin/components/Common/Dialog.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/Common/Dialog.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Dialog Component
 *
 * File: src/js/admin/components/Common/Dialog.jsx
 */





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
  confirmText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('OK', 'themeplus'),
  cancelText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus')
}) {
  /**
   * Close on Escape key
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const handleEscape = e => {
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
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
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: "fa-solid fa-circle-check"
        });
      case 'error':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: "fa-solid fa-bug"
        });
      case 'warning':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: "fa-solid fa-triangle-exclamation"
        });
      case 'confirm':
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: "fa-solid fa-circle-exclamation"
        });
      default:
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: "fa-solid fa-circle-exclamation"
        });
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dialog"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dialog__overlay",
    onClick: onClose
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-dialog__container ${getColorClass()}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dialog__icon"
  }, getIcon()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dialog__content"
  }, title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "tpo-dialog__title"
  }, title), message && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-dialog__message"
  }, message)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dialog__actions tpo-ui-group--button"
  }, type === 'confirm' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "muted",
    onClick: onClose
  }, cancelText), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: handleConfirm
  }, confirmText)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    onClick: onClose
  }, confirmText))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dialog);

/***/ }),

/***/ "./src/js/admin/components/Common/FieldRenderer.jsx":
/*!**********************************************************!*\
  !*** ./src/js/admin/components/Common/FieldRenderer.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Fields */ "./src/js/admin/components/Fields/index.js");

/**
 * ThemePlus Field Renderer
 *
 * File: src/js/admin/components/Common/FieldRenderer.jsx
 */


function FieldRenderer({
  field,
  value,
  onUpdate,
  showModal
}) {
  const {
    id,
    type,
    title,
    subtitle,
    desc,
    content,
    default: defaultValue,
    ...fieldProps
  } = field;
  const currentValue = value !== undefined ? value : defaultValue;
  const helpText = subtitle || desc || '';

  // Build search terms for search functionality
  const searchTerms = [title || '', subtitle || '', desc || '', id || ''].filter(Boolean).join(' ').toLowerCase();

  // Common wrapper attributes
  const wrapperProps = {
    className: 'tpo-field-wrapper',
    'data-search-terms': searchTerms,
    'data-field-id': id,
    'data-field-title': title
  };

  // Handle display-only fields (no value/onChange)
  if (type === 'info') {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...wrapperProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields__WEBPACK_IMPORTED_MODULE_1__.InfoField, {
      title: title,
      desc: helpText,
      content: content,
      ...fieldProps
    }));
  }
  if (type === 'section') {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...wrapperProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields__WEBPACK_IMPORTED_MODULE_1__.SectionField, {
      title: title,
      desc: helpText,
      content: content,
      ...fieldProps
    }));
  }
  if (type === 'raw') {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...wrapperProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields__WEBPACK_IMPORTED_MODULE_1__.RawField, {
      id: id,
      title: title,
      desc: helpText,
      content: content,
      ...fieldProps
    }));
  }

  // Regular fields with value/onChange
  const props = {
    id,
    label: title,
    value: currentValue,
    onChange: onUpdate,
    help: helpText,
    showModal,
    ...fieldProps
  };
  if (type === 'code_editor') {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...wrapperProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Fields__WEBPACK_IMPORTED_MODULE_1__.CodeEditorField, {
      ...props
    }));
  }

  // Field type mapping (30 fields type)
  const fields = {
    // Text Fields
    text: _Fields__WEBPACK_IMPORTED_MODULE_1__.TextField,
    textarea: _Fields__WEBPACK_IMPORTED_MODULE_1__.TextareaField,
    // Number Fields
    number: _Fields__WEBPACK_IMPORTED_MODULE_1__.NumberField,
    spinner: _Fields__WEBPACK_IMPORTED_MODULE_1__.NumberField,
    slider: _Fields__WEBPACK_IMPORTED_MODULE_1__.SliderField,
    // Choice Fields
    select: _Fields__WEBPACK_IMPORTED_MODULE_1__.SelectField,
    button_set: _Fields__WEBPACK_IMPORTED_MODULE_1__.ButtonSet,
    radio: _Fields__WEBPACK_IMPORTED_MODULE_1__.RadioField,
    checkbox: _Fields__WEBPACK_IMPORTED_MODULE_1__.CheckboxField,
    select_image: _Fields__WEBPACK_IMPORTED_MODULE_1__.SelectImageField,
    // Toggle Fields
    toggle: _Fields__WEBPACK_IMPORTED_MODULE_1__.ToggleField,
    switch: _Fields__WEBPACK_IMPORTED_MODULE_1__.ToggleField,
    // Color Fields
    color: _Fields__WEBPACK_IMPORTED_MODULE_1__.ColorPicker,
    gradient_picker: _Fields__WEBPACK_IMPORTED_MODULE_1__.GradientPickerField,
    // Media Fields
    image: _Fields__WEBPACK_IMPORTED_MODULE_1__.ImageField,
    icon: _Fields__WEBPACK_IMPORTED_MODULE_1__.IconField,
    // Layout Fields
    dimensions: _Fields__WEBPACK_IMPORTED_MODULE_1__.Dimensions,
    typography: _Fields__WEBPACK_IMPORTED_MODULE_1__.Typography,
    // Special Fields
    info: _Fields__WEBPACK_IMPORTED_MODULE_1__.InfoField,
    section: _Fields__WEBPACK_IMPORTED_MODULE_1__.SectionField,
    shortcode: _Fields__WEBPACK_IMPORTED_MODULE_1__.ShortcodeField,
    raw: _Fields__WEBPACK_IMPORTED_MODULE_1__.RawField,
    // Date Fields
    date_picker: _Fields__WEBPACK_IMPORTED_MODULE_1__.DatePickerField,
    // Social Fields
    social_media: _Fields__WEBPACK_IMPORTED_MODULE_1__.SocialMediaField,
    // Code Fields
    code_editor: _Fields__WEBPACK_IMPORTED_MODULE_1__.CodeEditorField,
    // Advanced Fields
    repeater: _Fields__WEBPACK_IMPORTED_MODULE_1__.RepeaterField,
    // Enhancement Fields
    background: _Fields__WEBPACK_IMPORTED_MODULE_1__.BackgroundField,
    border: _Fields__WEBPACK_IMPORTED_MODULE_1__.BorderField,
    spacing: _Fields__WEBPACK_IMPORTED_MODULE_1__.SpacingField,
    link: _Fields__WEBPACK_IMPORTED_MODULE_1__.LinkField,
    gallery: _Fields__WEBPACK_IMPORTED_MODULE_1__.GalleryField,
    group: _Fields__WEBPACK_IMPORTED_MODULE_1__.GroupField
  };
  const FieldComponent = fields[type];

  // Unknown field type
  if (!FieldComponent) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...wrapperProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-field tpo-field--unknown"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Unknown field type: ", type)));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...wrapperProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(FieldComponent, {
    ...props
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FieldRenderer);

/***/ }),

/***/ "./src/js/admin/components/Common/FileUpload.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/Common/FileUpload.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);

/**
 * ThemePlus FileUpload Component
 * Reusable file upload button/area
 *
 * File: src/js/admin/components/Common/FileUpload.jsx
 */




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
  label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload File', 'themeplus'),
  icon = 'fa-file-arrow-up',
  // Can be string (FA class) or React element
  onClick,
  disabled = false,
  variant = 'button',
  size = 'medium',
  className = '',
  description,
  accept,
  multiple = false,
  onFileSelect
}) {
  const fileInputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const [isDragging, setIsDragging] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Handle file input change
  const handleFileChange = e => {
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
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = e => {
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
  const buttonClasses = ['tpo-file-upload', `tpo-file-upload--${variant}`, `tpo-file-upload--${size}`, disabled && 'tpo-file-upload--disabled', isDragging && 'tpo-file-upload--dragging', className].filter(Boolean).join(' ');

  // Render icon based on type
  const renderIcon = () => {
    // If icon is a string, treat as FontAwesome class
    if (typeof icon === 'string') {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: `fa-solid ${icon}`
      });
    }

    // If icon is a React element, render it directly
    return icon;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: buttonClasses,
    onClick: handleClick,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    disabled: disabled
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-file-upload__icon"
  }, renderIcon()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-file-upload__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-file-upload__label"
  }, label), description && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-file-upload__description"
  }, description))), onFileSelect && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: fileInputRef,
    type: "file",
    accept: accept,
    multiple: multiple,
    onChange: handleFileChange,
    style: {
      display: 'none'
    }
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileUpload);

/***/ }),

/***/ "./src/js/admin/components/Common/GradientPicker.jsx":
/*!***********************************************************!*\
  !*** ./src/js/admin/components/Common/GradientPicker.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);

/**
 * Reusable Gradient Picker Component
 * Wrapper around WordPress GradientPicker
 *
 * File: src/js/admin/components/Common/GradientPicker.jsx
 */




function GradientPicker({
  value = '',
  onChange,
  label = '',
  showPreview = true,
  showCopyButton = true,
  showOutput = true
}) {
  const [copied, setCopied] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const handleChange = newGradient => {
    onChange(newGradient);
  };
  const copyCSS = () => {
    const css = `background: ${value};`;
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Predefined gradients
  const presetGradients = [{
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Purple Dream', 'themeplus'),
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Warm Flame', 'themeplus'),
    gradient: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ocean Blue', 'themeplus'),
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Sunset', 'themeplus'),
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Green Beach', 'themeplus'),
    gradient: 'linear-gradient(135deg, #02aab0 0%, #00cdac 100%)'
  }, {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Rose Water', 'themeplus'),
    gradient: 'linear-gradient(135deg, #e96443 0%, #904e95 100%)'
  }];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field--component tpo-gradient-picker-component"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label--depth0 tpo-gradient-picker__label"
  }, label), showPreview && value && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gradient-picker__preview-large"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gradient-picker__preview-box",
    style: {
      background: value
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-gradient-picker__preview-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gradient-picker__wordpress"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.GradientPicker, {
    value: value || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    onChange: handleChange,
    gradients: presetGradients,
    clearable: false,
    disableCustomGradients: false
  })), value && (showCopyButton || showOutput) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gradient-picker__actions"
  }, showCopyButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    onClick: copyCSS,
    icon: copied ? 'yes' : 'clipboard'
  }, copied ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copied!', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copy CSS', 'themeplus')), showOutput && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gradient-picker__output"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
    className: "tpo-gradient-picker__css"
  }, value))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GradientPicker);

/***/ }),

/***/ "./src/js/admin/components/Common/IconPickerModal.jsx":
/*!************************************************************!*\
  !*** ./src/js/admin/components/Common/IconPickerModal.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/icons */ "./src/js/admin/data/icons.js");
/* harmony import */ var _Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useScrollbar */ "./src/js/admin/hooks/useScrollbar.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Icon Picker Modal Component
 * FontAwesome only, extensible later
 *
 * File: src/js/admin/components/Common/IconPickerModal.jsx
 */







function IconPickerModal({
  isOpen,
  onClose,
  onSelect,
  selectedIcon = ''
}) {
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [selectedCategories, setSelectedCategories] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(['all']);

  // Scrollbar hook for body
  const {
    scrollRef: bodyRef,
    scrollbarClass: bodyScrollClass
  } = (0,_hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_5__["default"])({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: isOpen
  });

  // Reset state when modal closes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedCategories(['all']);
    }
  }, [isOpen]);

  // Filter icons when search or categories change
  const filteredIcons = (() => {
    let filtered = _data_icons__WEBPACK_IMPORTED_MODULE_3__.icons;

    // Filter by search
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(icon => icon.name.toLowerCase().includes(searchLower) || icon.id.toLowerCase().includes(searchLower));
    }

    // Filter by categories (if not searching)
    if (!searchQuery && !selectedCategories.includes('all') && selectedCategories.length > 0) {
      filtered = filtered.filter(icon => selectedCategories.includes(icon.category));
    }
    return filtered;
  })();

  // Handle category selection with proper "All" logic
  const handleCategoryChange = categories => {
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
  const handleSelect = icon => {
    onSelect(icon); // Pass full icon object with 'class' property
    onClose();
  };

  // Close on Escape key
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  // Prepare category options for Select component
  const categoryOptions = _data_icons__WEBPACK_IMPORTED_MODULE_3__.iconCategories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__overlay",
    onClick: onClose
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__container"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "tpo-icon-picker-modal__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Icon', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    color: "muted",
    size: "small",
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close modal', 'themeplus'),
    onClick: onClose
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "tpo-icon-picker-modal__search-input",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search icons...', 'themeplus'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    autoFocus: true
  }), searchQuery && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    color: "muted",
    size: "small",
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear search', 'themeplus'),
    onClick: () => setSearchQuery('')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }))), !searchQuery && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__categories"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Select__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: selectedCategories,
    onChange: handleCategoryChange,
    options: categoryOptions,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Filter by categories...', 'themeplus'),
    multiple: true,
    searchable: false,
    clearable: false,
    className: "tpo-icon-picker-modal__category-select"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: bodyRef,
    className: `tpo-icon-picker-modal__body tpo-field-card-alt ${bodyScrollClass}`
  }, filteredIcons.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__grid"
  }, filteredIcons.map(icon => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: icon.id,
    type: "button",
    className: `tpo-icon-picker-modal__icon ${selectedIcon === icon.id ? 'selected' : ''}`,
    onClick: () => handleSelect(icon),
    title: icon.name
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: icon.class
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-icon-picker-modal__icon-name"
  }, icon.name)))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-icon-picker-modal__empty-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-magnifying-glass"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-icon-picker-modal__empty-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No icons found', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-picker-modal__footer-info"
  }, filteredIcons.length, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('icons', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    color: "secondary",
    onClick: onClose
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close', 'themeplus')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconPickerModal);

/***/ }),

/***/ "./src/js/admin/components/Common/Modal.jsx":
/*!**************************************************!*\
  !*** ./src/js/admin/components/Common/Modal.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useScrollbar */ "./src/js/admin/hooks/useScrollbar.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Modal Component
 * Custom modal with full accessibility and footer support
 *
 * File: src/js/admin/components/Common/Modal.jsx
 */





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
  size = 'medium' // small, medium, large, full
}) {
  const modalRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const previousActiveElement = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);

  // Scrollbar hook for body
  const {
    scrollRef: bodyRef,
    scrollbarClass: bodyScrollClass
  } = (0,_hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__["default"])({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: isOpen
  });

  // Handle ESC key
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleEscape = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management and body scroll lock
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
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
  const handleOverlayClick = e => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };
  const modalContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-modal-overlay",
    onClick: handleOverlayClick
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: modalRef,
    className: `tpo-modal tpo-modal--${size} ${showFooter ? 'tpo-modal--has-footer' : ''} ${className}`,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "tpo-modal-title",
    tabIndex: -1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-modal__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    id: "tpo-modal-title",
    className: "tpo-modal__title"
  }, title), showCloseButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    style: "plain",
    color: "muted",
    size: "small",
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close modal', 'themeplus'),
    onClick: onClose
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: bodyRef,
    className: `tpo-modal__body tpo-field-card-alt ${bodyScrollClass}`
  }, children), showFooter && footer && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-modal__footer"
  }, footer)));

  // Render in portal
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createPortal)(modalContent, document.body);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./src/js/admin/components/Common/Notice.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/Common/Notice.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Notice Component
 * Reusable notice/alert component with dismiss functionality
 *
 * File: src/js/admin/components/Common/Notice.jsx
 */





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
  title
}) {
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true);

  // Auto-dismiss timer
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
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
    danger: 'fa-circle-exclamation'
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-notice tpo-notice--${status} ${className}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-notice__icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa-solid ${icons[status]}`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-notice__content"
  }, title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-notice__title"
  }, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-notice__text"
  }, children)), isDismissible && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-notice__dismiss"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "small",
    className: "tpo-button--small-dismiss",
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dismiss notice', 'themeplus'),
    onClick: handleDismiss
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notice);

/***/ }),

/***/ "./src/js/admin/components/Common/Preloader.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Common/Preloader.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PreloaderLogo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PreloaderLogo */ "./src/js/admin/components/Common/PreloaderLogo.jsx");

/**
 * ThemePlus Preloader Component
 *
 * File: src/js/admin/components/Common/Preloader.jsx
 */



function Preloader({
  message = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading...', 'themeplus'),
  variant = 'animated',
  // animated, simple, spin
  overlay = true,
  size = 120
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-preloader ${overlay ? 'tpo-preloader--overlay' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-preloader__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_PreloaderLogo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    size: size,
    className: `tpo-preloader-logo--${variant}`
  }), message && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-preloader__message"
  }, message)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Preloader);

/***/ }),

/***/ "./src/js/admin/components/Common/PreloaderLogo.jsx":
/*!**********************************************************!*\
  !*** ./src/js/admin/components/Common/PreloaderLogo.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Animated Logo Preloader
 * SVG with gradient background
 *
 * File: src/js/admin/components/Common/PreloaderLogo.jsx
 */

function PreloaderLogo({
  size = 120,
  className = ''
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1061.84 1061.84",
    width: size,
    height: size,
    className: `tpo-preloader-logo ${className}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("defs", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("radialGradient", {
    id: "tpo-preloader-gradient",
    cx: "98.72",
    cy: "69.76",
    r: "1224.31",
    fx: "98.72",
    fy: "69.76",
    gradientUnits: "userSpaceOnUse"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
    offset: "0",
    stopColor: "#fff"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("stop", {
    offset: "1",
    stopColor: "#e5def9"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__bg-gradient",
    fill: "url(#tpo-preloader-gradient)",
    d: "M996.01 247.58c-24.13-88.39-93.36-157.61-181.75-181.75-184.77-50.45-381.9-50.45-566.68 0-88.39 24.13-157.61 93.36-181.75 181.75-50.45 184.77-50.45 381.9 0 566.68 24.13 88.39 93.36 157.61 181.75 181.75 184.77 50.45 381.9 50.45 566.68 0 88.39-24.13 157.61-93.36 181.75-181.75 50.45-184.77 50.45-381.9 0-566.68"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__border",
    fill: "#fff",
    d: "M1023.02 240.21c-13.12-48.06-38.71-92.11-73.99-127.39s-79.34-60.87-127.39-73.99C727.28 13.06 629.47 0 530.92 0S334.57 13.06 240.21 38.82c-48.06 13.12-92.11 38.71-127.39 73.99S51.95 192.15 38.83 240.2C13.06 334.57 0 432.38 0 530.92s13.06 196.35 38.82 290.71c13.12 48.06 38.71 92.11 73.99 127.39s79.34 60.87 127.39 73.99c94.36 25.76 192.17 38.82 290.71 38.82s196.35-13.06 290.71-38.82c48.06-13.12 92.11-38.71 127.39-73.99s60.87-79.34 73.99-127.39c25.76-94.36 38.82-192.17 38.82-290.71s-13.06-196.35-38.82-290.71Zm-27.01 574.05c-24.13 88.39-93.36 157.61-181.75 181.75-92.39 25.22-187.86 37.84-283.34 37.84s-190.95-12.61-283.34-37.84c-88.39-24.13-157.61-93.36-181.75-181.75-50.45-184.77-50.45-381.9 0-566.68 24.13-88.39 93.36-157.61 181.75-181.75 92.39-25.22 187.86-37.84 283.34-37.84S721.87 40.6 814.26 65.83c88.39 24.13 157.61 93.36 181.75 181.75 50.45 184.77 50.45 381.9 0 566.68"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__yellow",
    fill: "#ffce7b",
    d: "M546.18 431.3c-65.32 161.31-189.31 262.63-169.31 85.32s183.97-399.94 199.97-327.95c0 0 34.66 81.32-30.66 242.63"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__cyan",
    fill: "#20bec6",
    d: "M927.46 668.6s-64.45 176.79-437.27 103.47c0 0 61.35-216.32 215.97-296.77 108.54-56.48 291.96 22.66 221.3 193.3"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__dark",
    fill: "#171c4c",
    d: "M919.99 480.53c-19.3-34.48-52.34-60.56-93.03-73.43-43.74-13.84-91.36-11-137.74 8.19-5.9 2.24-57.41 23.18-120.81 92.48-38.06 41.6-72.93 92.42-103.65 151.05-4.09 7.8-8.1 15.75-12.05 23.83-30.78-13.95-54.66-32.47-71.58-55.45 47.5-62.43 91.17-149.67 107.59-183.95 27.52-57.45 51.07-115.53 66.32-163.52 6.54-20.59 26.44-83.23 16.54-114.89-5.68-18.18-20.58-27.05-38.88-23.16-40.7 8.65-95.66 74.46-130.35 128.19-23.38 36.2-43.49 75.27-58.17 112.98-17.03 43.76-26.86 85.43-29.22 123.84-2.74 44.69 4.69 84.25 22.12 117.81-15.47 17.97-29.16 29.86-40.09 34.44-34.16 14.31-69.11 9.5-103.87-14.28-27.67-18.92-44.83-43.13-45-43.37l-14.75 10.32 14.77-10.29-29.54 20.57c.82 1.18 20.48 29.12 53.21 51.8 45.14 31.27 93.24 37.65 139.09 18.45 14.98-6.27 30.79-19.37 46.61-36.53 20.01 24.6 46.78 44.57 80 59.67-26.28 59.24-48.89 125.15-67.45 196.74l34.85 9.04c18.31-70.61 40.61-135.44 66.52-193.45 16.55 3.47 69.63 13.5 135.4 14.85 46.08.96 88.81-2.6 127.02-10.56 48.6-10.12 90.09-27.45 123.31-51.52 39.19-28.39 65.22-62.87 75.29-99.72 9.22-33.75 4.8-69.32-12.46-100.15Zm-557.9 111.81c-9.36-24.29-13.1-52.13-11.18-83.45 4.01-65.29 33.79-145.3 81.7-219.5 20.13-31.18 41.84-58.8 62.77-79.87 22.79-22.94 36.41-29.85 42.33-31.91 1.48 7.95 2.33 33.56-20.46 101.94-23.81 71.43-64.52 161.54-106.26 235.17-16.87 29.75-33.41 55.94-48.89 77.63Zm535.64-21.15c-7.88 28.85-29.21 56.53-61.68 80.05-36.61 26.52-105.85 57.66-227.75 55.25-53.87-1.05-99.68-8.43-121.07-12.46 2.72-5.5 5.47-10.93 8.26-16.29 28.97-55.69 61.72-103.91 97.33-143.31 31.57-34.94 59.6-56.33 77.55-68.12 19.42-12.76 31.54-17.33 31.58-17.35l.79-.31c48.68-20.22 88.52-15.1 113.37-7.24 31.46 9.95 57.88 30.62 72.47 56.69 12.8 22.87 15.96 48.14 9.15 73.08Z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__triangle-bg",
    fill: "#fff",
    d: "m500.26 292.54-30.53 35.43L336.75 482.3l-53.31 61.87 5.93-81.46 7.21-99.04-67.3-73.03-55.35-60.06 80.24 15.23 200.14 38 45.94 8.72Z"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    className: "tpo-preloader-logo__pink",
    fill: "#f05b89",
    d: "m316.3 464.67 8.06-110.7-75.22-81.62 200.14 38L316.3 464.68Z"
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PreloaderLogo);

/***/ }),

/***/ "./src/js/admin/components/Common/Radio.jsx":
/*!**************************************************!*\
  !*** ./src/js/admin/components/Common/Radio.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Reusable Radio Component
 *
 * File: src/js/admin/components/Common/Radio.jsx
 */

function Radio({
  id,
  name,
  value,
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'medium',
  // 'small' | 'medium' | 'large'
  className = ''
}) {
  const sizeClass = `tpo-radio--${size}`;
  const disabledClass = disabled ? 'tpo-radio--disabled' : '';
  const checkedClass = checked ? 'tpo-radio--checked' : '';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: `tpo-radio ${sizeClass} ${disabledClass} ${checkedClass} ${className}`.trim()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: e => onChange(e.target.value),
    disabled: disabled,
    className: "tpo-radio__input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-radio__indicator"
  }), label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-radio__label"
  }, label));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Radio);

/***/ }),

/***/ "./src/js/admin/components/Common/SearchResults.jsx":
/*!**********************************************************!*\
  !*** ./src/js/admin/components/Common/SearchResults.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_SettingsContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/SettingsContext */ "./src/js/admin/context/SettingsContext.jsx");
/* harmony import */ var _FieldRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FieldRenderer */ "./src/js/admin/components/Common/FieldRenderer.jsx");
/* harmony import */ var _utils_fieldHelpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/fieldHelpers */ "./src/js/admin/utils/fieldHelpers.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Search Results Component
 *
 * File: src/js/admin/components/Common/SearchResults.jsx
 */







function SearchResults({
  searchQuery,
  sections,
  onClearSearch
}) {
  const {
    options,
    setOptions
  } = (0,_context_SettingsContext__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
  const [searching, setSearching] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [matchingFields, setMatchingFields] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const matchesField = (field, query) => {
    const searchableText = [field.title || '', field.subtitle || '', field.desc || '', field.id || ''].join(' ').toLowerCase();
    return searchableText.includes(query);
  };
  const performSearch = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setMatchingFields([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const matches = [];
      sections.forEach(section => {
        section.fields?.forEach(field => {
          if (matchesField(field, query)) {
            matches.push({
              field,
              section: section.title,
              subsection: null
            });
          }
        });
        section.subsections?.forEach(subsection => {
          subsection.fields?.forEach(field => {
            if (matchesField(field, query)) {
              matches.push({
                field,
                section: section.title,
                subsection: subsection.title
              });
            }
          });
        });
      });
      setMatchingFields(matches);
      setSearching(false);
    }, 100);
  }, [searchQuery, sections]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    performSearch();
  }, [performSearch]);
  if (searching) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-search-results"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-search-results__loading"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-search-results__loading-spinner"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-gear"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Searching...', 'themeplus'))));
  }
  if (!searchQuery || searchQuery.length < 2) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results__header tpo-field-has-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results__info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-search-results__count"
  }, matchingFields.length === 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No results found', 'themeplus') : `${matchingFields.length} ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('field(s) found for', 'themeplus')} "${searchQuery}"`)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    color: "secondary",
    onClick: onClearSearch
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear Search', 'themeplus'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }))), matchingFields.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results__list"
  }, matchingFields.map(match => {
    if (!(0,_utils_fieldHelpers__WEBPACK_IMPORTED_MODULE_5__.shouldShowField)(match.field, options)) {
      return null;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: match.field.id,
      className: "tpo-search-results__item tpo-field-card"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-search-results__breadcrumb"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-search-results__breadcrumb-text"
    }, match.section, match.subsection && ` › ${match.subsection}`)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-search-results__field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_FieldRenderer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      field: match.field,
      value: options[match.field.id],
      onUpdate: newValue => {
        setOptions(prev => ({
          ...prev,
          [match.field.id]: newValue
        }));
      }
    })));
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results__empty-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-magnifying-glass"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-search-results__empty-text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No fields match your search.', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-results__tips tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-search-results__tips-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-lightbulb"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search Tips:', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "tpo-search-results__tips-list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Try different keywords', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Check your spelling', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use shorter search terms', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Try searching by field name', 'themeplus'))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchResults);

/***/ }),

/***/ "./src/js/admin/components/Common/Select.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/Common/Select.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useScrollbar */ "./src/js/admin/hooks/useScrollbar.js");
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Universal Select Component
 *
 * A fully accessible, keyboard-navigable select component
 * that can be reused anywhere in theme options
 *
 * File: src/js/admin/components/Common/Select.jsx
 */



 // Scrollbar custom hook


/**
 * Normalize options to consistent format
 */
function normalizeOptions(options) {
  if (!options) return [];

  // Already an array
  if (Array.isArray(options)) {
    return options.map(option => {
      if (typeof option === 'object' && option !== null) {
        var _option$value, _ref, _option$label;
        return {
          value: (_option$value = option.value) !== null && _option$value !== void 0 ? _option$value : option,
          label: (_ref = (_option$label = option.label) !== null && _option$label !== void 0 ? _option$label : option.value) !== null && _ref !== void 0 ? _ref : option
        };
      }
      return {
        value: option,
        label: String(option)
      };
    });
  }

  // Object (PHP associative array)
  if (typeof options === 'object') {
    return Object.entries(options).map(([value, label]) => ({
      value,
      label: String(label)
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
  placeholder = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select...', 'themeplus'),
  className = '',
  disabled = false,
  multiple = false,
  clearable = false,
  searchable = null,
  // null = auto-decide
  searchThreshold = 10,
  size = 'default',
  maxHeight = 320 // 8 options × 40px
}) {
  const [isOpen, setIsOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [focusedIndex, setFocusedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(-1);
  const [typeaheadQuery, setTypeaheadQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [typeaheadTimeout, setTypeaheadTimeout] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [dropdownPosition, setDropdownPosition] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('bottom'); // 'top' or 'bottom'

  const selectRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const dropdownRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const searchInputRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const buttonRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const optionRefs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)([]);

  // Scrollbar hook
  const {
    scrollRef: listRef,
    scrollbarClass
  } = (0,_hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__["default"])({
    hideDelay: 1000,
    showOnHover: true,
    isOpen: isOpen // ← Pass isOpen state
  });

  // Normalize options
  const normalizedOptions = normalizeOptions(options);

  // Normalize value for multi-select
  const normalizedValue = multiple ? Array.isArray(value) ? value : [] : value;

  // Auto-determine if search should be shown
  const shouldShowSearch = searchable !== null && searchable !== void 0 ? searchable : normalizedOptions.length >= searchThreshold;

  // Filter options by search query
  const filteredOptions = searchQuery ? normalizedOptions.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase())) : normalizedOptions;

  // Get selected option(s)
  const selectedOption = multiple ? normalizedOptions.filter(opt => normalizedValue.includes(opt.value)) : normalizedOptions.find(opt => opt.value === normalizedValue);
  const selectedLabel = multiple ? null // We'll show badges instead
  : selectedOption?.label || placeholder;

  // Get selected index in filtered list
  const selectedIndex = multiple ? -1 : filteredOptions.findIndex(opt => opt.value === normalizedValue);

  /**
   * Calculate dropdown position (top or bottom)
   * Based on available space in viewport
   */
  const calculateDropdownPosition = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
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
  const closeDropdown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    setIsOpen(false);
    setSearchQuery('');
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  }, []);

  /**
   * Open dropdown
   */
  const openDropdown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
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
  const handleSelect = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(optionValue => {
    if (multiple) {
      const newValue = normalizedValue.includes(optionValue) ? normalizedValue.filter(v => v !== optionValue) : [...normalizedValue, optionValue];
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
  const handleKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(e => {
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
          const nextIndex = focusedIndex < filteredOptions.length - 1 ? focusedIndex + 1 : focusedIndex;
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
          const matchIndex = filteredOptions.findIndex(option => option.label.toLowerCase().startsWith(newQuery));
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
  }, [disabled, isOpen, focusedIndex, filteredOptions, openDropdown, closeDropdown, handleSelect, shouldShowSearch, typeaheadQuery, typeaheadTimeout]);

  /**
   * Recalculate position on scroll/resize
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!isOpen) return;
    const handleClickOutside = e => {
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    return () => {
      if (typeaheadTimeout) {
        clearTimeout(typeaheadTimeout);
      }
    };
  }, [typeaheadTimeout]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: selectRef,
    className: `tpo-select tpo-select--${size} tpo-select--${dropdownPosition} ${isOpen ? 'tpo-select--open' : ''} ${disabled ? 'tpo-select--disabled' : ''} ${className}`,
    onKeyDown: handleKeyDown
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    ref: buttonRef,
    type: "button",
    className: "tpo-select__button",
    onClick: () => isOpen ? closeDropdown() : openDropdown(),
    disabled: disabled,
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen,
    "aria-labelledby": "select-label"
  }, multiple ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-select__badges"
  }, selectedOption.length > 0 ? selectedOption.map(opt => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: opt.value,
    className: "tpo-select__badge"
  }, opt.label, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-select__badge-remove",
    onClick: e => {
      e.stopPropagation();
      handleSelect(opt.value);
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  })))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-select__placeholder"
  }, placeholder)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-select__value"
  }, selectedLabel), clearable && !multiple && value && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "small",
    color: "muted",
    onClick: e => {
      e.stopPropagation();
      onChange('');
    },
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear selection', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `tpo-select__arrow ${isOpen ? 'tpo-select__arrow--open' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-chevron-down"
  }))), isOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: dropdownRef,
    className: "tpo-select__dropdown",
    style: {
      maxHeight: `${maxHeight}px`
    }
  }, shouldShowSearch && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-select__search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    ref: searchInputRef,
    type: "text",
    className: "tpo-select__search-input",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search...', 'themeplus'),
    value: searchQuery,
    onChange: e => {
      setSearchQuery(e.target.value);
      setFocusedIndex(0); // Reset focus to first result
    },
    onClick: e => e.stopPropagation(),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search options', 'themeplus')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    ref: listRef,
    className: `tpo-select__list tpo-field-card-alt ${scrollbarClass}`,
    role: "listbox",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select options', 'themeplus')
  }, filteredOptions.length > 0 ? filteredOptions.map((option, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: option.value,
    ref: el => optionRefs.current[index] = el,
    className: `tpo-select__option ${multiple ? normalizedValue.includes(option.value) ? 'tpo-select__option--selected' : '' : value === option.value ? 'tpo-select__option--selected' : ''} ${focusedIndex === index ? 'tpo-select__option--focused' : ''}`,
    onClick: () => handleSelect(option.value),
    onMouseEnter: () => setFocusedIndex(index),
    role: "option",
    "aria-selected": multiple ? normalizedValue.includes(option.value) : value === option.value
  }, option.label, (multiple ? normalizedValue.includes(option.value) : value === option.value) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-select__checkmark",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-circle-check"
  })))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "tpo-select__option tpo-select__option--empty"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No options found', 'themeplus'))), multiple && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-select__actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-select__bulk-actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "secondary",
    size: "small",
    onClick: () => {
      const allValues = filteredOptions.map(opt => opt.value);
      onChange(allValues);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select All', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "muted",
    size: "small",
    onClick: () => onChange([])
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deselect All', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "success",
    size: "small",
    onClick: closeDropdown
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Done', 'themeplus'))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Select);

/***/ }),

/***/ "./src/js/admin/components/Common/Spinner.jsx":
/*!****************************************************!*\
  !*** ./src/js/admin/components/Common/Spinner.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * ThemePlus Spinner Component - Reusable Number Input with +/- Buttons
 *
 * File: src/js/admin/components/Common/Spinner.jsx
 */



/**
 * Round number to specific decimal places
 * JavaScript floating point precision
 */
const roundToStep = (value, step) => {
  const decimals = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimals));
};

/**
 * Spinner Component
 *
 * @param {Object} props
 * @param {number} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {number} props.min - Minimum value (default: 0)
 * @param {number} props.max - Maximum value (default: 100)
 * @param {number} props.step - Step increment (default: 1)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.unit - Unit label (px, em, %, etc)
 * @param {string} props.className - Additional CSS class
 * @param {boolean} props.disabled - Disabled state
 */
function Spinner({
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  placeholder = '',
  unit = '',
  className = '',
  disabled = false
}) {
  const handleIncrement = () => {
    if (disabled) return;
    const rawValue = Number(value) + step;
    const clampedValue = Math.min(rawValue, max);
    const roundedValue = roundToStep(clampedValue, step);
    onChange(roundedValue);
  };
  const handleDecrement = () => {
    if (disabled) return;
    const rawValue = Number(value) - step;
    const clampedValue = Math.max(rawValue, min);
    const roundedValue = roundToStep(clampedValue, step);
    onChange(roundedValue);
  };
  const handleInputChange = e => {
    if (disabled) return;
    let newValue = e.target.value;

    // Allow empty string for user to type
    if (newValue === '') {
      onChange('');
      return;
    }

    // Allow negative sign for typing
    if (newValue === '-') {
      onChange('-');
      return;
    }
    newValue = Number(newValue);

    // Invalid number
    if (isNaN(newValue)) {
      return;
    }

    // Clamp value between min and max
    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    // Round to step precision
    const roundedValue = roundToStep(newValue, step);
    onChange(roundedValue);
  };
  const handleBlur = () => {
    // If empty or invalid on blur, set to min value
    if (value === '' || value === '-' || value === null || value === undefined || isNaN(value)) {
      onChange(min);
      return;
    }

    // Round to step precision on blur
    const roundedValue = roundToStep(Number(value), step);
    onChange(roundedValue);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-spinner ${className}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spinner__field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-spinner__button tpo-spinner__button--decrement",
    onClick: handleDecrement,
    disabled: disabled || value <= min,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Decrease', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-minus"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    className: "tpo-spinner__input",
    value: value,
    onChange: handleInputChange,
    onBlur: handleBlur,
    min: min,
    max: max,
    step: step,
    placeholder: placeholder,
    disabled: disabled,
    autoComplete: "off"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-spinner__button tpo-spinner__button--increment",
    onClick: handleIncrement,
    disabled: disabled || value >= max,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Increase', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-plus"
  }))), unit && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spinner__unit-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-spinner__unit tpo-field-unit"
  }, unit)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./src/js/admin/components/Common/TextInput.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Common/TextInput.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus TextInput Component
 * Reusable text input for forms and fields
 *
 * File: src/js/admin/components/Common/TextInput.jsx
 */

/**
 * TextInput Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Input ID
 * @param {string} props.label Input label
 * @param {string} props.value Input value
 * @param {Function} props.onChange Change handler
 * @param {string} props.type Input type (text, email, url, number, password, etc)
 * @param {string} props.placeholder Placeholder text
 * @param {string} props.help Help text below input
 * @param {boolean} props.required Required field
 * @param {boolean} props.disabled Disabled state
 * @param {string} props.size Input size (small, medium, large)
 * @param {boolean} props.fullWidth Full width input
 * @param {React.ReactNode} props.prefix Prefix icon or text
 * @param {React.ReactNode} props.suffix Suffix icon or button
 * @param {string} props.className Additional CSS classes
 * @param {number} props.maxLength Maximum character length
 * @param {string} props.pattern HTML5 pattern validation
 * @param {string} props.autoComplete Autocomplete attribute
 */
function TextInput({
  id,
  label,
  value = '',
  onChange,
  type = 'text',
  placeholder = '',
  help = '',
  required = false,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  prefix,
  suffix,
  className = '',
  maxLength,
  pattern,
  autoComplete,
  ...props
}) {
  const inputClasses = ['tpo-text-input', `tpo-text-input--${size}`, fullWidth && 'tpo-text-input--full-width', disabled && 'tpo-text-input--disabled', prefix && 'tpo-text-input--has-prefix', suffix && 'tpo-text-input--has-suffix', className].filter(Boolean).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-text-input-wrapper"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label tpo-text-input__label"
  }, label, required && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-field__required tpo-text-input__required"
  }, "*"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body tpo-text-input__container"
  }, prefix && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-text-input__prefix"
  }, prefix), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    type: type,
    className: inputClasses,
    value: value || '',
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    maxLength: maxLength,
    pattern: pattern,
    autoComplete: autoComplete,
    ...props
  }), suffix && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-text-input__suffix"
  }, suffix)), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-text-input__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextInput);

/***/ }),

/***/ "./src/js/admin/components/DevPanel/DevFieldCard.jsx":
/*!***********************************************************!*\
  !*** ./src/js/admin/components/DevPanel/DevFieldCard.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Developer Field Card
 *
 * File: src/js/admin/components/DevPanel/DevFieldCard.jsx
 */




function DevFieldCard({
  field
}) {
  const [showUsage, setShowUsage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [copied, setCopied] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Format value as PHP array syntax
  const formatValue = value => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    try {
      return formatAsPhpArray(value, 0);
    } catch (e) {
      return String(value);
    }
  };

  // Format as PHP array (not JSON)
  const formatAsPhpArray = (value, indent = 0) => {
    const indentStr = '  '.repeat(indent);
    const nextIndent = '  '.repeat(indent + 1);
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      const items = value.map(item => nextIndent + formatAsPhpArray(item, indent + 1)).join(',\n');
      return `[\n${items}\n${indentStr}]`;
    }
    if (typeof value === 'object' && value !== null) {
      const keys = Object.keys(value);
      if (keys.length === 0) return '[]';
      const items = keys.map(key => {
        const formattedKey = `'${key}'`;
        const formattedValue = formatAsPhpArray(value[key], indent + 1);
        return `${nextIndent}${formattedKey} => ${formattedValue}`;
      }).join(',\n');
      return `[\n${items}\n${indentStr}]`;
    }
    if (typeof value === 'string') return `'${value}'`;
    if (value === null) return 'null';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return String(value);
  };

  // Format dependency for display
  const formatDependency = dependency => {
    if (!dependency) return null;
    if (dependency.field && dependency.operator && dependency.value !== undefined) {
      const valueStr = typeof dependency.value === 'string' ? `"${dependency.value}"` : String(dependency.value);
      return `${dependency.field} ${dependency.operator} ${valueStr}`;
    }
    return formatAsPhpArray(dependency, 0);
  };
  const showUsageButton = field.show_usage !== false;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-card tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-card__title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
    className: "tpo-dev-card__id"
  }, field.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-card__type"
  }, field.type)), showUsageButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "secondary",
    onClick: () => setShowUsage(!showUsage)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa-solid fa-${showUsage ? 'eye-slash' : 'file-code'}`
  }), showUsage ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hide Usage', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Usage', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-card__meta"
  }, field.title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-meta-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-meta-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Title:', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, field.title)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-meta-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-meta-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Section:', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, field.section_title, field.subsection_title && ` → ${field.subsection_title}`)), showUsageButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-meta-row tpo-dev-meta-row--vertical"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-meta-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Current Value:', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", {
    className: "tpo-dev-value tpo-dev-value--formatted"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, formatValue(field.current_value))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-type"
  }, "(", field.value_type, ")")), showUsageButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-meta-row tpo-dev-meta-row--vertical"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-meta-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Value:', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", {
    className: "tpo-dev-value tpo-dev-value--formatted"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, formatValue(field.default_value)))), field.dependency && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-meta-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-dev-meta-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Depends on:', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", {
    className: "tpo-dev-value"
  }, formatDependency(field.dependency)))), showUsage && field.usage && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-usage"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Usage Examples', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-star"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bulk Access (Recommended for Multiple Fields)', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "muted",
    size: "small",
    onClick: () => copy(field.usage.bulk, 'bulk')
  }, copied === 'bulk' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copied!', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, field.usage.bulk))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Single Field Access', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "muted",
    size: "small",
    onClick: () => copy(field.usage.helper, 'helper')
  }, copied === 'helper' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copied!', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, field.usage.helper))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('In Template File', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "muted",
    size: "small",
    onClick: () => copy(field.usage.template, 'template')
  }, copied === 'template' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copied!', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, field.usage.template))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-code__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Direct Access (Advanced)', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "muted",
    size: "small",
    onClick: () => copy(field.usage.direct, 'direct')
  }, copied === 'direct' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copied!', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("code", null, field.usage.direct)))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DevFieldCard);

/***/ }),

/***/ "./src/js/admin/components/DevPanel/DevPanel.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/DevPanel/DevPanel.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _DevFieldCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DevFieldCard */ "./src/js/admin/components/DevPanel/DevFieldCard.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Developer Panel
 *
 * File: src/js/admin/components/DevPanel/DevPanel.jsx
 */







function DevPanel() {
  const [data, setData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [filters, setFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    type: 'all',
    section: 'all',
    search: ''
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    loadData();
  }, []);
  async function loadData() {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/themeplus/v1/dev-panel'
      });
      setData(response);
    } catch (error) {
      console.error('Dev panel error:', error);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-loading"
  }, "Loading...");
  if (!data) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-error"
  }, "Failed to load");

  // Get unique types
  const types = [{
    value: 'all',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All Types', 'themeplus')
  }, ...Array.from(new Set(data.fields.map(f => f.type))).map(type => ({
    value: type,
    label: type
  }))];

  // Get unique sections
  const uniqueSections = {};
  data.fields.forEach(field => {
    if (!uniqueSections[field.section_id]) {
      uniqueSections[field.section_id] = field.section_title;
    }
  });
  const sections = [{
    value: 'all',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All Sections', 'themeplus')
  }, ...Object.entries(uniqueSections).map(([id, title]) => ({
    value: id,
    label: title
  }))];

  // Filter fields
  const filtered = data.fields.filter(field => {
    // Type filter
    if (filters.type !== 'all' && field.type !== filters.type) {
      return false;
    }

    // Section filter
    if (filters.section !== 'all' && field.section_id !== filters.section) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchable = [field.id, field.title, field.subtitle, field.type, field.section_title].filter(Boolean).join(' ').toLowerCase();
      if (!searchable.includes(search)) {
        return false;
      }
    }
    return true;
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-header__title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Field reference and usage examples', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-badge"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-bug"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('DEV MODE', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stats"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat__value"
  }, data.statistics.total_fields), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Total Fields', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat__value"
  }, data.statistics.total_sections), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sections', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat__value"
  }, Object.keys(data.statistics.by_type).length), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-stat__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Field Types', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-filters"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-search-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-magnifying-glass tpo-dev-search-icon"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "tpo-dev-search",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search by field ID, title, type...', 'themeplus'),
    value: filters.search,
    onChange: e => setFilters({
      ...filters,
      search: e.target.value
    })
  }), filters.search && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
    color: "muted",
    size: "small",
    iconOnly: true,
    onClick: () => setFilters({
      ...filters,
      search: ''
    }),
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Clear search', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: filters.type,
    options: types,
    onChange: value => setFilters({
      ...filters,
      type: value
    }),
    className: "tpo-dev-select"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: filters.section,
    options: sections,
    onChange: value => setFilters({
      ...filters,
      section: value
    }),
    className: "tpo-dev-select"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-results"
  }, filtered.length, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('of', 'themeplus'), " ", data.fields.length)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-fields"
  }, filtered.length > 0 ? filtered.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DevFieldCard__WEBPACK_IMPORTED_MODULE_5__["default"], {
    key: field.id,
    field: field
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dev-empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-search"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No fields found matching your filters', 'themeplus')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DevPanel);

/***/ }),

/***/ "./src/js/admin/components/Fields/BackgroundField.jsx":
/*!************************************************************!*\
  !*** ./src/js/admin/components/Fields/BackgroundField.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_ButtonSet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/ButtonSet */ "./src/js/admin/components/Common/ButtonSet.jsx");
/* harmony import */ var _Common_ColorPickerButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/ColorPickerButton */ "./src/js/admin/components/Common/ColorPickerButton.jsx");
/* harmony import */ var _ImageField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ImageField */ "./src/js/admin/components/Fields/ImageField.jsx");
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _Common_GradientPicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Common/GradientPicker */ "./src/js/admin/components/Common/GradientPicker.jsx");

/**
 * ThemePlus Background Field
 * Supports dynamic options: color, image, gradient, etc.
 *
 * File: src/js/admin/components/Fields/BackgroundField.jsx
 */








function BackgroundField({
  id,
  label,
  value = {},
  onChange,
  help = '',
  // Dynamic options
  color = true,
  image = false,
  gradient = false,
  // Image options (only if image = true)
  position = true,
  size = true,
  repeat = true,
  attachment = true
}) {
  // Determine available modes
  const availableModes = [];
  if (color) availableModes.push({
    value: 'color',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'themeplus')
  });
  if (image) availableModes.push({
    value: 'image',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Image', 'themeplus')
  });
  if (gradient) availableModes.push({
    value: 'gradient',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Gradient', 'themeplus')
  });

  // If no modes specified, default to color
  const modes = availableModes.length > 0 ? availableModes : [{
    value: 'color',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'themeplus')
  }];
  const [activeMode, setActiveMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(value.mode || modes[0].value);
  const handleChange = (key, val) => {
    onChange({
      ...value,
      [key]: val,
      mode: activeMode
    });
  };
  const handleModeChange = mode => {
    setActiveMode(mode);
    onChange({
      ...value,
      mode: mode
    });
  };

  // Background size options
  const sizeOptions = {
    cover: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cover', 'themeplus'),
    contain: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Contain', 'themeplus'),
    auto: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Auto', 'themeplus')
  };

  // Background repeat options
  const repeatOptions = {
    'no-repeat': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No Repeat', 'themeplus'),
    repeat: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat', 'themeplus'),
    'repeat-x': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat X', 'themeplus'),
    'repeat-y': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat Y', 'themeplus')
  };

  // Background attachment options
  const attachmentOptions = {
    scroll: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Scroll', 'themeplus'),
    fixed: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fixed', 'themeplus')
  };

  // Background position options
  const positionOptions = {
    'left top': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left Top', 'themeplus'),
    'left center': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left Center', 'themeplus'),
    'left bottom': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left Bottom', 'themeplus'),
    'center top': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center Top', 'themeplus'),
    'center center': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center', 'themeplus'),
    'center bottom': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Center Bottom', 'themeplus'),
    'right top': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right Top', 'themeplus'),
    'right center': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right Center', 'themeplus'),
    'right bottom': (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right Bottom', 'themeplus')
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--background"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-background tpo-field-card"
  }, modes.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-background__modes"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ButtonSet__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Type', 'themeplus'),
    value: activeMode,
    onChange: handleModeChange,
    options: modes
  })), activeMode === 'color' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-background__color tpo-field--depth0"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label--depth0 tpo-background__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Color', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ColorPickerButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: value.color || '#ffffff',
    onChange: val => handleChange('color', val)
  })), activeMode === 'image' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__options tpo-background__image-options"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field--depth0 tpo-background__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label--depth0 tpo-background__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Image', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ImageField__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: `${id}_image`,
    value: value.image || '',
    onChange: val => handleChange('image', val)
  })), position && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field--depth0 tpo-background__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label--depth0 tpo-background__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Position', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: value.position || 'center center',
    onChange: val => handleChange('position', val),
    options: Object.entries(positionOptions).map(([val, label]) => ({
      value: val,
      label: label
    }))
  })), size && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field--depth0 tpo-background__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ButtonSet__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Size', 'themeplus'),
    value: value.size || 'cover',
    onChange: val => handleChange('size', val),
    options: sizeOptions
  })), repeat && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field--depth0 tpo-background__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label--depth0 tpo-background__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Repeat', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: value.repeat || 'no-repeat',
    onChange: val => handleChange('repeat', val),
    options: Object.entries(repeatOptions).map(([val, label]) => ({
      value: val,
      label: label
    }))
  })), attachment && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field--depth0 tpo-background__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ButtonSet__WEBPACK_IMPORTED_MODULE_3__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Attachment', 'themeplus'),
    value: value.attachment || 'scroll',
    onChange: val => handleChange('attachment', val),
    options: attachmentOptions
  }))), activeMode === 'gradient' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-background__gradient"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_GradientPicker__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Background Gradient', 'themeplus'),
    value: value.gradient || '',
    onChange: val => handleChange('gradient', val),
    showPreview: true,
    showCopyButton: false,
    showOutput: false
  })))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackgroundField);

/***/ }),

/***/ "./src/js/admin/components/Fields/BorderField.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Fields/BorderField.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _Common_ColorPickerButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/ColorPickerButton */ "./src/js/admin/components/Common/ColorPickerButton.jsx");
/* harmony import */ var _Common_Spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Spinner */ "./src/js/admin/components/Common/Spinner.jsx");

/**
 * ThemePlus Border Field
 *
 * File: src/js/admin/components/Fields/BorderField.jsx
 */





function BorderField({
  id,
  label,
  value = {},
  onChange,
  help = ''
}) {
  var _value$width, _value$radius;
  const border = {
    width: (_value$width = value.width) !== null && _value$width !== void 0 ? _value$width : 4,
    style: value.style || 'solid',
    color: value.color || '#9097ad',
    radius: (_value$radius = value.radius) !== null && _value$radius !== void 0 ? _value$radius : 8
  };
  const updateBorder = (key, val) => {
    const newBorder = {
      ...border,
      [key]: val
    };
    onChange(newBorder);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--border"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border__controls"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-border__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Width', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: border.width,
    onChange: val => updateBorder('width', val),
    min: 0,
    max: 20,
    step: 1,
    unit: "px"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-border__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Style', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_2__["default"], {
    value: border.style,
    onChange: val => updateBorder('style', val),
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Solid', 'themeplus'),
      value: 'solid'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dashed', 'themeplus'),
      value: 'dashed'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Dotted', 'themeplus'),
      value: 'dotted'
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Double', 'themeplus'),
      value: 'double'
    }],
    className: "tpo-border__select"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-border__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Color', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ColorPickerButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: border.color,
    onChange: color => updateBorder('color', color),
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pick border color', 'themeplus')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-border__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Radius', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: border.radius,
    onChange: val => updateBorder('radius', val),
    min: 0,
    max: 100,
    step: 1,
    unit: "px"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-border__preview",
    style: {
      borderWidth: `${border.width}px`,
      borderStyle: border.style,
      borderColor: border.color,
      borderRadius: `${border.radius}px`
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'themeplus')))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BorderField);

/***/ }),

/***/ "./src/js/admin/components/Fields/ButtonSet.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Fields/ButtonSet.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_ButtonSet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/ButtonSet */ "./src/js/admin/components/Common/ButtonSet.jsx");

/**
 * ThemePlus ButtonSet Field
 *
 * File: src/js/admin/components/Fields/ButtonSet.jsx
 */


function ButtonSetField({
  id,
  label,
  value,
  onChange,
  options = [],
  help = ''
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--buttonset"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ButtonSet__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: value,
    onChange: onChange,
    options: options,
    showLabel: false
  })), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonSetField);

/***/ }),

/***/ "./src/js/admin/components/Fields/CheckboxField.jsx":
/*!**********************************************************!*\
  !*** ./src/js/admin/components/Fields/CheckboxField.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Checkbox */ "./src/js/admin/components/Common/Checkbox.jsx");

/**
 * ThemePlus Checkbox Field
 *
 * File: src/js/admin/components/Fields/CheckboxField.jsx
 */


function CheckboxField({
  id,
  label,
  value = [],
  onChange,
  options = {},
  help = '',
  layout = 'vertical',
  size = 'medium',
  compact = false
}) {
  const handleChange = (optionValue, checked) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter(item => item !== optionValue));
    }
  };
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options.map(option => {
        if (typeof option === 'object' && option.value && option.label) {
          return {
            value: option.value,
            label: option.label
          };
        }
        return {
          value: option,
          label: option
        };
      });
    }
    if (typeof options === 'object' && options !== null) {
      return Object.entries(options).map(([key, label]) => ({
        value: key,
        label: label
      }));
    }
    return [];
  };
  const normalizedOptions = normalizeOptions();
  const checkboxGroupClasses = ['tpo-checkbox-group', `tpo-checkbox-group--${layout}`, `tpo-checkbox-group--${size}`, compact ? 'tpo-checkbox-group--compact' : ''].filter(Boolean).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--checkbox"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: checkboxGroupClasses
  }, normalizedOptions.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Checkbox__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: option.value,
    id: `${id}-${option.value}`,
    checked: value.includes(option.value),
    onChange: checked => handleChange(option.value, checked),
    label: option.label,
    size: size
  })))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxField);

/***/ }),

/***/ "./src/js/admin/components/Fields/CodeEditorField.jsx":
/*!************************************************************!*\
  !*** ./src/js/admin/components/Fields/CodeEditorField.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Code Editor Field - Syntax Highlighting
 * Uses WordPress wp.codeEditor API (CodeMirror)
 *
 * File: src/js/admin/components/Fields/CodeEditorField.jsx
 */




function CodeEditorField({
  id,
  label,
  value = '',
  onChange,
  mode = 'css',
  height = 300,
  help = '',
  showModal // Modal function from parent
}) {
  const [code, setCode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(value);
  const [copied, setCopied] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const textareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const editorRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);

  /**
   * Get editor settings based on mode
   */
  const getEditorSettings = () => {
    const modeMap = {
      css: 'text/css',
      javascript: 'text/javascript',
      js: 'text/javascript',
      html: 'text/html',
      php: 'application/x-httpd-php',
      json: 'application/json'
    };
    return {
      codemirror: {
        lineNumbers: true,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        continueComments: true,
        indentUnit: 2,
        tabSize: 2,
        indentWithTabs: false,
        mode: modeMap[mode] || 'text/css',
        theme: 'default',
        extraKeys: {
          'Ctrl-Space': 'autocomplete',
          'Ctrl-/': 'toggleComment',
          'Cmd-/': 'toggleComment'
        }
      }
    };
  };

  /**
   * Initialize CodeMirror editor
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!textareaRef.current || !window.wp || !window.wp.codeEditor) {
      console.warn('WordPress CodeEditor not available');
      return;
    }

    // Initialize editor
    const settings = window.wp.codeEditor.defaultSettings ? {
      ...window.wp.codeEditor.defaultSettings,
      ...getEditorSettings()
    } : getEditorSettings();
    editorRef.current = window.wp.codeEditor.initialize(textareaRef.current, settings);

    // Handle changes
    if (editorRef.current && editorRef.current.codemirror) {
      editorRef.current.codemirror.on('change', cm => {
        const newValue = cm.getValue();
        setCode(newValue);
        onChange(newValue);
      });

      // Set initial value
      if (value) {
        editorRef.current.codemirror.setValue(value);
      }
    }

    // Cleanup
    return () => {
      if (editorRef.current && editorRef.current.codemirror) {
        editorRef.current.codemirror.toTextArea();
      }
    };
  }, [mode]);

  /**
   * Update editor value when prop changes
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (editorRef.current && editorRef.current.codemirror && value !== code) {
      editorRef.current.codemirror.setValue(value || '');
    }
  }, [value]);

  /**
   * Get language label
   */
  const getLanguageLabel = () => {
    const labels = {
      css: 'CSS',
      javascript: 'JavaScript',
      js: 'JavaScript',
      html: 'HTML',
      php: 'PHP',
      json: 'JSON'
    };
    return labels[mode] || mode.toUpperCase();
  };

  /**
   * Copy code to clipboard
   */
  const copyCode = () => {
    const textToCopy = editorRef.current && editorRef.current.codemirror ? editorRef.current.codemirror.getValue() : code;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  /**
   * Format code (simple indentation)
   */
  const formatCode = () => {
    if (editorRef.current && editorRef.current.codemirror) {
      const cm = editorRef.current.codemirror;
      const code = cm.getValue();
      let formatted = code;
      if (mode === 'css') {
        formatted = code.replace(/\s*{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').replace(/\s*}\s*/g, '\n}\n').replace(/,\s*/g, ',\n').trim();
      } else if (mode === 'javascript' || mode === 'js') {
        formatted = code.replace(/\s*{\s*/g, ' {\n  ').replace(/;\s*/g, ';\n  ').replace(/\s*}\s*/g, '\n}\n').trim();
      } else if (mode === 'json') {
        try {
          const parsed = JSON.parse(code);
          formatted = JSON.stringify(parsed, null, 2);
        } catch (e) {
          formatted = code.trim();
        }
      }
      cm.setValue(formatted);
    }
  };

  /**
   * Clear code - USING showModal
   */
  const clearCode = () => {
    // Check if showModal function is available
    if (showModal) {
      // Use custom modal
      showModal({
        type: 'confirm',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear Code?', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to clear all code? This action cannot be undone.', 'themeplus'),
        confirmText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear', 'themeplus'),
        cancelText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus'),
        onConfirm: () => {
          // Clear the editor
          if (editorRef.current && editorRef.current.codemirror) {
            editorRef.current.codemirror.setValue('');
          }
          setCode('');
          onChange('');
        }
      });
    } else {
      // Fallback to browser confirm if showModal not available
      if (confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to clear all code?', 'themeplus'))) {
        if (editorRef.current && editorRef.current.codemirror) {
          editorRef.current.codemirror.setValue('');
        }
        setCode('');
        onChange('');
      }
    }
  };

  // Fallback if CodeEditor not available
  const fallbackEditor = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    ref: textareaRef,
    className: "tpo-code-editor__textarea",
    value: code,
    onChange: e => {
      setCode(e.target.value);
      onChange(e.target.value);
    },
    style: {
      minHeight: `${height}px`
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter code here...', 'themeplus')
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--code-editor"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-code-editor tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-code-editor__toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-code-editor__info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-code-editor__language"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-laptop-code"
  }), getLanguageLabel()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-code-editor__lines"
  }, code.split('\n').length, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('lines', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-code-editor__actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "small",
    color: "light",
    onClick: copyCode
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa-solid fa-${copied ? 'check-double' : 'copy'}`
  }), copied ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copied!', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copy', 'themeplus')), (mode === 'css' || mode === 'javascript' || mode === 'json') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "small",
    color: "light",
    onClick: formatCode
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-align-left"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Format', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "small",
    color: "danger",
    onClick: clearCode
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-trash-can"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-code-editor__wrapper"
  }, fallbackEditor))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeEditorField);

/***/ }),

/***/ "./src/js/admin/components/Fields/ColorPicker.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Fields/ColorPicker.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_ColorPickerButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/ColorPickerButton */ "./src/js/admin/components/Common/ColorPickerButton.jsx");

/**
 * ThemePlus ColorPicker Field Component
 *
 * File: src/js/admin/components/Fields/ColorPicker.jsx
 */


function ColorPicker({
  id,
  label,
  value = '#000000',
  onChange,
  help = ''
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--color"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ColorPickerButton__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: value,
    onChange: onChange
  })), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPicker);

/***/ }),

/***/ "./src/js/admin/components/Fields/DatePickerField.jsx":
/*!************************************************************!*\
  !*** ./src/js/admin/components/Fields/DatePickerField.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus DatePicker Field
 * Uses WordPress native DatePicker/DateTimePicker component
 *
 * File: src/js/admin/components/Fields/DatePickerField.jsx
 */





function DatePickerField({
  id,
  label,
  value = '',
  onChange,
  help = '',
  placeholder = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select date...', 'themeplus'),
  showTime = false,
  // Toggle time picker
  is12Hour = true // 12/24 hour format
}) {
  const [selectedDate, setSelectedDate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(value);

  /**
   * Handle date change
   */
  const handleDateChange = newDate => {
    // Format based on whether time is included
    let formatted;
    if (showTime) {
      // Keep full ISO format with time: 2025-01-15T14:30:00
      formatted = newDate || '';
    } else {
      // Date only: 2025-01-15
      formatted = newDate ? newDate.split('T')[0] : '';
    }
    setSelectedDate(formatted);
    onChange(formatted);
  };

  /**
   * Format display date
   */
  const getDisplayDate = () => {
    if (!selectedDate) return placeholder;
    try {
      const date = new Date(selectedDate);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      // Add time to display if showTime is enabled
      if (showTime) {
        options.hour = 'numeric';
        options.minute = 'numeric';
        options.hour12 = is12Hour;
      }
      return date.toLocaleDateString(undefined, options);
    } catch (e) {
      return selectedDate;
    }
  };

  /**
   * Clear date
   */
  const clearDate = () => {
    setSelectedDate('');
    onChange('');
  };

  /**
   * Set today
   */
  const setToday = () => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setSelectedDate(formatted);
    onChange(formatted);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--datepicker"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-datepicker tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Dropdown, {
    className: "tpo-datepicker__dropdown",
    contentClassName: "tpo-datepicker__popover",
    position: "bottom left",
    renderToggle: ({
      isOpen,
      onToggle
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-datepicker__input-wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "tpo-datepicker__input",
      onClick: onToggle,
      "aria-expanded": isOpen
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: selectedDate ? '' : 'tpo-datepicker__placeholder'
    }, getDisplayDate()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-calendar-days"
    }))),
    renderContent: ({
      onClose
    }) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-datepicker__content"
    }, showTime ?
    // Full DateTimePicker with time
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.DateTimePicker, {
      currentDate: selectedDate || null,
      onChange: handleDateChange,
      is12Hour: is12Hour,
      __nextRemoveHelpButton: true,
      __nextRemoveResetButton: true
    }) :
    // Date only - use DatePicker component
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.DatePicker, {
      currentDate: selectedDate || null,
      onChange: handleDateChange,
      __nextRemoveHelpButton: true,
      __nextRemoveResetButton: true
    }), showTime && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-datepicker__info"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select date and time', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-datepicker__footer"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      color: "green",
      size: "small",
      onClick: onClose
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Done', 'themeplus'))))
  }), selectedDate && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-datepicker__actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "small",
    color: "secondary",
    onClick: setToday
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-calendar-days"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Today', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "small",
    color: "muted",
    onClick: clearDate
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear', 'themeplus'))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DatePickerField);

/***/ }),

/***/ "./src/js/admin/components/Fields/Dimensions.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/Fields/Dimensions.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Dimensions Component
 *
 * File: src/js/admin/components/Fields/Dimensions.jsx
 */






/**
 * Dimensions Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {Object} props.value Dimension values {width, height, unit}
 * @param {Function} props.onChange Change handler
 * @param {Array} props.units Available units
 * @param {Array} props.dimensions Enabled dimensions (width, height)
 * @param {string} props.help Help text
 */
function Dimensions({
  id,
  label,
  value = {},
  onChange,
  units = ['px', 'em', '%', 'rem'],
  dimensions = ['width', 'height'],
  help = ''
}) {
  const [isLinked, setIsLinked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const currentUnit = value.unit || 'px';
  const width = value.width || '';
  const height = value.height || '';

  /**
   * Handle dimension change
   */
  const handleDimensionChange = (dimension, newValue) => {
    const updatedValue = {
      ...value,
      [dimension]: newValue
    };

    // If linked, update both dimensions
    if (isLinked && dimensions.length > 1) {
      dimensions.forEach(dim => {
        updatedValue[dim] = newValue;
      });
    }
    onChange(updatedValue);
  };

  /**
   * Handle unit change
   */
  const handleUnitChange = newUnit => {
    onChange({
      ...value,
      unit: newUnit
    });
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--dimensions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dimensions tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dimensions__inputs tpo-field-has-btn"
  }, dimensions.includes('width') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dimensions__input-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-dimensions__input-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Width', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    className: "tpo-dimensions__input",
    value: width,
    onChange: e => handleDimensionChange('width', e.target.value),
    placeholder: "0"
  })), dimensions.includes('height') && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dimensions__input-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-dimensions__input-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Height', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    className: "tpo-dimensions__input",
    value: height,
    onChange: e => handleDimensionChange('height', e.target.value),
    placeholder: "0"
  })), dimensions.length > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    style: "plain",
    color: "muted",
    className: `tpo-dimensions__link ${isLinked ? 'tpo-dimensions__link--active' : ''}`,
    iconOnly: true,
    onClick: () => setIsLinked(!isLinked),
    ariaLabel: isLinked ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlink dimensions', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link dimensions', 'themeplus'),
    title: isLinked ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlink', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link', 'themeplus')
  }, isLinked ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-link"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-link-slash"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-dimensions__unit tpo-unit-selector"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: currentUnit,
    onChange: handleUnitChange,
    options: units,
    className: "tpo-unit-select"
  })))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dimensions);

/***/ }),

/***/ "./src/js/admin/components/Fields/GalleryField.jsx":
/*!*********************************************************!*\
  !*** ./src/js/admin/components/Fields/GalleryField.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _Common_FileUpload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/FileUpload */ "./src/js/admin/components/Common/FileUpload.jsx");

/**
 * ThemePlus Gallery Field
 * Multiple image upload and management
 *
 * File: src/js/admin/components/Fields/GalleryField.jsx
 */





function GalleryField({
  id,
  label,
  value = [],
  onChange,
  help = ''
}) {
  const [images, setImages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(value);

  /**
   * Handle WordPress media upload
   */
  const handleUpload = () => {
    if (window.wp && window.wp.media) {
      const frame = window.wp.media({
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Images', 'themeplus'),
        button: {
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use these images', 'themeplus')
        },
        multiple: true
      });
      frame.on('select', () => {
        const attachments = frame.state().get('selection').toJSON();
        const newImages = attachments.map(att => ({
          id: att.id,
          url: att.url,
          alt: att.alt || ''
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
  const removeImage = index => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--gallery"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gallery tpo-field-card"
  }, images.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gallery__grid"
  }, images.map((img, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: "tpo-gallery__item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: img.url,
    alt: img.alt,
    className: "tpo-gallery__image"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "tpo-gallery__remove tpo-button--small-dismiss",
    color: "danger",
    size: "small",
    iconOnly: true,
    onClick: () => removeImage(index),
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove image', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-times"
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FileUpload__WEBPACK_IMPORTED_MODULE_4__["default"], {
    variant: "button",
    icon: "fa-images",
    label: images.length > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add More Images', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Images', 'themeplus'),
    onClick: handleUpload,
    className: "tpo-gallery__upload"
  }), images.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-gallery__count"
  }, images.length, " ", images.length === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('image', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('images', 'themeplus')))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GalleryField);

/***/ }),

/***/ "./src/js/admin/components/Fields/GradientPickerField.jsx":
/*!****************************************************************!*\
  !*** ./src/js/admin/components/Fields/GradientPickerField.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_GradientPicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/GradientPicker */ "./src/js/admin/components/Common/GradientPicker.jsx");

/**
 * ThemePlus Gradient Picker Field
 *
 * File: src/js/admin/components/Fields/GradientPickerField.jsx
 */


function GradientPickerField({
  id,
  label,
  value = '',
  onChange,
  help = ''
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--gradient-picker"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_GradientPicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: value,
    onChange: onChange,
    showPreview: true,
    showCopyButton: true,
    showOutput: true
  }))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GradientPickerField);

/***/ }),

/***/ "./src/js/admin/components/Fields/GroupField.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/Fields/GroupField.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_FieldRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/FieldRenderer */ "./src/js/admin/components/Common/FieldRenderer.jsx");

/**
 * ThemePlus Group Field
 * Container for nested fields
 *
 * File: src/js/admin/components/Fields/GroupField.jsx
 */




function GroupField({
  id,
  label,
  value = {},
  onChange,
  fields = [],
  help = '',
  showModal
}) {
  const [groupValues, setGroupValues] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(value);

  /**
   * Update nested field value
   * Accepts just the value (not fieldId)
   */
  const updateField = fieldId => fieldValue => {
    const newValues = {
      ...groupValues,
      [fieldId]: fieldValue
    };
    setGroupValues(newValues);
    onChange(newValues);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--group"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label--depth0 tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-group tpo-field-card tpo-fields--group"
  }, fields.length > 0 ? fields.map(field => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: field.id,
    className: "tpo-group__field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FieldRenderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    field: field,
    value: groupValues[field.id],
    onUpdate: updateField(field.id)
  }))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-group__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-inbox"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No fields configured for this group.', 'themeplus'))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupField);

/***/ }),

/***/ "./src/js/admin/components/Fields/IconField.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Fields/IconField.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_IconPickerModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/IconPickerModal */ "./src/js/admin/components/Common/IconPickerModal.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _Common_FileUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/FileUpload */ "./src/js/admin/components/Common/FileUpload.jsx");

/**
 * ThemePlus Icon Field
 * FontAwesome only
 *
 * File: src/js/admin/components/Fields/IconField.jsx
 */






function IconField({
  id,
  label,
  value = '',
  onChange,
  help = ''
}) {
  const [showModal, setShowModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  /**
   * Parse FontAwesome icon string
   */
  const parseIcon = iconString => {
    if (!iconString || typeof iconString !== 'string') {
      return null;
    }
    const parts = iconString.split(' ');
    const iconClass = parts.find(p => p.startsWith('fa-') && !['fa-solid', 'fa-regular', 'fa-brands', 'fa-light', 'fa-duotone'].includes(p));
    if (!iconClass) return null;
    const iconId = iconClass.replace('fa-', '');
    const iconName = iconId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      id: iconId,
      name: iconName,
      class: iconString
    };
  };
  const displayIcon = parseIcon(value);
  const handleSelect = icon => {
    onChange(icon.class);
  };
  const handleRemove = () => {
    onChange('');
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-field"
  }, displayIcon ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-field__preview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-icon-field__preview-icon",
    onClick: () => setShowModal(true),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Click to change icon', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: displayIcon.class
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-field__preview-info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-field__preview-name"
  }, displayIcon.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-field__preview-id"
  }, displayIcon.class)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-icon-field__preview-actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "secondary",
    size: "small",
    onClick: () => setShowModal(true)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "small",
    color: "muted",
    className: "tpo-icon-field__button tpo-icon-field__button--remove tpo-button tpo-button--secondary",
    onClick: handleRemove
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FileUpload__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "button",
    icon: "fa-icons",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Icon', 'themeplus'),
    onClick: () => setShowModal(true),
    className: "tpo-icon-field__select"
  }))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_IconPickerModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: showModal,
    onClose: () => setShowModal(false),
    onSelect: handleSelect,
    selectedIcon: displayIcon?.id
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IconField);

/***/ }),

/***/ "./src/js/admin/components/Fields/ImageField.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/Fields/ImageField.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _Common_FileUpload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/FileUpload */ "./src/js/admin/components/Common/FileUpload.jsx");

/**
 * ThemePlus ImageField Component
 *
 * File: src/js/admin/components/Fields/ImageField.jsx
 */





function ImageField({
  id,
  label,
  value = {},
  onChange,
  help = ''
}) {
  const [uploading, setUploading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const handleUpload = () => {
    if (!window.wp || !window.wp.media) {
      alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('WordPress Media Library not available', 'themeplus'));
      return;
    }
    setUploading(true);
    const frame = window.wp.media({
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select or Upload Image', 'themeplus'),
      button: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use this image', 'themeplus')
      },
      multiple: false
    });
    frame.on('select', function () {
      const attachment = frame.state().get('selection').first().toJSON();
      onChange({
        id: attachment.id,
        url: attachment.url,
        width: attachment.width,
        height: attachment.height,
        alt: attachment.alt || '',
        title: attachment.title || ''
      });
      setUploading(false);
    });
    frame.on('close', function () {
      setUploading(false);
    });
    frame.open();
  };
  const handleRemove = () => {
    onChange({});
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--image"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-image"
  }, value?.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-image__preview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: value.url,
    alt: value.alt || label,
    className: "tpo-image__img"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-image__actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "success",
    size: "small",
    onClick: handleUpload,
    disabled: uploading
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change Image', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "danger",
    size: "small",
    onClick: handleRemove
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus')))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FileUpload__WEBPACK_IMPORTED_MODULE_4__["default"], {
    variant: "button",
    icon: uploading ? "fa-spinner fa-spin" : "fa-image",
    label: uploading ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Uploading...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload Image', 'themeplus'),
    onClick: handleUpload,
    disabled: uploading,
    className: "tpo-image__upload"
  }))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageField);

/***/ }),

/***/ "./src/js/admin/components/Fields/InfoField.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Fields/InfoField.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Notice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Notice */ "./src/js/admin/components/Common/Notice.jsx");

/**
 * ThemePlus Info Field - Informational notice boxes
 *
 * File: src/js/admin/components/Fields/InfoField.jsx
 */


function InfoField({
  title,
  desc,
  content,
  style = 'info'
}) {
  const body = desc || content;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Notice__WEBPACK_IMPORTED_MODULE_1__["default"], {
    status: style,
    title: title
  }, body && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    dangerouslySetInnerHTML: {
      __html: body
    }
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfoField);

/***/ }),

/***/ "./src/js/admin/components/Fields/LinkField.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Fields/LinkField.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Checkbox */ "./src/js/admin/components/Common/Checkbox.jsx");

/**
 * ThemePlus Link Field
 *
 * File: src/js/admin/components/Fields/LinkField.jsx
 */




function LinkField({
  id,
  label,
  value = {},
  onChange,
  help = ''
}) {
  const [link, setLink] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({
    url: value.url || '',
    text: value.text || '',
    target: value.target || '_self',
    rel: value.rel || ''
  });
  const updateLink = (key, val) => {
    const newLink = {
      ...link,
      [key]: val
    };
    setLink(newLink);
    onChange(newLink);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--link"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-link"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "url",
    value: link.url,
    onChange: e => updateLink('url', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('https://example.com', 'themeplus'),
    className: "tpo-link__input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    value: link.text,
    onChange: e => updateLink('text', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link Text (optional)', 'themeplus'),
    className: "tpo-link__input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-link__options"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Checkbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
    id: `${id}-target`,
    checked: link.target === '_blank',
    onChange: checked => updateLink('target', checked ? '_blank' : '_self'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Open in new tab', 'themeplus'),
    size: "small"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Checkbox__WEBPACK_IMPORTED_MODULE_3__["default"], {
    id: `${id}-nofollow`,
    checked: link.rel.includes('nofollow'),
    onChange: checked => updateLink('rel', checked ? 'nofollow' : ''),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add nofollow', 'themeplus'),
    size: "small"
  })))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkField);

/***/ }),

/***/ "./src/js/admin/components/Fields/NumberField.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Fields/NumberField.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Spinner */ "./src/js/admin/components/Common/Spinner.jsx");

/**
 * ThemePlus Number Field Component
 * Unified field for both simple number input and spinner (with +/- buttons)
 *
 * File: src/js/admin/components/Fields/NumberField.jsx
 */



/**
 * Round number to specific decimal places
 * JavaScript floating point precision
 */
const roundToStep = (value, step) => {
  const decimals = (step.toString().split('.')[1] || '').length;
  return Number(value.toFixed(decimals));
};

/**
 * Number Field Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {string} props.subtitle Field subtitle/description
 * @param {number} props.value Field value
 * @param {Function} props.onChange Change handler
 * @param {number} props.min Minimum value
 * @param {number} props.max Maximum value
 * @param {number} props.step Step increment (default: 1)
 * @param {string} props.unit Unit label (px, %, em, etc.)
 * @param {string} props.help Help text
 * @param {boolean} props.required Required field
 * @param {boolean} props.spinner Show spinner buttons (default: auto-detect)
 * @param {boolean} props.disabled Disabled state
 */
function NumberField({
  id,
  label,
  subtitle = '',
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  help = '',
  required = false,
  spinner = null,
  // null = auto-detect, true = force, false = disable
  disabled = false
}) {
  // Auto-detect if spinner should be shown
  // Show spinner if: small range (max - min <= 1000) OR step is decimal
  const shouldShowSpinner = spinner !== null ? spinner : max - min <= 1000 || step < 1;
  const handleChange = newValue => {
    // Handle empty string
    if (newValue === '' || newValue === '-') {
      onChange(newValue);
      return;
    }
    const numValue = Number(newValue);

    // Validate
    if (isNaN(numValue)) return;

    // Clamp
    let clampedValue = numValue;
    if (clampedValue < min) clampedValue = min;
    if (clampedValue > max) clampedValue = max;

    // Round to step precision
    const roundedValue = roundToStep(clampedValue, step);
    onChange(roundedValue);
  };
  const handleBlur = () => {
    // Clean up on blur
    if (value === '' || value === '-' || value === null || value === undefined || isNaN(value)) {
      onChange(min);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--number"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label, required && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-field__required"
  }, "*")), subtitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-field__subtitle"
  }, subtitle)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, shouldShowSpinner ?
  // Spinner mode (with +/- buttons)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: value,
    onChange: handleChange,
    min: min,
    max: max,
    step: step,
    unit: unit,
    disabled: disabled
  }) :
  // Simple mode (plain input)
  (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    type: "number",
    className: "tpo-number__input",
    value: value,
    onChange: e => handleChange(e.target.value),
    onBlur: handleBlur,
    min: min,
    max: max,
    step: step,
    required: required,
    disabled: disabled,
    autoComplete: "off"
  }), unit && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-number__unit tpo-field-unit"
  }, unit))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NumberField);

/***/ }),

/***/ "./src/js/admin/components/Fields/RadioField.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/Fields/RadioField.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Radio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Radio */ "./src/js/admin/components/Common/Radio.jsx");

/**
 * ThemePlus Radio Field
 *
 * File: src/js/admin/components/Fields/RadioField.jsx
 */


function RadioField({
  id,
  label,
  value = '',
  onChange,
  options = [],
  help = '',
  layout = 'vertical',
  size = 'medium',
  compact = false
}) {
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options.map(option => {
        if (typeof option === 'object' && option.value && option.label) {
          return option;
        }
        return {
          value: option,
          label: option
        };
      });
    }
    if (typeof options === 'object' && options !== null) {
      return Object.entries(options).map(([key, label]) => ({
        value: key,
        label: label
      }));
    }
    return [];
  };
  const normalizedOptions = normalizeOptions();
  const radioGroupClasses = ['tpo-radio-group', `tpo-radio-group--${layout}`, `tpo-radio-group--${size}`, compact ? 'tpo-radio-group--compact' : ''].filter(Boolean).join(' ');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--radio"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: radioGroupClasses
  }, normalizedOptions.map((option, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Radio__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: option.value || index,
    id: `${id}-${option.value}`,
    name: id,
    value: option.value,
    checked: value === option.value,
    onChange: onChange,
    label: option.label,
    size: size
  })))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadioField);

/***/ }),

/***/ "./src/js/admin/components/Fields/RawField.jsx":
/*!*****************************************************!*\
  !*** ./src/js/admin/components/Fields/RawField.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * ThemePlus Raw Field - Display HTML content
 * Used for custom HTML, notices, instructions, etc.
 *
 * File: src/js/admin/components/Fields/RawField.jsx
 */


function RawField({
  id,
  label,
  title,
  // FieldRenderer might pass title instead of label
  content = '',
  desc,
  // Sometimes content comes as desc
  help = ''
}) {
  // Use title if label is not provided
  const displayLabel = label || title;

  // Use desc if content is not provided (fallback)
  const displayContent = content || desc || '';

  // If no content, show a message
  if (!displayContent) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-field tpo-field--raw"
    }, displayLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-field__header"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "tpo-field__label"
    }, displayLabel)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-field__body"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-raw tpo-raw--empty"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "tpo-raw__empty-message"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No content to display.', 'themeplus')))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-field__help"
    }, help));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--raw"
  }, displayLabel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, displayLabel)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-raw",
    dangerouslySetInnerHTML: {
      __html: displayContent
    }
  })), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RawField);

/***/ }),

/***/ "./src/js/admin/components/Fields/RepeaterField.jsx":
/*!**********************************************************!*\
  !*** ./src/js/admin/components/Fields/RepeaterField.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_FieldRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/FieldRenderer */ "./src/js/admin/components/Common/FieldRenderer.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _Common_FileUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/FileUpload */ "./src/js/admin/components/Common/FileUpload.jsx");

/**
 * ThemePlus Repeater Field - Dynamic Row Builder
 * Add/remove/reorder rows with nested fields
 *
 * File: src/js/admin/components/Fields/RepeaterField.jsx
 */






function RepeaterField({
  id,
  label,
  value = [],
  onChange,
  fields = [],
  help = '',
  min = 0,
  max = 999,
  button_label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Item', 'themeplus'),
  showModal // Modal function from parent
}) {
  const [rows, setRows] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(value);
  const [collapsed, setCollapsed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({});

  /**
   * Add new row
   */
  const addRow = () => {
    if (rows.length >= max) return;
    const newRow = {};
    fields.forEach(field => {
      newRow[field.id] = field.default || '';
    });
    const newRows = [...rows, newRow];
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Remove row with custom modal confirmation
   */
  const removeRow = index => {
    if (rows.length <= min) return;

    // Use custom modal instead of browser confirm
    if (showModal) {
      showModal({
        type: 'confirm',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove Item?', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to remove this item? This action cannot be undone.', 'themeplus'),
        confirmText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus'),
        cancelText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus'),
        onConfirm: () => {
          const newRows = rows.filter((_, i) => i !== index);
          setRows(newRows);
          onChange(newRows);
        }
      });
    } else {
      // Fallback to browser confirm if showModal not available
      if (confirm((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to remove this item?', 'themeplus'))) {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
        onChange(newRows);
      }
    }
  };

  /**
   * Update row field value
   * Uses currying like GroupField
   */
  const updateRow = (rowIndex, fieldId) => fieldValue => {
    const newRows = [...rows];
    newRows[rowIndex] = {
      ...newRows[rowIndex],
      [fieldId]: fieldValue
    };
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Move row up
   */
  const moveRowUp = index => {
    if (index === 0) return;
    const newRows = [...rows];
    [newRows[index - 1], newRows[index]] = [newRows[index], newRows[index - 1]];
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Move row down
   */
  const moveRowDown = index => {
    if (index === rows.length - 1) return;
    const newRows = [...rows];
    [newRows[index], newRows[index + 1]] = [newRows[index + 1], newRows[index]];
    setRows(newRows);
    onChange(newRows);
  };

  /**
   * Toggle row collapse
   */
  const toggleCollapse = index => {
    setCollapsed(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  /**
   * Get row title (from first text field or index)
   */
  const getRowTitle = (row, index) => {
    const firstTextField = fields.find(f => f.type === 'text' || f.type === 'textarea');
    if (firstTextField && row[firstTextField.id]) {
      const title = row[firstTextField.id];
      return title.length > 30 ? title.substring(0, 30) + '...' : title;
    }
    return `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Item', 'themeplus')} ${index + 1}`;
  };

  /**
   * Generate unique field ID for nested fields
   * Fixes the duplicate ID warning!
   */
  const getUniqueFieldId = (fieldId, rowIndex) => {
    return `${id}-row-${rowIndex}-${fieldId}`;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--repeater"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label), rows.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-field__counter"
  }, rows.length, " ", rows.length === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('item', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('items', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater"
  }, rows.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater__rows"
  }, rows.map((row, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    className: `tpo-repeater__row tpo-field-card ${collapsed[index] ? 'tpo-repeater__row--collapsed' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater__row-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "light",
    iconOnly: true,
    onClick: () => toggleCollapse(index),
    title: collapsed[index] ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expand', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Collapse', 'themeplus'),
    ariaLabel: collapsed[index] ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Expand', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Collapse', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa-solid fa-chevron-${collapsed[index] ? 'right' : 'down'}`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater__row-title"
  }, getRowTitle(row, index)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater__row-actions tpo-actions-bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "muted",
    onClick: () => moveRowUp(index),
    disabled: index === 0,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move up', 'themeplus'),
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move up', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-chevron-up"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "muted",
    onClick: () => moveRowDown(index),
    disabled: index === rows.length - 1,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move down', 'themeplus'),
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move down', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-chevron-down"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "muted",
    onClick: () => {
      if (rows.length >= max) return;
      const newRows = [...rows];
      newRows.splice(index + 1, 0, {
        ...row
      });
      setRows(newRows);
      onChange(newRows);
    },
    disabled: rows.length >= max,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Duplicate', 'themeplus'),
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Duplicate', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-copy"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "danger",
    onClick: () => removeRow(index),
    disabled: rows.length <= min,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus'),
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-trash-can"
  })))), !collapsed[index] && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater__row-content"
  }, fields.map(field => {
    // Create unique field with proper ID
    const uniqueField = {
      ...field,
      id: getUniqueFieldId(field.id, index)
    };
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: field.id,
      className: "tpo-repeater__field"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FieldRenderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      field: uniqueField,
      value: row[field.id],
      onUpdate: updateRow(index, field.id),
      showModal: showModal
    }));
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FileUpload__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "button",
    icon: "fa-plus",
    label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, button_label, max < 999 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-repeater__add-limit"
    }, "(", rows.length, "/", max, ")")),
    onClick: addRow,
    disabled: rows.length >= max,
    className: "tpo-repeater__add"
  }), rows.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-repeater__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-regular fa-face-meh-blank"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No items yet. Click the button above to add one.', 'themeplus'))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RepeaterField);

/***/ }),

/***/ "./src/js/admin/components/Fields/SectionField.jsx":
/*!*********************************************************!*\
  !*** ./src/js/admin/components/Fields/SectionField.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Section Field - Visual section divider/heading
 *
 * File: src/js/admin/components/Fields/SectionField.jsx
 */

function SectionField({
  title,
  desc,
  content
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--section tpo-section"
  }, title && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "tpo-section__title"
  }, title), (desc || content) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-section__desc"
  }, desc || content));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionField);

/***/ }),

/***/ "./src/js/admin/components/Fields/SelectField.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Fields/SelectField.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");

/**
 * ThemePlus Select Field Component
 * Field wrapper for Select component in theme options
 *
 * File: src/js/admin/components/Fields/SelectField.jsx
 */



/**
 * Select Field Component (with label, help text, etc.)
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {string} props.value Selected value
 * @param {Function} props.onChange Change handler
 * @param {Array|Object} props.options Select options
 * @param {string} props.subtitle Subtitle/description
 * @param {string} props.help Help text
 * @param {boolean} props.required Required field
 * @param {boolean} props.disabled Disabled state
 * @param {string} props.placeholder Placeholder text
 */
function SelectField({
  id,
  label,
  value,
  onChange,
  options = [],
  subtitle = '',
  help = '',
  required = false,
  disabled = false,
  placeholder
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--select"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label, required && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-field__required"
  }, "*")), subtitle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-field__subtitle"
  }, subtitle)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_1__["default"], {
    value: value,
    onChange: onChange,
    options: options,
    placeholder: placeholder,
    disabled: disabled
  })), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectField);

/***/ }),

/***/ "./src/js/admin/components/Fields/SelectImageField.jsx":
/*!*************************************************************!*\
  !*** ./src/js/admin/components/Fields/SelectImageField.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Select Image Field - Visual radio selector
 * Choose between options using images (layouts, styles, etc.)
 *
 * File: src/js/admin/components/Fields/SectionImageField.jsx
 */

function SelectImageField({
  id,
  label,
  value = '',
  onChange,
  options = [],
  help = ''
}) {
  const normalizeOptions = () => {
    if (Array.isArray(options)) {
      return options.map(opt => ({
        value: opt.value,
        label: opt.label,
        image: opt.image || opt.img || ''
      }));
    }
    return Object.entries(options).map(([key, opt]) => ({
      value: key,
      label: opt.label || opt.alt || '',
      image: opt.image || opt.img || ''
    }));
  };
  const normalizedOptions = normalizeOptions();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--select-image"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-select-image"
  }, normalizedOptions.map(option => {
    const {
      value: optionValue,
      label: optionLabel,
      image: optionImage
    } = option;
    const isSelected = value === optionValue;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      key: optionValue,
      className: `tpo-select-image__option ${isSelected ? 'tpo-select-image__option--selected' : ''}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "radio",
      name: id,
      value: optionValue,
      checked: isSelected,
      onChange: () => onChange(optionValue),
      className: "tpo-select-image__input"
    }), optionImage && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-select-image__image"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: optionImage,
      alt: optionLabel,
      loading: "lazy"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-select-image__label"
    }, optionLabel));
  }))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectImageField);

/***/ }),

/***/ "./src/js/admin/components/Fields/ShortcodeField.jsx":
/*!***********************************************************!*\
  !*** ./src/js/admin/components/Fields/ShortcodeField.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Shortcode Field - With Paste Button
 *
 * File: src/js/admin/components/Fields/ShortcodeField.jsx
 */




function ShortcodeField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '[my-shortcode]',
  help = ''
}) {
  const [pasted, setPasted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  /**
   * Paste from clipboard
   */
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch (err) {
      console.error('Failed to paste:', err);
      // Fallback: show an alert if clipboard API fails
      alert((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clipboard access denied. Please paste manually (Ctrl+V or Cmd+V).', 'themeplus'));
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--shortcode"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-shortcode tpo-field-has-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    name: id,
    type: "text",
    className: "tpo-shortcode__input tpo-field-has-btn__input",
    value: value || '',
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    autoComplete: "off"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    size: "auto",
    onClick: handlePaste,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste from clipboard', 'themeplus')
  }, pasted ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-check"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pasted!', 'themeplus'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fas fa-paste"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste', 'themeplus')))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShortcodeField);

/***/ }),

/***/ "./src/js/admin/components/Fields/SliderField.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Fields/SliderField.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * ThemePlus Slider Field - Range input with visual feedback
 *
 * File: src/js/admin/components/Fields/SliderField.jsx
 */


function SliderField({
  id,
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  showTooltip = true,
  help = ''
}) {
  const [isDragging, setIsDragging] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Calculate percentage for visual feedback
  const percentage = (value - min) / (max - min) * 100;
  const handleChange = e => {
    onChange(Number(e.target.value));
  };
  const handleInputChange = e => {
    const newValue = Number(e.target.value);

    // Clamp value between min and max
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--slider"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-slider"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-slider__wrapper",
    onMouseEnter: () => showTooltip && setIsDragging(true),
    onMouseLeave: () => showTooltip && setIsDragging(false)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    name: id,
    type: "range",
    className: "tpo-slider__input",
    value: value,
    onChange: handleChange,
    onMouseDown: () => showTooltip && setIsDragging(true),
    onMouseUp: () => showTooltip && setIsDragging(false),
    onTouchStart: () => showTooltip && setIsDragging(true),
    onTouchEnd: () => showTooltip && setIsDragging(false),
    min: min,
    max: max,
    step: step,
    style: {
      '--slider-percentage': `${percentage}%`
    }
  }), showTooltip && isDragging && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-slider__tooltip",
    style: {
      left: `${percentage}%`
    }
  }, value, unit)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-slider__value-display"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    className: "tpo-slider__value-input",
    value: value,
    onChange: handleInputChange,
    min: min,
    max: max,
    step: step
  }), unit && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-slider__unit"
  }, unit)))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SliderField);

/***/ }),

/***/ "./src/js/admin/components/Fields/SocialMediaField.jsx":
/*!*************************************************************!*\
  !*** ./src/js/admin/components/Fields/SocialMediaField.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _Common_FileUpload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/FileUpload */ "./src/js/admin/components/Common/FileUpload.jsx");

/**
 * ThemePlus Social Media Field - Repeater Style
 * Dynamic social media links with platform selection
 *
 * File: src/js/admin/components/Fields/SocialMediaField.jsx
 */






function SocialMediaField({
  id,
  label,
  value = [],
  onChange,
  help = '',
  max = 20
}) {
  const normalizeValue = val => {
    if (Array.isArray(val)) return val; // already correct format

    if (val && typeof val === 'object') {
      // Convert {facebook: 'url', twitter: 'url'} → [{platform, url}]
      return Object.entries(val).filter(([, url]) => url) // skip empty urls
      .map(([platform, url]) => ({
        platform,
        url
      }));
    }
    return [];
  };
  const [links, setLinks] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(normalizeValue(value));

  /**
   * Available social platforms with FontAwesome icons
   */
  const platforms = {
    facebook: {
      label: 'Facebook',
      icon: 'fa-brands fa-facebook-f'
    },
    twitter: {
      label: 'Twitter / X',
      icon: 'fa-brands fa-x-twitter'
    },
    instagram: {
      label: 'Instagram',
      icon: 'fa-brands fa-instagram'
    },
    linkedin: {
      label: 'LinkedIn',
      icon: 'fa-brands fa-linkedin-in'
    },
    youtube: {
      label: 'YouTube',
      icon: 'fa-brands fa-youtube'
    },
    pinterest: {
      label: 'Pinterest',
      icon: 'fa-brands fa-pinterest-p'
    },
    tiktok: {
      label: 'TikTok',
      icon: 'fa-brands fa-tiktok'
    },
    snapchat: {
      label: 'Snapchat',
      icon: 'fa-brands fa-snapchat'
    },
    whatsapp: {
      label: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp'
    },
    telegram: {
      label: 'Telegram',
      icon: 'fa-brands fa-telegram-plane'
    },
    reddit: {
      label: 'Reddit',
      icon: 'fa-brands fa-reddit-alien'
    },
    github: {
      label: 'GitHub',
      icon: 'fa-brands fa-github'
    },
    dribbble: {
      label: 'Dribbble',
      icon: 'fa-brands fa-dribbble'
    },
    behance: {
      label: 'Behance',
      icon: 'fa-brands fa-behance'
    },
    medium: {
      label: 'Medium',
      icon: 'fa-brands fa-medium-m'
    },
    vimeo: {
      label: 'Vimeo',
      icon: 'fa-brands fa-vimeo-v'
    },
    twitch: {
      label: 'Twitch',
      icon: 'fa-brands fa-twitch'
    },
    discord: {
      label: 'Discord',
      icon: 'fa-brands fa-discord'
    },
    spotify: {
      label: 'Spotify',
      icon: 'fa-brands fa-spotify'
    },
    soundcloud: {
      label: 'SoundCloud',
      icon: 'fa-brands fa-soundcloud'
    }
  };

  /**
   * Add new link
   */
  const addLink = () => {
    if (links.length >= max) return;
    const newLinks = [...links, {
      platform: 'facebook',
      url: ''
    }];
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Remove link
   */
  const removeLink = index => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Update link
   */
  const updateLink = (index, field, newValue) => {
    const newLinks = [...links];
    newLinks[index] = {
      ...newLinks[index],
      [field]: newValue
    };
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Move link up
   */
  const moveUp = index => {
    if (index === 0) return;
    const newLinks = [...links];
    [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
    setLinks(newLinks);
    onChange(newLinks);
  };

  /**
   * Move link down
   */
  const moveDown = index => {
    if (index === links.length - 1) return;
    const newLinks = [...links];
    [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
    setLinks(newLinks);
    onChange(newLinks);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--social-media"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label), links.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-field__counter"
  }, links.length, " ", links.length === 1 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('link', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('links', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-social-media tpo-field-card"
  }, links.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-social-media__list"
  }, links.map((link, index) => {
    const platformData = platforms[link.platform] || platforms.facebook;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "tpo-social-media__item"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-social-media__icon",
      style: {
        backgroundColor: platformData.color
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: `${platformData.icon}`
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-social-media__fields"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_3__["default"], {
      value: link.platform,
      onChange: val => updateLink(index, 'platform', val),
      options: Object.entries(platforms).map(([key, data]) => ({
        value: key,
        label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
          className: "tpo-social-media__label"
        }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
          className: `fab fa-${key}`
        }), " ", data.label))
      })),
      className: "tpo-social-media__platform"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "url",
      className: "tpo-social-media__url",
      value: link.url,
      onChange: e => updateLink(index, 'url', e.target.value),
      placeholder: `https://${link.platform}.com/yourprofile`
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-social-media__actions tpo-actions-bar"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      color: "muted",
      onClick: () => moveUp(index),
      disabled: index === 0,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move up', 'themeplus'),
      iconOnly: true,
      ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move up', 'themeplus')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-chevron-up"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      color: "muted",
      onClick: () => moveDown(index),
      disabled: index === links.length - 1,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move down', 'themeplus'),
      iconOnly: true,
      ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Move down', 'themeplus')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-chevron-down"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
      color: "muted",
      onClick: () => removeLink(index),
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus'),
      iconOnly: true,
      ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove', 'themeplus')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-trash-can"
    }))));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FileUpload__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "button",
    icon: "fa-plus",
    label: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Social Link', 'themeplus'), max < 999 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-social-media__limit"
    }, "(", links.length, "/", max, ")")),
    onClick: addLink,
    disabled: links.length >= max,
    className: "tpo-social-media__add"
  }), links.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-social-media__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-share-nodes"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No social media links yet. Click the button above to add one.', 'themeplus'))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialMediaField);

/***/ }),

/***/ "./src/js/admin/components/Fields/SpacingField.jsx":
/*!*********************************************************!*\
  !*** ./src/js/admin/components/Fields/SpacingField.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Spinner */ "./src/js/admin/components/Common/Spinner.jsx");
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Spacing Field
 * Margin/Padding controller with link/unlink and unit selector
 *
 * File: src/js/admin/components/Fields/SpacingField.jsx
 */






function SpacingField({
  id,
  label,
  value = {},
  onChange,
  units = ['px', 'em', 'rem', '%'],
  // Default units
  help = ''
}) {
  const [spacing, setSpacing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({
    top: value.top || 0,
    right: value.right || 0,
    bottom: value.bottom || 0,
    left: value.left || 0,
    unit: value.unit || 'px' // Add unit to state
  });
  const [linked, setLinked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const updateSpacing = (side, val) => {
    const newValue = Number(val) || 0;
    const newSpacing = linked ? {
      top: newValue,
      right: newValue,
      bottom: newValue,
      left: newValue,
      unit: spacing.unit
    } : {
      ...spacing,
      [side]: newValue
    };
    setSpacing(newSpacing);
    onChange(newSpacing);
  };

  // Handle unit change
  const handleUnitChange = newUnit => {
    const newSpacing = {
      ...spacing,
      unit: newUnit
    };
    setSpacing(newSpacing);
    onChange(newSpacing);
  };
  const toggleLink = () => {
    const newLinked = !linked;
    setLinked(newLinked);

    // When linking, set all values to top value
    if (newLinked) {
      const allSame = {
        top: spacing.top,
        right: spacing.top,
        bottom: spacing.top,
        left: spacing.top,
        unit: spacing.unit
      };
      setSpacing(allSame);
      onChange(allSame);
    }
  };

  // Get max value based on unit
  const getMaxValue = () => {
    switch (spacing.unit) {
      case '%':
        return 100;
      case 'em':
      case 'rem':
        return 20;
      default:
        // px
        return 200;
    }
  };

  // Get step based on unit
  const getStep = () => {
    switch (spacing.unit) {
      case 'em':
      case 'rem':
        return 0.1;
      default:
        return 1;
    }
  };
  const maxValue = getMaxValue();
  const step = getStep();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--spacing"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing tpo-field-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__controls"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: spacing.top,
    onChange: val => updateSpacing('top', val),
    min: 0,
    max: maxValue,
    step: step,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Top', 'themeplus'),
    unit: spacing.unit
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: spacing.right,
    onChange: val => updateSpacing('right', val),
    min: 0,
    max: maxValue,
    step: step,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Right', 'themeplus'),
    unit: spacing.unit,
    disabled: linked
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: spacing.bottom,
    onChange: val => updateSpacing('bottom', val),
    min: 0,
    max: maxValue,
    step: step,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bottom', 'themeplus'),
    unit: spacing.unit,
    disabled: linked
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], {
    value: spacing.left,
    onChange: val => updateSpacing('left', val),
    min: 0,
    max: maxValue,
    step: step,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Left', 'themeplus'),
    unit: spacing.unit,
    disabled: linked
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__link-wrapper tpo-field-has-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    style: "plain",
    color: "muted",
    onClick: toggleLink,
    className: `tpo-spacing__link ${linked ? 'tpo-spacing__link--active' : ''}`,
    title: linked ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlink values', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link values', 'themeplus'),
    ariaLabel: linked ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlink values', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Link values', 'themeplus'),
    iconOnly: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa-solid fa-${linked ? 'link' : 'link-slash'}`
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__unit tpo-unit-selector"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: spacing.unit,
    onChange: handleUnitChange,
    options: units.map(unit => ({
      label: unit,
      value: unit
    })),
    className: "tpo-unit-select"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__visual"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-spacing__visual-box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-spacing__visual-label tpo-spacing__visual-label--top"
  }, spacing.top, spacing.unit), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-spacing__visual-label tpo-spacing__visual-label--right"
  }, spacing.right, spacing.unit), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-spacing__visual-label tpo-spacing__visual-label--bottom"
  }, spacing.bottom, spacing.unit), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-spacing__visual-label tpo-spacing__visual-label--left"
  }, spacing.left, spacing.unit))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpacingField);

/***/ }),

/***/ "./src/js/admin/components/Fields/TextField.jsx":
/*!******************************************************!*\
  !*** ./src/js/admin/components/Fields/TextField.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Common_TextInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/TextInput */ "./src/js/admin/components/Common/TextInput.jsx");

/**
 * ThemePlus TextField Component
 *
 * File: src/js/admin/components/Fields/TextField.jsx
 */


function TextField({
  id,
  label,
  value = '',
  onChange,
  placeholder = '',
  help = '',
  required = false
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_TextInput__WEBPACK_IMPORTED_MODULE_1__["default"], {
    id: id,
    label: label,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    help: help,
    required: required,
    fullWidth: true
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextField);

/***/ }),

/***/ "./src/js/admin/components/Fields/TextareaField.jsx":
/*!**********************************************************!*\
  !*** ./src/js/admin/components/Fields/TextareaField.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Textarea Field Component
 *
 * File: src/js/admin/components/Fields/TextareaField.jsx
 */

/**
 * Textarea Field Component
 *
 * @param {Object} props Component props
 * @param {string} props.id Field ID
 * @param {string} props.label Field label
 * @param {string} props.value Field value
 * @param {Function} props.onChange Change handler
 * @param {string} props.placeholder Placeholder text
 * @param {string} props.help Help text
 * @param {boolean} props.required Required field
 * @param {number} props.rows Number of rows
 */
function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  help = '',
  required = false,
  rows = 4
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--textarea"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label, required && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-field__required"
  }, "*"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: id,
    className: "tpo-field__textarea",
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    required: required,
    rows: rows
  })), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextareaField);

/***/ }),

/***/ "./src/js/admin/components/Fields/ToggleField.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Fields/ToggleField.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus ToggleField Component
 *
 * File: src/js/admin/components/Fields/ToggleField.jsx
 */

function ToggleField({
  id,
  label,
  value = false,
  onChange,
  help = '',
  on = '',
  off = ''
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--toggle"
  }, label && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: id,
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: id,
    type: "button",
    className: `tpo-toggle ${value ? 'tpo-toggle--active' : ''} ${!on && !off ? 'tpo-toggle--no-labels' : ''}`,
    onClick: () => onChange(!value),
    role: "switch",
    "aria-checked": value,
    "aria-label": label
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-toggle__track"
  }, on && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-toggle__label tpo-toggle__label--on"
  }, on), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-toggle__thumb"
  }), off && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-toggle__label tpo-toggle__label--off"
  }, off)))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToggleField);

/***/ }),

/***/ "./src/js/admin/components/Fields/Typography.jsx":
/*!*******************************************************!*\
  !*** ./src/js/admin/components/Fields/Typography.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_GoogleFontsService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/GoogleFontsService */ "./src/js/admin/services/GoogleFontsService.js");
/* harmony import */ var _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/CustomFontsService */ "./src/js/admin/services/CustomFontsService.js");
/* harmony import */ var _Common_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/Select */ "./src/js/admin/components/Common/Select.jsx");
/* harmony import */ var _Common_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Common/Spinner */ "./src/js/admin/components/Common/Spinner.jsx");
/* harmony import */ var _Common_ButtonSet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Common/ButtonSet */ "./src/js/admin/components/Common/ButtonSet.jsx");

/**
 * ThemePlus Typography Component
 *
 * File: src/js/admin/components/Fields/Typography.jsx
 */








function Typography({
  id,
  label,
  value = {},
  onChange,
  help = '',
  // Control toggles - ALL DEFAULT FALSE except font-family
  'font-family': fontFamily = true,
  // Always shown
  'font-size': fontSize = false,
  'font-weight': fontWeight = false,
  'font-style': fontStyle = false,
  'line-height': lineHeight = false,
  'letter-spacing': letterSpacing = false,
  'text-transform': textTransform = false,
  subsets = true,
  // Default true
  units = 'px' // Default unit
}) {
  const [googleFonts, setGoogleFonts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [customFonts, setCustomFonts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [loadingFonts, setLoadingFonts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
  const [customFontsLoaded, setCustomFontsLoaded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Get unit for property
  const getUnit = property => {
    if (typeof units === 'object' && units[property]) {
      return units[property];
    }
    if (typeof units === 'string') {
      return units;
    }
    // Defaults
    if (property === 'line-height') return ''; // Unitless
    return 'px';
  };

  // Get values with fallbacks
  const fontFamilyValue = value['font-family'] || 'Inter';
  const fontSizeValue = value['font-size'] || '16';
  const fontWeightValue = value['font-weight'] || '400';
  const lineHeightValue = value['line-height'] || '1.5';
  const letterSpacingValue = value['letter-spacing'] || '0';
  const textTransformValue = value['text-transform'] || 'none';
  const fontStyleValue = value['font-style'] || 'normal';
  const subsetsValue = value.subsets || ['latin']; // Default subset

  // Standard fonts
  const standardFonts = ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Helvetica', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'];
  const detectFontTab = fontFamily => {
    if (!fontFamily) return 'google';
    if (standardFonts.includes(fontFamily)) return 'standard';
    return 'google'; // default to google (custom handled by useEffect below)
  };
  const [activeFontTab, setActiveFontTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => detectFontTab(value['font-family']));

  // Font style options
  const fontStyleOptions = {
    normal: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Normal', 'themeplus'),
    italic: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Italic', 'themeplus')
  };

  // Font weights
  const fontWeights = [{
    value: '100',
    label: '100 - Thin'
  }, {
    value: '200',
    label: '200 - Extra Light'
  }, {
    value: '300',
    label: '300 - Light'
  }, {
    value: '400',
    label: '400 - Regular'
  }, {
    value: '500',
    label: '500 - Medium'
  }, {
    value: '600',
    label: '600 - Semi Bold'
  }, {
    value: '700',
    label: '700 - Bold'
  }, {
    value: '800',
    label: '800 - Extra Bold'
  }, {
    value: '900',
    label: '900 - Black'
  }];

  // Text transform options
  const textTransformOptions = [{
    value: 'none',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('None', 'themeplus')
  }, {
    value: 'uppercase',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Uppercase', 'themeplus')
  }, {
    value: 'lowercase',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Lowercase', 'themeplus')
  }, {
    value: 'capitalize',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Capitalize', 'themeplus')
  }];

  // Subsets options
  const subsetsOptions = [{
    value: 'latin',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Latin', 'themeplus')
  }, {
    value: 'latin-ext',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Latin Extended', 'themeplus')
  }, {
    value: 'cyrillic',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cyrillic', 'themeplus')
  }, {
    value: 'cyrillic-ext',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cyrillic Extended', 'themeplus')
  }, {
    value: 'greek',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Greek', 'themeplus')
  }, {
    value: 'greek-ext',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Greek Extended', 'themeplus')
  }, {
    value: 'vietnamese',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Vietnamese', 'themeplus')
  }, {
    value: 'arabic',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Arabic', 'themeplus')
  }, {
    value: 'hebrew',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hebrew', 'themeplus')
  }, {
    value: 'thai',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Thai', 'themeplus')
  }, {
    value: 'devanagari',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Devanagari', 'themeplus')
  }];

  // Load Google Fonts
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (fontFamily) {
      // Only load if font-family control is shown
      loadGoogleFonts();
    }
  }, [fontFamily]);

  // Load Custom Fonts
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    loadCustomFonts();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (customFonts.length > 0) {
      const currentFont = value['font-family'];
      if (currentFont && customFonts.includes(currentFont)) {
        setActiveFontTab('custom');
      }
    }
  }, [customFonts]);

  // Load font preview when changed
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    // Only proceed after custom fonts are loaded
    if (!customFontsLoaded) return;

    // Check if this is a custom font that already has @font-face
    const isCustomFont = customFonts.includes(fontFamilyValue);
    const isStandardFont = standardFonts.includes(fontFamilyValue);

    // Only load from Google Fonts if:
    // 1. It's NOT a standard font (system font)
    // 2. It's NOT a custom font (already has @font-face)
    // 3. It's a Google Font
    if (fontFamilyValue && !isStandardFont && !isCustomFont) {
      _services_GoogleFontsService__WEBPACK_IMPORTED_MODULE_3__["default"].loadFontPreview(fontFamilyValue, subsetsValue);
    }
  }, [fontFamilyValue, subsetsValue, customFonts, customFontsLoaded]);
  const loadGoogleFonts = async () => {
    try {
      setLoadingFonts(true);
      const fonts = await _services_GoogleFontsService__WEBPACK_IMPORTED_MODULE_3__["default"].getFonts();
      setGoogleFonts(fonts);
    } catch (error) {
      console.error('Error loading Google Fonts:', error);
    } finally {
      setLoadingFonts(false);
    }
  };
  const loadCustomFonts = async () => {
    try {
      const allFonts = await _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_4__["default"].getFonts();
      const validatedFonts = await Promise.all(allFonts.map(async font => {
        const regularFileId = font.files?.regular?.id || font.files?.regular;
        if (!regularFileId) return null;
        try {
          await wp.media.attachment(regularFileId).fetch();
          return font.name;
        } catch (error) {
          return null;
        }
      }));
      setCustomFonts(validatedFonts.filter(name => name !== null));
    } catch (error) {
      console.error('Error loading custom fonts:', error);
    } finally {
      setCustomFontsLoaded(true);
    }
  };
  const handleChange = (key, newValue) => {
    onChange({
      ...value,
      [key]: newValue
    });
  };
  const handleFontSelect = font => {
    handleChange('font-family', font);

    // Only load from Google Fonts CDN if it's NOT a standard font AND NOT a custom font
    const isStandardFont = standardFonts.includes(font);
    const isCustomFont = customFonts.includes(font);
    if (!isStandardFont && !isCustomFont) {
      _services_GoogleFontsService__WEBPACK_IMPORTED_MODULE_3__["default"].loadFontPreview(font, subsetsValue);
    }
  };
  const getCurrentFontList = () => {
    switch (activeFontTab) {
      case 'standard':
        return standardFonts;
      case 'google':
        return googleFonts;
      case 'custom':
        return customFonts;
      default:
        return [];
    }
  };
  const getFontOptions = () => {
    const fonts = getCurrentFontList();
    return fonts.map(font => ({
      value: font,
      label: font
    }));
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field tpo-field--typography"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-field__label"
  }, label)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography tpo-field-card"
  }, fontFamily && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Family', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__control"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__font-tabs"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `tpo-typography__font-tab ${activeFontTab === 'google' ? 'active' : ''}`,
    onClick: () => setActiveFontTab('google')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Google Fonts', 'themeplus'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-typography__font-count"
  }, googleFonts.length)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `tpo-typography__font-tab ${activeFontTab === 'standard' ? 'active' : ''}`,
    onClick: () => setActiveFontTab('standard')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Standard', 'themeplus'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-typography__font-count"
  }, standardFonts.length)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `tpo-typography__font-tab ${activeFontTab === 'custom' ? 'active' : ''}`,
    onClick: () => setActiveFontTab('custom')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom', 'themeplus'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-typography__font-count"
  }, customFonts.length))), loadingFonts && activeFontTab === 'google' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__loading"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading fonts...', 'themeplus')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: fontFamilyValue,
    onChange: handleFontSelect,
    options: getFontOptions(),
    searchable: getFontOptions().length > 10,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select font...', 'themeplus'),
    className: "tpo-typography__font-select"
  }))), subsets && activeFontTab === 'google' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Character Sets', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: subsetsValue,
    onChange: val => {
      handleChange('subsets', val);
      if (fontFamilyValue && !standardFonts.includes(fontFamilyValue)) {
        _services_GoogleFontsService__WEBPACK_IMPORTED_MODULE_3__["default"].loadFontPreview(fontFamilyValue, val);
      }
    },
    options: subsetsOptions,
    multiple: true,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select character sets...', 'themeplus'),
    className: "tpo-typography__subsets-select"
  })), (fontSize || lineHeight || fontWeight || fontStyle || textTransform || letterSpacing) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__options"
  }, fontSize && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Size', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: fontSizeValue,
    onChange: val => handleChange('font-size', val),
    min: 8,
    max: 200,
    step: 1,
    unit: getUnit('font-size'),
    placeholder: "16"
  })), lineHeight && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Line Height', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: lineHeightValue,
    onChange: val => handleChange('line-height', val),
    min: 0.5,
    max: 5,
    step: 0.1,
    placeholder: "1.5"
  })), fontWeight && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Weight', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: fontWeightValue,
    onChange: val => handleChange('font-weight', val),
    options: fontWeights,
    className: "tpo-typography__select"
  })), fontStyle && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_ButtonSet__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Style', 'themeplus'),
    value: value['font-style'] || 'normal',
    onChange: val => handleChange('font-style', val),
    options: fontStyleOptions
  })), textTransform && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Text Transform', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Select__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: textTransformValue,
    onChange: val => handleChange('text-transform', val),
    options: textTransformOptions,
    className: "tpo-typography__select"
  })), letterSpacing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-typography__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Letter Spacing', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Spinner__WEBPACK_IMPORTED_MODULE_6__["default"], {
    value: letterSpacingValue,
    onChange: val => handleChange('letter-spacing', val),
    min: -5,
    max: 20,
    step: 0.1,
    unit: "px",
    placeholder: "0"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__preview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__preview-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-typography__preview-text",
    style: {
      fontFamily: fontFamilyValue,
      fontSize: fontSize ? `${fontSizeValue}${getUnit('font-size')}` : undefined,
      fontWeight: fontWeight ? fontWeightValue : undefined,
      lineHeight: lineHeight ? lineHeightValue : undefined,
      letterSpacing: letterSpacing ? `${letterSpacingValue}${getUnit('letter-spacing')}` : undefined,
      textTransform: textTransform ? textTransformValue : undefined,
      fontStyle: fontStyle ? fontStyleValue : undefined
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The quick brown fox jumps over the lazy dog', 'themeplus'))))), help && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-field__help"
  }, help));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Typography);

/***/ }),

/***/ "./src/js/admin/components/Fields/index.js":
/*!*************************************************!*\
  !*** ./src/js/admin/components/Fields/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BackgroundField: () => (/* reexport safe */ _BackgroundField__WEBPACK_IMPORTED_MODULE_27__["default"]),
/* harmony export */   BorderField: () => (/* reexport safe */ _BorderField__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   ButtonSet: () => (/* reexport safe */ _ButtonSet__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   CheckboxField: () => (/* reexport safe */ _CheckboxField__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   CodeEditorField: () => (/* reexport safe */ _CodeEditorField__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   ColorPicker: () => (/* reexport safe */ _ColorPicker__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   DatePickerField: () => (/* reexport safe */ _DatePickerField__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   Dimensions: () => (/* reexport safe */ _Dimensions__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   GalleryField: () => (/* reexport safe */ _GalleryField__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   GradientPickerField: () => (/* reexport safe */ _GradientPickerField__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   GroupField: () => (/* reexport safe */ _GroupField__WEBPACK_IMPORTED_MODULE_29__["default"]),
/* harmony export */   IconField: () => (/* reexport safe */ _IconField__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   ImageField: () => (/* reexport safe */ _ImageField__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   InfoField: () => (/* reexport safe */ _InfoField__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   LinkField: () => (/* reexport safe */ _LinkField__WEBPACK_IMPORTED_MODULE_28__["default"]),
/* harmony export */   NumberField: () => (/* reexport safe */ _NumberField__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   RadioField: () => (/* reexport safe */ _RadioField__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   RawField: () => (/* reexport safe */ _RawField__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   RepeaterField: () => (/* reexport safe */ _RepeaterField__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   SectionField: () => (/* reexport safe */ _SectionField__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   SelectField: () => (/* reexport safe */ _SelectField__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   SelectImageField: () => (/* reexport safe */ _SelectImageField__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   ShortcodeField: () => (/* reexport safe */ _ShortcodeField__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   SliderField: () => (/* reexport safe */ _SliderField__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   SocialMediaField: () => (/* reexport safe */ _SocialMediaField__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   SpacingField: () => (/* reexport safe */ _SpacingField__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   TextField: () => (/* reexport safe */ _TextField__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   TextareaField: () => (/* reexport safe */ _TextareaField__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   ToggleField: () => (/* reexport safe */ _ToggleField__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   Typography: () => (/* reexport safe */ _Typography__WEBPACK_IMPORTED_MODULE_16__["default"])
/* harmony export */ });
/* harmony import */ var _TextField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextField */ "./src/js/admin/components/Fields/TextField.jsx");
/* harmony import */ var _TextareaField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextareaField */ "./src/js/admin/components/Fields/TextareaField.jsx");
/* harmony import */ var _NumberField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NumberField */ "./src/js/admin/components/Fields/NumberField.jsx");
/* harmony import */ var _SliderField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SliderField */ "./src/js/admin/components/Fields/SliderField.jsx");
/* harmony import */ var _SelectField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SelectField */ "./src/js/admin/components/Fields/SelectField.jsx");
/* harmony import */ var _ButtonSet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ButtonSet */ "./src/js/admin/components/Fields/ButtonSet.jsx");
/* harmony import */ var _RadioField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RadioField */ "./src/js/admin/components/Fields/RadioField.jsx");
/* harmony import */ var _CheckboxField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CheckboxField */ "./src/js/admin/components/Fields/CheckboxField.jsx");
/* harmony import */ var _SelectImageField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SelectImageField */ "./src/js/admin/components/Fields/SelectImageField.jsx");
/* harmony import */ var _ToggleField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ToggleField */ "./src/js/admin/components/Fields/ToggleField.jsx");
/* harmony import */ var _ColorPicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ColorPicker */ "./src/js/admin/components/Fields/ColorPicker.jsx");
/* harmony import */ var _GradientPickerField__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./GradientPickerField */ "./src/js/admin/components/Fields/GradientPickerField.jsx");
/* harmony import */ var _ImageField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ImageField */ "./src/js/admin/components/Fields/ImageField.jsx");
/* harmony import */ var _IconField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./IconField */ "./src/js/admin/components/Fields/IconField.jsx");
/* harmony import */ var _GalleryField__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./GalleryField */ "./src/js/admin/components/Fields/GalleryField.jsx");
/* harmony import */ var _Dimensions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Dimensions */ "./src/js/admin/components/Fields/Dimensions.jsx");
/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Typography */ "./src/js/admin/components/Fields/Typography.jsx");
/* harmony import */ var _SpacingField__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./SpacingField */ "./src/js/admin/components/Fields/SpacingField.jsx");
/* harmony import */ var _BorderField__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./BorderField */ "./src/js/admin/components/Fields/BorderField.jsx");
/* harmony import */ var _InfoField__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./InfoField */ "./src/js/admin/components/Fields/InfoField.jsx");
/* harmony import */ var _SectionField__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./SectionField */ "./src/js/admin/components/Fields/SectionField.jsx");
/* harmony import */ var _ShortcodeField__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ShortcodeField */ "./src/js/admin/components/Fields/ShortcodeField.jsx");
/* harmony import */ var _RawField__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./RawField */ "./src/js/admin/components/Fields/RawField.jsx");
/* harmony import */ var _DatePickerField__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./DatePickerField */ "./src/js/admin/components/Fields/DatePickerField.jsx");
/* harmony import */ var _SocialMediaField__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./SocialMediaField */ "./src/js/admin/components/Fields/SocialMediaField.jsx");
/* harmony import */ var _CodeEditorField__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./CodeEditorField */ "./src/js/admin/components/Fields/CodeEditorField.jsx");
/* harmony import */ var _RepeaterField__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./RepeaterField */ "./src/js/admin/components/Fields/RepeaterField.jsx");
/* harmony import */ var _BackgroundField__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./BackgroundField */ "./src/js/admin/components/Fields/BackgroundField.jsx");
/* harmony import */ var _LinkField__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./LinkField */ "./src/js/admin/components/Fields/LinkField.jsx");
/* harmony import */ var _GroupField__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./GroupField */ "./src/js/admin/components/Fields/GroupField.jsx");
/**
 * ThemePlus Fields - Central Export.
 * Export all 30 field components from a single file
 *
 * File: src/js/admin/components/Fields/index.js
 */

// Text Fields (2)



// Number Fields (2)



// Choice Fields (5)






// Toggle Fields (1)


// Color Fields (2)



// Media Fields (3)




// Layout Fields (4)





// Special Fields (4)





// Date Fields (1)


// Social Fields (1)


// Code Fields (1)


// Advanced Fields (4)





/***/ }),

/***/ "./src/js/admin/components/Layout/Body.jsx":
/*!*************************************************!*\
  !*** ./src/js/admin/components/Layout/Body.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_SettingsContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/SettingsContext */ "./src/js/admin/context/SettingsContext.jsx");
/* harmony import */ var _Common_FieldRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/FieldRenderer */ "./src/js/admin/components/Common/FieldRenderer.jsx");
/* harmony import */ var _Common_SearchResults__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/SearchResults */ "./src/js/admin/components/Common/SearchResults.jsx");
/* harmony import */ var _Sections_ImportExport__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Sections/ImportExport */ "./src/js/admin/components/Sections/ImportExport.jsx");
/* harmony import */ var _Sections_CustomFontUploader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Sections/CustomFontUploader */ "./src/js/admin/components/Sections/CustomFontUploader.jsx");
/* harmony import */ var _DevPanel_DevPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../DevPanel/DevPanel */ "./src/js/admin/components/DevPanel/DevPanel.jsx");
/* harmony import */ var _utils_fieldHelpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/fieldHelpers */ "./src/js/admin/utils/fieldHelpers.js");
/* harmony import */ var _hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../hooks/useScrollbar */ "./src/js/admin/hooks/useScrollbar.js");
/* harmony import */ var _BodySkeleton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./BodySkeleton */ "./src/js/admin/components/Layout/BodySkeleton.jsx");

/**
 * ThemePlus Body Component
 *
 * File: src/js/admin/components/Layout/Body.jsx
 */











function Body({
  sections = [],
  activeTab,
  showModal,
  searchQuery = '',
  onClearSearch
}) {
  const {
    options,
    setOptions,
    isLoaded
  } = (0,_context_SettingsContext__WEBPACK_IMPORTED_MODULE_2__.useSettings)();

  // Scrollbar hook
  const {
    scrollRef,
    scrollbarClass
  } = (0,_hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_9__["default"])({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: true // Body is always visible
  });
  const getActiveContent = () => {
    if (searchQuery && searchQuery.length >= 2) return null;

    // Custom Fonts Section
    if (activeTab === 'custom-fonts') {
      return {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Custom Fonts', 'themeplus'),
        isCustomFonts: true
      };
    }

    // Import/Export Section
    if (activeTab === 'import-export') {
      return {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Import/Export Settings', 'themeplus'),
        isImportExport: true
      };
    }

    // Dev Panel Section
    if (activeTab === 'developer-panel') {
      return {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Developer Panel', 'themeplus'),
        isDevPanel: true
      };
    }

    // Subsection handling
    if (activeTab.includes('__')) {
      const [sectionId, subsectionId] = activeTab.split('__');
      const section = sections.find(s => s.id === sectionId);
      if (!section) return null;
      const subsection = section.subsections?.find(sub => sub.id === subsectionId);
      // Subsection
      if (subsection) return {
        title: subsection.title,
        fields: subsection.fields || [],
        excerpt: subsection.excerpt || ''
      };
    }

    // Regular section
    const section = sections.find(s => s.id === activeTab);
    // Regular section
    if (section) return {
      title: section.title,
      fields: section.fields || [],
      excerpt: section.excerpt || ''
    };
    return null;
  };

  // Build defaults map from all fields across sections
  const defaults = {};
  sections.forEach(section => {
    const allFields = [...(section.fields || []), ...(section.subsections || []).flatMap(sub => sub.fields || [])];
    allFields.forEach(f => {
      if (f.default !== undefined) defaults[f.id] = f.default;
    });
  });

  // Search Results
  if (searchQuery && searchQuery.length >= 2) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      ref: scrollRef,
      className: `tpo-body ${scrollbarClass}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-body__content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_SearchResults__WEBPACK_IMPORTED_MODULE_4__["default"], {
      searchQuery: searchQuery,
      sections: sections,
      onClearSearch: onClearSearch
    })));
  }

  // Options not yet loaded from API → show skeleton
  if (!isLoaded) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      ref: scrollRef,
      className: `tpo-body ${scrollbarClass}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-body__content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_BodySkeleton__WEBPACK_IMPORTED_MODULE_10__["default"], null)));
  }
  const activeContent = getActiveContent();

  // Empty State
  if (!activeContent) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      ref: scrollRef,
      className: `tpo-body ${scrollbarClass}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-body__content"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-body__empty"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a tab to view settings.', 'themeplus')))));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    ref: scrollRef,
    className: `tpo-body ${scrollbarClass}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-body__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-body__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "tpo-body__section-title"
  }, activeContent.title), activeContent.excerpt && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-body__section-excerpt",
    dangerouslySetInnerHTML: {
      __html: activeContent.excerpt
    }
  }), activeContent.isCustomFonts ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sections_CustomFontUploader__WEBPACK_IMPORTED_MODULE_6__["default"], null) : /* Import/Export Section */
  activeContent.isImportExport ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sections_ImportExport__WEBPACK_IMPORTED_MODULE_5__["default"], {
    showModal: showModal
  }) : /* Developer Panel */
  activeContent.isDevPanel ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DevPanel_DevPanel__WEBPACK_IMPORTED_MODULE_7__["default"], null) : /* Regular Fields */
  activeContent.fields.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-body__fields"
  }, !isLoaded ? null : activeContent.fields.map(field => {
    if (!(0,_utils_fieldHelpers__WEBPACK_IMPORTED_MODULE_8__.shouldShowField)(field, options, defaults)) return null;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FieldRenderer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      key: field.id,
      field: field,
      value: options[field.id],
      onUpdate: newValue => {
        setOptions(prev => ({
          ...prev,
          [field.id]: newValue
        }));
      },
      showModal: showModal
    });
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-body__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No fields available for this section.', 'themeplus'))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Body);

/***/ }),

/***/ "./src/js/admin/components/Layout/BodySkeleton.jsx":
/*!*********************************************************!*\
  !*** ./src/js/admin/components/Layout/BodySkeleton.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Body Skeleton
 * File: src/js/admin/components/Layout/BodySkeleton.jsx
 */

function BodySkeleton() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-body__skeleton"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__title"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__excerpt"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__fields"
  }, [...Array(5)].map((_, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: "tpo-skeleton__field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__field-label"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__field-input"
  })))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BodySkeleton);

/***/ }),

/***/ "./src/js/admin/components/Layout/Footer.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/Layout/Footer.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Footer Component
 *
 * File: src/js/admin/components/Layout/Footer.jsx
 */




function Footer({
  onSave,
  onResetSection,
  onResetAll
}) {
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Read from localStorage — default ON (true)
  const [preloaderEnabled, setPreloaderEnabled] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => {
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "tpo-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-footer__left"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-footer__social"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://www.facebook.com/FrontTheme/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "tpo-footer__social-link",
    "aria-label": "Facebook"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-brands fa-facebook-f"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://x.com/FrontTheme",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "tpo-footer__social-link",
    "aria-label": "X"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-brands fa-x-twitter"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://dribbble.com/FrontTheme",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "tpo-footer__social-link",
    "aria-label": "Dribbble"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-brands fa-dribbble"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://www.behance.net/FrontTheme",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "tpo-footer__social-link",
    "aria-label": "Behance"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-brands fa-behance"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://www.fronttheme.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "tpo-footer__social-link",
    "aria-label": "Website"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-earth-americas"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-footer__center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: `tpo-footer__preloader-toggle ${preloaderEnabled ? 'is-enabled' : 'is-disabled'}`,
    onClick: handlePreloaderToggle,
    type: "button",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle preloader', 'themeplus'),
    title: preloaderEnabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preloader ON — click to disable', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preloader OFF — click to enable', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-footer__preloader-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: `fa-solid ${preloaderEnabled ? 'fa-spinner' : 'fa-ban'}`
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-footer__preloader-label"
  }, preloaderEnabled ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preloader: ON', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preloader: OFF', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-footer__right"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-footer__actions tpo-ui-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "gradient",
    onClick: handleSave,
    loading: saving
  }, saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saving...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save Changes', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "secondary",
    onClick: onResetSection
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset Section', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    color: "danger",
    onClick: onResetAll
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset All', 'themeplus')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/js/admin/components/Layout/Header.jsx":
/*!***************************************************!*\
  !*** ./src/js/admin/components/Layout/Header.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_ThemeContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/ThemeContext */ "./src/js/admin/context/ThemeContext.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");

/**
 * ThemePlus Header Component
 *
 * File: src/js/admin/components/Layout/Header.jsx
 */






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
function Header({
  onSave,
  onResetSection,
  onResetAll,
  activeSection = '',
  hasUnsavedChanges = false
}) {
  const {
    theme,
    toggleTheme
  } = (0,_context_ThemeContext__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [showIndicator, setShowIndicator] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [wasSaved, setWasSaved] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Show/hide indicator based on changes
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "tpo-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-header__left"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "tpo-header__theme-toggle",
    onClick: toggleTheme,
    type: "button",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Toggle theme', 'themeplus'),
    title: theme === 'light' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Switch to dark mode', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Switch to light mode', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-header__theme-icon"
  }, theme === 'light' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-moon"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-sun"
  }))), showIndicator && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `tpo-header__save-indicator ${hasUnsavedChanges ? 'tpo-header__save-indicator--unsaved' : 'tpo-header__save-indicator--saved'}`,
    title: hasUnsavedChanges ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You have unsaved changes', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All changes saved', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-header__save-dot"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-header__save-text"
  }, hasUnsavedChanges ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unsaved', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saved', 'themeplus'))), activeSection && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-header__section-name"
  }, activeSection)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-header__right"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-header__actions tpo-ui-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "gradient",
    onClick: handleSave,
    loading: saving
  }, saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Saving...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save Changes', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "secondary",
    onClick: onResetSection
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset Section', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "danger",
    onClick: onResetAll
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset All', 'themeplus')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/js/admin/components/Layout/MainWrapper.jsx":
/*!********************************************************!*\
  !*** ./src/js/admin/components/Layout/MainWrapper.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Main Wrapper Component
 *
 * File: src/js/admin/components/Layout/MainWrapper.jsx
 */

/**
 * Main Wrapper Component
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 */
function MainWrapper({
  children
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-main-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-container"
  }, children));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainWrapper);

/***/ }),

/***/ "./src/js/admin/components/Layout/Sidebar.jsx":
/*!****************************************************!*\
  !*** ./src/js/admin/components/Layout/Sidebar.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useScrollbar */ "./src/js/admin/hooks/useScrollbar.js");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _SidebarSkeleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SidebarSkeleton */ "./src/js/admin/components/Layout/SidebarSkeleton.jsx");

/**
 * ThemePlus Sidebar Component
 *
 * File: src/js/admin/components/Layout/Sidebar.jsx
 */






function Sidebar({
  sections = [],
  activeTab,
  onTabChange,
  searchQuery = '',
  onSearchChange,
  isLoaded = false
}) {
  const [mainWalkerStyle, setMainWalkerStyle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({});
  const subWalkerRefs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)({});

  // Scrollbar hooks for both scrollable areas
  const {
    scrollRef: sidebarRef,
    scrollbarClass: sidebarScrollClass
  } = (0,_hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__["default"])({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: true
  });
  const {
    scrollRef: navRef,
    scrollbarClass: navScrollClass
  } = (0,_hooks_useScrollbar__WEBPACK_IMPORTED_MODULE_3__["default"])({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: true
  });

  // Update MAIN walker
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const updateMainWalker = () => {
      if (!navRef.current) return;
      const activeMainLink = navRef.current.querySelector('.tpo-sidebar__link--active');
      if (activeMainLink && !activeTab.includes('__')) {
        const listElement = navRef.current.querySelector('.tpo-sidebar__list');
        if (!listElement) return;
        const listRect = listElement.getBoundingClientRect();
        const linkRect = activeMainLink.getBoundingClientRect();
        setMainWalkerStyle({
          top: linkRect.top - listRect.top,
          height: linkRect.height,
          opacity: 1
        });
      } else {
        setMainWalkerStyle({
          opacity: 0
        });
      }
    };
    const timer = setTimeout(updateMainWalker, 50);
    return () => clearTimeout(timer);
  }, [activeTab, sections, navRef]);

  // Get sub-walker style for a specific section
  const getSubWalkerStyle = sectionId => {
    if (!activeTab.startsWith(sectionId + '__')) {
      return {
        opacity: 0
      };
    }
    const sublistRef = subWalkerRefs.current[sectionId];
    if (!sublistRef) return {
      opacity: 0
    };
    const activeSublink = sublistRef.querySelector('.tpo-sidebar__sublink--active');
    if (!activeSublink) return {
      opacity: 0
    };
    const sublistRect = sublistRef.getBoundingClientRect();
    const sublinkRect = activeSublink.getBoundingClientRect();
    return {
      top: sublinkRect.top - sublistRect.top,
      height: sublinkRect.height,
      opacity: 1
    };
  };

  // Force re-render when activeTab changes
  const [, forceUpdate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({});
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setTimeout(() => forceUpdate({}), 50);
  }, [activeTab]);

  // Keyboard shortcuts
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const handleKeyDown = e => {
      // Cmd+K or Ctrl+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.tpo-sidebar__search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Escape to clear search
      if (e.key === 'Escape' && searchQuery) {
        handleClearSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);
  const handleSearchChange = e => {
    onSearchChange(e.target.value);
  };
  const handleClearSearch = () => {
    onSearchChange('');
  };

  // Clear search when tab is clicked
  const handleTabClick = sectionId => {
    if (searchQuery) {
      onSearchChange('');
    }

    // If section has subsections, activate first subsection automatically
    const section = sections.find(s => s.id === sectionId);
    if (section?.subsections?.length > 0) {
      onTabChange(`${sectionId}__${section.subsections[0].id}`);
    } else {
      onTabChange(sectionId);
    }
  };

  // Clear search when sub-tab is clicked
  const handleSubTabClick = (parentId, subSectionId) => {
    if (searchQuery) {
      onSearchChange('');
    }
    onTabChange(`${parentId}__${subSectionId}`);
  };
  const isTabActive = sectionId => {
    return activeTab === sectionId || activeTab.startsWith(`${sectionId}__`);
  };

  // Get OS-specific icon for search shortcut
  function getOSIcon() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes('Mac')) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1495.18 700"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M590.4,0H109.6C49.07,0,0,49.07,0,109.6v480.81c0,60.53,49.07,109.6,109.6,109.6h480.81c60.53,0,109.6-49.07,109.6-109.6V109.6c0-60.53-49.07-109.6-109.6-109.6ZM109.6,650c-32.86,0-59.6-26.73-59.6-59.6V109.6c0-32.86,26.73-59.6,59.6-59.6h480.81c32.86,0,59.6,26.73,59.6,59.6v480.81c0,32.86-26.73,59.6-59.6,59.6H109.6Z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M475,387.5h-37.5v-75h37.5c48.36,0,87.5-39.14,87.5-87.5s-39.14-87.5-87.5-87.5-87.5,39.14-87.5,87.5v37.5h-75v-37.5c0-48.36-39.14-87.5-87.5-87.5s-87.5,39.14-87.5,87.5,39.14,87.5,87.5,87.5h37.5v75h-37.5c-48.36,0-87.5,39.14-87.5,87.5s39.14,87.5,87.5,87.5,87.5-39.14,87.5-87.5v-37.5h75v37.5c0,48.36,39.14,87.5,87.5,87.5s87.5-39.14,87.5-87.5-39.14-87.5-87.5-87.5ZM437.5,225c0-20.7,16.8-37.5,37.5-37.5s37.5,16.8,37.5,37.5-16.8,37.5-37.5,37.5h-37.5v-37.5ZM262.5,475c0,20.7-16.8,37.5-37.5,37.5s-37.5-16.8-37.5-37.5,16.8-37.5,37.5-37.5h37.5v37.5ZM262.5,262.5h-37.5c-20.7,0-37.5-16.8-37.5-37.5s16.8-37.5,37.5-37.5,37.5,16.8,37.5,37.5v37.5ZM387.5,387.5h-75v-75h75v75ZM475,512.5c-20.7,0-37.5-16.8-37.5-37.5v-37.5h37.5c20.7,0,37.5,16.8,37.5,37.5s-16.8,37.5-37.5,37.5Z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M1385.58,0h-480.81c-60.53,0-109.6,49.07-109.6,109.6v480.81c0,60.53,49.07,109.6,109.6,109.6h480.81c60.53,0,109.6-49.07,109.6-109.6V109.6c0-60.53-49.07-109.6-109.6-109.6ZM904.77,650c-32.86,0-59.6-26.73-59.6-59.6V109.6c0-32.86,26.73-59.6,59.6-59.6h480.81c32.86,0,59.6,26.73,59.6,59.6v480.81c0,32.86-26.73,59.6-59.6,59.6h-480.81Z"
      }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("polygon", {
        points: "1074.2 350 1293.19 562.5 1221.4 562.5 1047.16 393.44 1047.16 562.5 997.16 562.5 997.16 137.5 1047.16 137.5 1047.16 306.56 1221.4 137.5 1293.2 137.5 1074.2 350"
      }));
    } else if (userAgent.includes('Win')) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 882.78 382.32"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M377.75,0H40C17.91,0,0,17.91,0,40v302.32c0,22.09,17.91,40,40,40h337.75c22.09,0,40-17.91,40-40V40c0-22.09-17.91-40-40-40ZM397.75,289.86c0,11.05-8.95,20-20,20H40c-11.05,0-20-8.95-20-20V40c0-11.05,8.95-20,20-20h337.75c11.05,0,20,8.95,20,20v249.86ZM89.52,141.89c-3.36,7.21-5.05,16.01-5.05,26.4s1.68,19.32,5.05,26.52c3.36,7.21,7.97,12.65,13.82,16.34,5.85,3.69,12.43,5.53,19.75,5.53,4.05,0,7.91-.55,11.57-1.67,3.66-1.11,6.97-2.75,9.94-4.93,2.97-2.18,5.48-4.85,7.55-8.01,2.07-3.16,3.5-6.8,4.29-10.9l19.56.06c-1.05,6.33-3.06,12.14-6.05,17.44-2.99,5.3-6.81,9.87-11.47,13.7s-9.98,6.8-15.95,8.89c-5.98,2.09-12.5,3.14-19.56,3.14-11.12,0-21.02-2.65-29.71-7.95-8.69-5.3-15.54-12.89-20.53-22.78-4.99-9.89-7.49-21.68-7.49-35.38s2.51-25.55,7.52-35.42c5.02-9.87,11.87-17.45,20.56-22.75,8.69-5.3,18.58-7.95,29.65-7.95,6.81,0,13.17.97,19.09,2.92,5.91,1.95,11.23,4.8,15.95,8.55,4.72,3.75,8.63,8.32,11.72,13.7,3.09,5.38,5.18,11.53,6.27,18.45h-19.56c-.75-4.19-2.15-7.88-4.2-11.06-2.05-3.18-4.56-5.89-7.52-8.11-2.97-2.22-6.28-3.9-9.94-5.03s-7.53-1.7-11.63-1.7c-7.4,0-14.01,1.86-19.84,5.59-5.83,3.73-10.43,9.2-13.79,16.4ZM241.01,216.36l3.38,15.52c-1.09.42-2.63.85-4.64,1.29s-4.51.68-7.52.72c-4.93.08-9.53-.8-13.79-2.64-4.26-1.84-7.71-4.69-10.34-8.55-2.63-3.85-3.95-8.69-3.95-14.52v-57h-14.11v-15.08h14.11v-23.13h18.74v23.13h19.75v15.08h-19.75v53.11c0,3.65.54,6.38,1.63,8.2,1.09,1.82,2.5,3.06,4.23,3.71,1.73.65,3.62.97,5.67.97,1.5,0,2.82-.1,3.95-.31,1.13-.21,2.01-.38,2.63-.5ZM311.06,134.78c1.61.08,2.87.19,3.79.31v17.98c-.75-.21-2.09-.45-4.01-.72-1.92-.27-3.85-.41-5.77-.41-4.43,0-8.37.93-11.82,2.8-3.45,1.86-6.17,4.44-8.18,7.73-2.01,3.29-3.01,7.03-3.01,11.22v58.95h-18.74v-96.54h18.12v15.33h1c1.75-5.19,4.86-9.29,9.31-12.29,4.45-3,9.5-4.49,15.14-4.49,1.17,0,2.56.04,4.17.13ZM331.15,103.92h18.74v128.72h-18.74V103.92ZM842.78,0h-337.75c-22.09,0-40,17.91-40,40v302.32c0,22.09,17.91,40,40,40h337.75c22.09,0,40-17.91,40-40V40c0-22.09-17.91-40-40-40ZM862.78,289.86c0,11.05-8.95,20-20,20h-337.75c-11.05,0-20-8.95-20-20V40c0-11.05,8.95-20,20-20h337.75c11.05,0,20,8.95,20,20v249.86ZM676.76,161.87l51.97,70.77h-23.32l-41.5-57.51-15.17,17.47v40.04h-19.37V103.92h19.37v61.47h1.57l53.85-61.47h24.39l-51.78,57.95Z"
      }));
    } else {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 966.4 966.4"
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
        d: "M954.53,897.26l-163.97-163.96c28.24-33.81,51.19-71.4,68.44-112.18,23.32-55.14,35.15-113.7,35.15-174.04s-11.83-118.89-35.15-174.04c-22.52-53.24-54.75-101.05-95.8-142.1-41.05-41.05-88.86-73.28-142.1-95.8C565.97,11.83,507.42,0,447.08,0s-118.89,11.83-174.04,35.15c-53.24,22.52-101.05,54.75-142.1,95.8s-73.28,88.85-95.8,142.1C11.83,328.19,0,386.74,0,447.08s11.83,118.89,35.15,174.04c22.52,53.24,54.75,101.05,95.8,142.1,41.05,41.05,88.85,73.28,142.1,95.8,55.14,23.32,113.7,35.15,174.04,35.15s118.89-11.83,174.04-35.15c40.78-17.25,78.37-40.2,112.18-68.44l163.97,163.96c7.91,7.91,18.27,11.86,28.64,11.86s20.73-3.95,28.64-11.86c15.82-15.82,15.82-41.46,0-57.28ZM447.08,813.16c-97.78,0-189.71-38.08-258.86-107.22-69.14-69.14-107.22-161.07-107.22-258.86s38.08-189.71,107.22-258.86c69.14-69.14,161.07-107.22,258.86-107.22s189.71,38.08,258.86,107.22c69.14,69.14,107.22,161.07,107.22,258.86s-38.08,189.71-107.22,258.86c-69.14,69.14-161.07,107.22-258.86,107.22Z"
      }));
    }
  }
  if (!isLoaded) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
      ref: sidebarRef,
      className: `tpo-sidebar ${sidebarScrollClass}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_SidebarSkeleton__WEBPACK_IMPORTED_MODULE_5__["default"], null));
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    ref: sidebarRef,
    className: `tpo-sidebar ${sidebarScrollClass}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__brand"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__logo"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: `${themePlusData.imagesUrl}themeplus.svg`,
    alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ThemePlus Logo', 'themeplus'),
    className: "tpo-sidebar__logo-image"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "tpo-sidebar__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ThemePlus', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-sidebar__version"
  }, window.themePlusData?.version || '1.0.0')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "tpo-sidebar__search-input",
    placeholder: `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search fields...', 'themeplus')}`,
    value: searchQuery,
    onChange: handleSearchChange
  }), searchQuery && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "small",
    onClick: handleClearSearch,
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear search', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-xmark"
  })), !searchQuery && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-search-key-short-icon"
  }, getOSIcon())), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    ref: navRef,
    className: `tpo-sidebar__nav ${navScrollClass}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "tpo-sidebar__list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__main-walker",
    style: {
      transform: `translateY(${mainWalkerStyle.top || 0}px)`,
      height: `${mainWalkerStyle.height || 0}px`,
      opacity: mainWalkerStyle.opacity || 0
    }
  }), sections.map(section => {
    const hasSubsections = section.subsections && section.subsections.length > 0;
    const subWalkerStyle = getSubWalkerStyle(section.id);
    const isExpanded = hasSubsections && isTabActive(section.id);
    const itemClasses = ['tpo-sidebar__item', hasSubsections && 'tpo-sidebar__item--has-children', isExpanded && 'tpo-sidebar__item--expanded'].filter(Boolean).join(' ');
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: section.id,
      className: itemClasses
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `tpo-sidebar__link ${isTabActive(section.id) ? 'tpo-sidebar__link--active' : ''}`,
      onClick: () => handleTabClick(section.id),
      type: "button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-sidebar__link-icon"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: `fas fa-${section.icon}`
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-sidebar__link-text"
    }, section.title), hasSubsections && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-sidebar__link-arrow"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-chevron-right"
    }))), hasSubsections && isTabActive(section.id) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
      className: "tpo-sidebar__sublist",
      ref: el => {
        if (el) {
          subWalkerRefs.current[section.id] = el;
        }
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-sidebar__sub-walker",
      style: {
        transform: `translateY(${subWalkerStyle.top || 0}px)`,
        height: `${subWalkerStyle.height || 0}px`,
        opacity: subWalkerStyle.opacity || 0
      }
    }), section.subsections.map(subSection => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      key: subSection.id,
      className: "tpo-sidebar__subitem"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: `tpo-sidebar__sublink ${activeTab === `${section.id}__${subSection.id}` ? 'tpo-sidebar__sublink--active' : ''}`,
      onClick: () => handleSubTabClick(section.id, subSection.id),
      type: "button"
    }, subSection.icon && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-sidebar__sublink-icon"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: `fas fa-${subSection.icon}`
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-sidebar__sublink-text"
    }, subSection.title))))));
  }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sidebar);

/***/ }),

/***/ "./src/js/admin/components/Layout/SidebarSkeleton.jsx":
/*!************************************************************!*\
  !*** ./src/js/admin/components/Layout/SidebarSkeleton.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * ThemePlus Sidebar Skeleton
 * File: src/js/admin/components/Layout/SidebarSkeleton.jsx
 */

function SidebarSkeleton() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-sidebar__skeleton"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__brand"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__logo"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__brand-info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__brand-name"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__brand-version"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__search"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-skeleton__nav"
  }, [...Array(7)].map((_, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: "tpo-skeleton__nav-item",
    style: {
      width: `${75 - i * 5}%`
    }
  }))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidebarSkeleton);

/***/ }),

/***/ "./src/js/admin/components/Sections/CustomFontUploader.jsx":
/*!*****************************************************************!*\
  !*** ./src/js/admin/components/Sections/CustomFontUploader.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Common_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Common/Modal */ "./src/js/admin/components/Common/Modal.jsx");
/* harmony import */ var _Common_Notice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Common/Notice */ "./src/js/admin/components/Common/Notice.jsx");
/* harmony import */ var _Common_Dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Common/Dialog */ "./src/js/admin/components/Common/Dialog.jsx");
/* harmony import */ var _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/CustomFontsService */ "./src/js/admin/services/CustomFontsService.js");
/* harmony import */ var _Common_TextInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Common/TextInput */ "./src/js/admin/components/Common/TextInput.jsx");
/* harmony import */ var _Common_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Common/Button */ "./src/js/admin/components/Common/Button.jsx");
/* harmony import */ var _Common_FileUpload__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Common/FileUpload */ "./src/js/admin/components/Common/FileUpload.jsx");

/**
 * ThemePlus Custom Font Uploader
 *
 * File: src/js/admin/components/Sections/CustomFontUploader.jsx
 *
 * @package ThemePlus
 * @since 1.0.0
 */










function CustomFontUploader({
  onFontsUpdated
}) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Data state
  const [fonts, setFonts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(true);

  // Modal state
  const [showModal, setShowModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [editingFont, setEditingFont] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [modalError, setModalError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);

  // Form state
  const [fontName, setFontName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [fontFiles, setFontFiles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)({
    regular: {
      id: null,
      filename: null
    },
    italic: {
      id: null,
      filename: null
    },
    bold: {
      id: null,
      filename: null
    },
    bold_italic: {
      id: null,
      filename: null
    }
  });

  // Action state
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [deleting, setDeleting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [deleteConfirm, setDeleteConfirm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);

  // Notice state
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    loadFonts().catch(error => {
      console.error('Failed to load fonts:', error);
    });
  }, []);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  /**
   * Clean font name from filename
   * - Replace hyphens and underscores with spaces
   * - Capitalize first letter of lowercase words only
   * - Preserve PascalCase and UPPERCASE
   */
  const cleanFontName = filename => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    const withSpaces = nameWithoutExt.replace(/[-_]/g, ' ');
    const words = withSpaces.split(' ');
    const processedWords = words.map(word => {
      if (!word) return '';
      if (word === word.toLowerCase()) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    });
    return processedWords.join(' ').replace(/\s+/g, ' ').trim();
  };

  /**
   * Get file ID from either format
   */
  const getFileId = file => {
    if (!file) return null;
    if (typeof file === 'object' && file.id) return file.id;
    if (typeof file === 'number') return file;
    return null;
  };

  /**
   * Get filename from file data
   */
  const getFilename = file => {
    if (!file) return null;
    if (typeof file === 'object' && file.filename) return file.filename;
    return null;
  };

  /**
   * Show page-level notice
   */
  const showNotice = (message, type = 'success') => {
    setNotice({
      message,
      type
    });
    setTimeout(() => setNotice(null), 3000);
  };

  /**
   * Show modal-level error
   */
  const showModalError = message => {
    setModalError(message);
    setTimeout(() => setModalError(null), 5000);
  };

  // ============================================================================
  // VALIDATION FUNCTIONS
  // ============================================================================

  /**
   * Check if font name already exists
   */
  const checkDuplicateName = (name, excludeId = null) => {
    return fonts.some(font => font.name.toLowerCase() === name.toLowerCase() && font.id !== excludeId);
  };

  /**
   * Check if file is already used
   */
  const checkDuplicateFile = (fileId, excludeId = null) => {
    return fonts.some(font => {
      if (font.id === excludeId) return false;
      const fontFileIds = Object.values(font.files || {}).map(file => {
        return getFileId(file);
      }).filter(id => id !== null);
      return fontFileIds.includes(fileId);
    });
  };

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  /**
   * Load font CSS dynamically for preview
   */
  const loadFontCSS = font => {
    if (!font || !font.files) return;
    const regularFileId = getFileId(font.files.regular);
    if (!regularFileId) return;
    const styleId = `custom-font-${font.id}`;
    if (document.getElementById(styleId)) return;
    wp.media.attachment(regularFileId).fetch().then(function () {
      const attachment = wp.media.attachment(regularFileId);
      const fontUrl = attachment.get('url');
      const css = `
        @font-face {
          font-family: '${font.name}';
          src: url('${fontUrl}') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `;
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = css;
      document.head.appendChild(style);
    }).catch(() => {
      console.warn(`Failed to load CSS for font: ${font.name}`);
    });
  };

  /**
   * Load all custom fonts with validation
   */
  const loadFonts = async () => {
    setLoading(true);
    const data = await _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_6__["default"].getFonts();

    // Validate which fonts have existing files
    const fontsWithStatus = await Promise.all(data.map(async font => {
      const regularFileId = getFileId(font.files?.regular);
      let fileExists = false;
      if (regularFileId) {
        try {
          await wp.media.attachment(regularFileId).fetch();
          fileExists = true;
          loadFontCSS(font);
        } catch (error) {
          fileExists = false;
          console.warn(`Font "${font.name}" has missing files.`);
        }
      }
      return {
        ...font,
        fileExists
      };
    }));
    setFonts(fontsWithStatus);
    setLoading(false);

    // Only send valid fonts to Typography dropdown
    if (onFontsUpdated) {
      const validFonts = fontsWithStatus.filter(f => f.fileExists);
      onFontsUpdated(validFonts);
    }
  };

  // ============================================================================
  // MODAL ACTIONS
  // ============================================================================

  /**
   * Open add font modal
   */
  const openAddModal = () => {
    setEditingFont(null);
    setFontName('');
    setFontFiles({
      regular: {
        id: null,
        filename: null
      },
      italic: {
        id: null,
        filename: null
      },
      bold: {
        id: null,
        filename: null
      },
      bold_italic: {
        id: null,
        filename: null
      }
    });
    setModalError(null);
    setShowModal(true);
  };

  /**
   * Open edit modal
   */
  const openEditModal = font => {
    setEditingFont(font);
    setFontName(font.name);

    // Detect if we're in "fix mode"
    const isFixMode = !font.fileExists;

    // Convert from database format to component format
    const filesWithNames = {
      regular: {
        id: null,
        filename: null
      },
      italic: {
        id: null,
        filename: null
      },
      bold: {
        id: null,
        filename: null
      },
      bold_italic: {
        id: null,
        filename: null
      }
    };
    Object.keys(font.files || {}).forEach(variant => {
      const fileId = getFileId(font.files[variant]);
      if (fileId) {
        filesWithNames[variant] = {
          id: fileId,
          filename: isFixMode ? 'File not available!' : 'Loading...'
        };

        // Only fetch if NOT in fix mode
        if (!isFixMode) {
          wp.media.attachment(fileId).fetch().then(function () {
            const attachment = wp.media.attachment(fileId);
            setFontFiles(prev => ({
              ...prev,
              [variant]: {
                id: fileId,
                filename: attachment.get('filename') || attachment.get('title') || 'font-file'
              }
            }));
          });
        }
      }
    });
    setFontFiles(filesWithNames);
    setModalError(null);
    setShowModal(true);
  };

  /**
   * Open WordPress Media Uploader
   */
  const openMediaUploader = variant => {
    const frame = wp.media({
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Font File', 'themeplus'),
      button: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Use this file', 'themeplus')
      },
      library: {
        type: ['application/x-font-woff', 'application/x-font-woff2', 'application/x-font-ttf', 'font/woff', 'font/woff2']
      },
      multiple: false
    });
    frame.on('select', function () {
      const attachment = frame.state().get('selection').first().toJSON();

      // Check if file already used
      if (checkDuplicateFile(attachment.id, editingFont?.id)) {
        showModalError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This font file is already uploaded in another font. Please select a different file.', 'themeplus'));
        return;
      }

      // Store file info
      setFontFiles({
        ...fontFiles,
        [variant]: {
          id: attachment.id,
          filename: attachment.filename || attachment.title || 'font-file.woff2'
        }
      });

      // Autofill font name from first file
      if (!fontName && variant === 'regular') {
        const filename = attachment.filename || attachment.title;
        const cleanName = cleanFontName(filename);

        // Check if autofilled name is duplicate
        if (checkDuplicateName(cleanName)) {
          let counter = 2;
          let uniqueName = cleanName;
          while (checkDuplicateName(uniqueName)) {
            uniqueName = `${cleanName} ${counter}`;
            counter++;
          }
          setFontName(uniqueName);
        } else {
          setFontName(cleanName);
        }
      }

      // Clear error when file is uploaded
      if (modalError && variant === 'regular') {
        setModalError(null);
      }
    });
    frame.open();
  };

  // ============================================================================
  // CRUD OPERATIONS
  // ============================================================================

  /**
   * Save font (add or update)
   */
  const saveFont = async () => {
    // Validate font name
    if (!fontName) {
      showModalError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please enter a font name', 'themeplus'));
      return;
    }

    // Get regular file ID
    const regularFileId = getFileId(fontFiles.regular);
    if (!regularFileId) {
      showModalError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please upload at least the regular font file', 'themeplus'));
      return;
    }

    // Check duplicate name
    if (checkDuplicateName(fontName, editingFont?.id)) {
      showModalError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('A font with this name already exists. Please use a different name.', 'themeplus'));
      return;
    }

    // Check duplicate file
    if (checkDuplicateFile(regularFileId, editingFont?.id)) {
      showModalError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This font file is already uploaded. Please select a different file.', 'themeplus'));
      return;
    }
    setSaving(true);
    setModalError(null);
    try {
      // Extract just IDs for API
      const filesData = {
        regular: getFileId(fontFiles.regular),
        italic: getFileId(fontFiles.italic),
        bold: getFileId(fontFiles.bold),
        bold_italic: getFileId(fontFiles.bold_italic)
      };
      const data = {
        name: fontName,
        files: filesData
      };
      if (editingFont) {
        await _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_6__["default"].updateFont(editingFont.id, data);
        showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font updated successfully', 'themeplus'));
      } else {
        const result = await _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_6__["default"].addFont(data);
        showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font added successfully', 'themeplus'));
        if (result.id) {
          const newFont = {
            id: result.id,
            name: fontName,
            files: filesData
          };
          loadFontCSS(newFont);
        }
      }
      setShowModal(false);
      await loadFonts();
    } catch (error) {
      showModalError(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('An error occurred', 'themeplus'));
    } finally {
      setSaving(false);
    }
  };

  /**
   * Confirm delete font
   */
  const confirmDeleteFont = font => {
    setDeleteConfirm({
      id: font.id,
      name: font.name
    });
  };

  /**
   * Delete font (confirmed)
   */
  const deleteFont = async () => {
    if (!deleteConfirm) return;
    setDeleting(deleteConfirm.id);
    try {
      await _services_CustomFontsService__WEBPACK_IMPORTED_MODULE_6__["default"].deleteFont(deleteConfirm.id);

      // Remove font CSS from page
      const styleId = `custom-font-${deleteConfirm.id}`;
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font deleted successfully', 'themeplus'));
    } catch (error) {
      showNotice(error.message, 'error');
    } finally {
      setDeleteConfirm(null);
      setDeleting(null);
      await loadFonts();
    }
  };

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  /**
   * Render font file uploader
   */
  const renderFileUploader = (variant, label, required = false) => {
    const fileId = getFileId(fontFiles[variant]);
    const filename = getFilename(fontFiles[variant]);

    // Check if we're fixing a broken font
    const isFixMode = editingFont && !editingFont.fileExists;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-font-file-upload",
      key: variant
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, label, required && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      style: {
        color: 'red'
      }
    }, " *")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-font-file-upload__wrapper"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
      color: "light",
      onClick: () => openMediaUploader(variant),
      disabled: saving
    }, fileId ? isFixMode ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reupload File', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Change File', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload File', 'themeplus')), fileId && filename && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-custom-font-uploads"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "tpo-font-file-upload__filename",
      title: filename,
      style: filename === 'File not available!' ? {
        color: '#ff418a'
      } : {}
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-file-lines"
    }), filename), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "tpo-button--small-dismiss",
      size: "small",
      color: "danger",
      onClick: () => setFontFiles({
        ...fontFiles,
        [variant]: {
          id: null,
          filename: null
        }
      }),
      disabled: saving,
      iconOnly: true,
      ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Remove File', 'themeplus')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-xmark"
    })))));
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-custom-font-uploader"
  }, notice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Notice__WEBPACK_IMPORTED_MODULE_4__["default"], {
    status: notice.type,
    isDismissible: true,
    autoDismiss: notice.type === 'success' ? 3000 : null,
    onDismiss: () => setNotice(null)
  }, notice.message), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-custom-font-uploader__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_FileUpload__WEBPACK_IMPORTED_MODULE_9__["default"], {
    variant: "button",
    icon: "fa-cloud-arrow-up",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Font', 'themeplus'),
    onClick: openAddModal
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-custom-font-uploader__list"
  }, loading ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading fonts...', 'themeplus')) : fonts.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-custom-font-uploader__empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No custom fonts yet. Click "Add Font" to upload your first custom font.', 'themeplus'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "tpo-custom-font-uploader__table widefat"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Name', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Variants', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preview', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Actions', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, fonts.map(font => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: font.id,
    className: `
                    ${deleting === font.id ? 'tpo-font-row--deleting' : ''}
                    ${!font.fileExists ? 'tpo-font-row--invalid' : ''}
                  `.trim()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "tpo-custom-fonts--name"
  }, font.name, !font.fileExists && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-font-warning",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font file not found in Media Library', 'themeplus')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-triangle-exclamation"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "tpo-custom-fonts--variants"
  }, font.fileExists ? `${Object.keys(font.files || {}).filter(v => getFileId(font.files[v])).length} variant(s)` : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-text-muted"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('File missing', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "tpo-custom-fonts--preview"
  }, font.fileExists ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      fontFamily: font.name,
      fontSize: '18px'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The quick brown fox', 'themeplus')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-text-muted"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('—', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "tpo-custom-fonts--action"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-actions-bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    color: !font.fileExists ? "info" : "muted",
    onClick: () => openEditModal(font),
    disabled: deleting === font.id,
    title: !font.fileExists ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Re-upload font files', 'themeplus') : '',
    ariaLabel: !font.fileExists ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Re-upload font files', 'themeplus') : '',
    iconOnly: true
  }, !font.fileExists ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-arrows-rotate"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-pencil"
  })), ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
    color: "muted",
    onClick: () => confirmDeleteFont(font),
    disabled: deleting === font.id,
    loading: deleting === font.id,
    iconOnly: true,
    ariaLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete font', 'themeplus')
  }, deleting === font.id ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-spinner"
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-trash-can"
  }))))))))), showModal && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    isOpen: showModal,
    onClose: () => !saving && setShowModal(false),
    title: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, saving && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
      className: "fa-solid fa-spinner fa-spin",
      style: {
        marginRight: '8px'
      }
    }), editingFont ? editingFont.fileExists ? saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updating Font...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit Custom Font', 'themeplus') : saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Re-adding Font...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Fix Custom Font', 'themeplus') : saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Adding Font...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Custom Font', 'themeplus')),
    size: "medium",
    closeOnClickOutside: !saving,
    closeOnEscape: !saving,
    showCloseButton: !saving,
    showFooter: true,
    footer: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "tpo-custom-font-uploader__footer tpo-field-group--button"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onClick: saveFont,
      disabled: saving,
      loading: saving
    }, editingFont ? editingFont.fileExists ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Update Font', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Font', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Add Font', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Button__WEBPACK_IMPORTED_MODULE_8__["default"], {
      color: "muted",
      onClick: () => setShowModal(false),
      disabled: saving
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus')))
  }, modalError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Notice__WEBPACK_IMPORTED_MODULE_4__["default"], {
    status: "danger",
    isDismissible: true,
    onDismiss: () => setModalError(null)
  }, modalError), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_TextInput__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Name', 'themeplus'),
    value: fontName,
    onChange: value => {
      setFontName(value);
      if (modalError && value) {
        setModalError(null);
      }
    },
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('My Custom Font', 'themeplus'),
    disabled: saving,
    required: true,
    fullWidth: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-font-files"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-custom-font-files--header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Files', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload font files for different variants. Regular weight is required.', 'themeplus'))), renderFileUploader('regular', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Regular', 'themeplus'), true), renderFileUploader('italic', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Italic (Optional)', 'themeplus')), renderFileUploader('bold', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bold (Optional)', 'themeplus')), renderFileUploader('bold_italic', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bold Italic (Optional)', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-font-formats"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "description"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Accepted formats:', 'themeplus')), " .woff, .woff2", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Recommended:', 'themeplus')), " .woff2 for best performance", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Convert your fonts:', 'themeplus')), ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://www.fontsquirrel.com/tools/webfont-generator",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Font Squirrel Webfont Generator', 'themeplus'))))), deleteConfirm && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Common_Dialog__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isOpen: !!deleteConfirm,
    onClose: () => !deleting && setDeleteConfirm(null),
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete Custom Font', 'themeplus'),
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to delete "%s"? This action cannot be undone.', 'themeplus').replace('%s', deleteConfirm.name),
    type: "confirm",
    onConfirm: deleteFont,
    confirmText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Delete', 'themeplus'),
    cancelText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus')
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomFontUploader);

/***/ }),

/***/ "./src/js/admin/components/Sections/ImportExport.jsx":
/*!***********************************************************!*\
  !*** ./src/js/admin/components/Sections/ImportExport.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_SettingsContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/SettingsContext */ "./src/js/admin/context/SettingsContext.jsx");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);

/**
 * ThemePlus Import/Export Component
 *
 * File: src/js/admin/components/Sections/ImportExport.jsx
 */





function ImportExport({
  showModal
}) {
  const {
    options,
    setOptions,
    saveOptions
  } = (0,_context_SettingsContext__WEBPACK_IMPORTED_MODULE_3__.useSettings)();
  const [importing, setImporting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [exporting, setExporting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [importData, setImportData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [showImportBox, setShowImportBox] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  /**
   * Export options as JSON
   */
  const handleExport = () => {
    setExporting(true);
    try {
      const jsonData = JSON.stringify(options, null, 2);
      const blob = new Blob([jsonData], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `themeplus-settings-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Modal call
      showModal({
        type: 'success',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Success!', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings exported successfully!', 'themeplus')
      });
    } catch (error) {
      console.error('Export error:', error);

      // Modal call
      showModal({
        type: 'error',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error!', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to export settings.', 'themeplus')
      });
    } finally {
      setExporting(false);
    }
  };

  /**
   * Import options from JSON
   */
  const handleImport = async () => {
    if (!importData.trim()) {
      // Modal call
      showModal({
        type: 'warning',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Warning', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please paste your settings data.', 'themeplus')
      });
      return;
    }

    // Show confirm modal with onConfirm callback
    showModal({
      type: 'confirm',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Import Settings?', 'themeplus'),
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This will replace all current settings. Are you sure you want to continue?', 'themeplus'),
      onConfirm: async () => {
        setImporting(true);
        try {
          const parsedData = JSON.parse(importData);
          if (typeof parsedData !== 'object' || parsedData === null) {
            throw new Error('Invalid data format');
          }
          setOptions(parsedData);
          const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
            path: '/themeplus/v1/options',
            method: 'POST',
            data: {
              options: parsedData
            }
          });
          if (response.success) {
            showModal({
              type: 'success',
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Success!', 'themeplus'),
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings imported successfully! Page will reload.', 'themeplus')
            });
            setImportData('');
            setShowImportBox(false);
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            throw new Error(response.message || 'Import failed');
          }
        } catch (error) {
          console.error('Import error:', error);
          showModal({
            type: 'error',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error!', 'themeplus'),
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to import settings. Please check your data format.', 'themeplus')
          });
        } finally {
          setImporting(false);
        }
      }
    });
  };

  /**
   * Import from file
   */
  const handleFileImport = event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setImportData(content);
        setShowImportBox(true);
      }
    };
    reader.onerror = () => {
      showModal({
        type: 'error',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error!', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to read file.', 'themeplus')
      });
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  /**
   * Reset all settings with custom modal
   */
  const handleReset = () => {
    showModal({
      type: 'confirm',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset All Settings?', 'themeplus'),
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to reset all settings to default? This action cannot be undone!', 'themeplus'),
      confirmText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yes, Reset All', 'themeplus'),
      cancelText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus'),
      onConfirm: async () => {
        try {
          const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
            path: '/themeplus/v1/options/reset',
            method: 'POST'
          });
          if (response.success) {
            showModal({
              type: 'success',
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Success!', 'themeplus'),
              message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings reset successfully! Page will reload.', 'themeplus')
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            throw new Error(response.message || 'Reset failed');
          }
        } catch (error) {
          console.error('Reset error:', error);
          showModal({
            type: 'error',
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error!', 'themeplus'),
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to reset settings.', 'themeplus')
          });
        }
      }
    });
  };

  /**
   * Copy current settings to clipboard
   */
  const handleCopySettings = () => {
    try {
      const jsonData = JSON.stringify(options, null, 2);
      navigator.clipboard.writeText(jsonData);
      showModal({
        type: 'success',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Success!', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Settings copied to clipboard!', 'themeplus')
      });
    } catch (error) {
      console.error('Copy error:', error);
      showModal({
        type: 'error',
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error!', 'themeplus'),
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to copy settings.', 'themeplus')
      });
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "tpo-import-export__title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-floppy-disk"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Export Settings', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-import-export__description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Download your current settings as a JSON file.', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-import-export__button tpo-import-export__button--primary tpo-button tpo-button--secondary",
    onClick: handleExport,
    disabled: exporting
  }, exporting ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Exporting...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Download Settings', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-import-export__button tpo-import-export__button--secondary tpo-button tpo-button--green",
    onClick: handleCopySettings
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copy to Clipboard', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "tpo-import-export__title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-file-export"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Import Settings', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-import-export__description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload a settings file or paste JSON data to import.', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "tpo-import-export__file-label tpo-button tpo-button--secondary"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "file",
    accept: ".json,application/json",
    onChange: handleFileImport,
    className: "tpo-import-export__file-input"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "tpo-import-export__button tpo-import-export__button--primary"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upload JSON File', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-import-export__button tpo-import-export__button--secondary tpo-button tpo-button--info",
    onClick: () => setShowImportBox(!showImportBox)
  }, showImportBox ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hide Text Box', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste JSON Data', 'themeplus'))), showImportBox && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__import-box"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    className: "tpo-import-export__textarea",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Paste your exported JSON data here...', 'themeplus'),
    value: importData,
    onChange: e => setImportData(e.target.value),
    rows: 10
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__import-actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-import-export__button tpo-import-export__button--success tpo-button tpo-button--primary",
    onClick: handleImport,
    disabled: importing || !importData.trim()
  }, importing ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Importing...', 'themeplus') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Import Settings', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-import-export__button tpo-import-export__button--secondary tpo-button tpo-button--secondary",
    onClick: () => {
      setImportData('');
      setShowImportBox(false);
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'themeplus'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__section tpo-import-export__section--danger"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "tpo-import-export__title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-triangle-exclamation"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset Settings', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "tpo-import-export__description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset all settings to their default values. This action cannot be undone.', 'themeplus'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__actions tpo-field-group--button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "tpo-import-export__button tpo-import-export__button--danger tpo-button tpo-button--danger",
    onClick: handleReset
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset All Settings', 'themeplus')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tpo-import-export__info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "tpo-import-export__info-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: "fa-solid fa-lightbulb"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tips', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "tpo-import-export__info-list"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Always backup your settings before making major changes.', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Exported files can be imported on any site running ThemePlus.', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Import will overwrite all current settings.', 'themeplus')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Reset will restore default values for all options.', 'themeplus')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImportExport);

/***/ }),

/***/ "./src/js/admin/context/SettingsContext.jsx":
/*!**************************************************!*\
  !*** ./src/js/admin/context/SettingsContext.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsProvider: () => (/* binding */ SettingsProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useSettings: () => (/* binding */ useSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * ThemePlus Settings Context
 *
 * File: src/js/admin/context/SettingsContext.jsx
 */


const SettingsContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function SettingsProvider({
  children,
  value
}) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SettingsContext.Provider, {
    value: value
  }, children);
}
function useSettings() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(SettingsContext);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SettingsContext);

/***/ }),

/***/ "./src/js/admin/context/ThemeContext.jsx":
/*!***********************************************!*\
  !*** ./src/js/admin/context/ThemeContext.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useTheme: () => (/* binding */ useTheme)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * ThemePlus Theme Context
 *
 * File: src/js/admin/context/ThemeContext.jsx
 */



// Create context with default value
const ThemeContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  theme: 'light',
  toggleTheme: () => {}
});

/**
 * Theme Provider Component
 */
function ThemeProvider({
  children
}) {
  const [theme, setTheme] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('themeplus-theme');
    return savedTheme || 'light';
  });

  /**
   * Toggle theme
   */
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeplus-theme', newTheme);
      return newTheme;
    });
  };

  /**
   * Apply theme to document
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    document.documentElement.setAttribute('data-themeplus-theme', theme);
  }, [theme]);
  const value = {
    theme,
    toggleTheme
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ThemeContext.Provider, {
    value: value
  }, children);
}

/**
 * Hook to use theme context
 */
function useTheme() {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeContext);

/***/ }),

/***/ "./src/js/admin/data/icons.js":
/*!************************************!*\
  !*** ./src/js/admin/data/icons.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iconCategories: () => (/* binding */ iconCategories),
/* harmony export */   icons: () => (/* binding */ icons)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * FontAwesome Icons - v1.0
 *
 * File: src/js/admin/data/icons.js
 */


const icons = [
// ==========================================
// POPULAR (20 icons)
// ==========================================
{
  id: 'house',
  name: 'House',
  category: 'popular',
  class: 'fa-solid fa-house'
}, {
  id: 'heart',
  name: 'Heart',
  category: 'popular',
  class: 'fa-solid fa-heart'
}, {
  id: 'star',
  name: 'Star',
  category: 'popular',
  class: 'fa-solid fa-star'
}, {
  id: 'user',
  name: 'User',
  category: 'popular',
  class: 'fa-solid fa-user'
}, {
  id: 'search',
  name: 'Search',
  category: 'popular',
  class: 'fa-solid fa-search'
}, {
  id: 'envelope',
  name: 'Envelope',
  category: 'popular',
  class: 'fa-solid fa-envelope'
}, {
  id: 'phone',
  name: 'Phone',
  category: 'popular',
  class: 'fa-solid fa-phone'
}, {
  id: 'bars',
  name: 'Bars',
  category: 'popular',
  class: 'fa-solid fa-bars'
}, {
  id: 'times',
  name: 'Times',
  category: 'popular',
  class: 'fa-solid fa-times'
}, {
  id: 'xmark',
  name: 'X Mark',
  category: 'popular',
  class: 'fa-solid fa-xmark'
}, {
  id: 'check',
  name: 'Check',
  category: 'popular',
  class: 'fa-solid fa-check'
}, {
  id: 'calendar',
  name: 'Calendar',
  category: 'popular',
  class: 'fa-solid fa-calendar'
}, {
  id: 'clock',
  name: 'Clock',
  category: 'popular',
  class: 'fa-solid fa-clock'
}, {
  id: 'location-dot',
  name: 'Location',
  category: 'popular',
  class: 'fa-solid fa-location-dot'
}, {
  id: 'globe',
  name: 'Globe',
  category: 'popular',
  class: 'fa-solid fa-globe'
}, {
  id: 'cart-shopping',
  name: 'Shopping Cart',
  category: 'popular',
  class: 'fa-solid fa-cart-shopping'
}, {
  id: 'bag-shopping',
  name: 'Shopping Bag',
  category: 'popular',
  class: 'fa-solid fa-bag-shopping'
}, {
  id: 'tag',
  name: 'Tag',
  category: 'popular',
  class: 'fa-solid fa-tag'
}, {
  id: 'gift',
  name: 'Gift',
  category: 'popular',
  class: 'fa-solid fa-gift'
}, {
  id: 'fire',
  name: 'Fire',
  category: 'popular',
  class: 'fa-solid fa-fire'
},
// ==========================================
// INTERFACE (50 icons)
// ==========================================
{
  id: 'cog',
  name: 'Settings',
  category: 'interface',
  class: 'fa-solid fa-cog'
}, {
  id: 'gear',
  name: 'Gear',
  category: 'interface',
  class: 'fa-solid fa-gear'
}, {
  id: 'sliders',
  name: 'Sliders',
  category: 'interface',
  class: 'fa-solid fa-sliders'
}, {
  id: 'bell',
  name: 'Bell',
  category: 'interface',
  class: 'fa-solid fa-bell'
}, {
  id: 'trash',
  name: 'Trash',
  category: 'interface',
  class: 'fa-solid fa-trash'
}, {
  id: 'trash-can',
  name: 'Trash Can',
  category: 'interface',
  class: 'fa-solid fa-trash-can'
}, {
  id: 'edit',
  name: 'Edit',
  category: 'interface',
  class: 'fa-solid fa-edit'
}, {
  id: 'pen',
  name: 'Pen',
  category: 'interface',
  class: 'fa-solid fa-pen'
}, {
  id: 'pencil',
  name: 'Pencil',
  category: 'interface',
  class: 'fa-solid fa-pencil'
}, {
  id: 'plus',
  name: 'Plus',
  category: 'interface',
  class: 'fa-solid fa-plus'
}, {
  id: 'minus',
  name: 'Minus',
  category: 'interface',
  class: 'fa-solid fa-minus'
}, {
  id: 'download',
  name: 'Download',
  category: 'interface',
  class: 'fa-solid fa-download'
}, {
  id: 'upload',
  name: 'Upload',
  category: 'interface',
  class: 'fa-solid fa-upload'
}, {
  id: 'cloud-arrow-up',
  name: 'Cloud Upload',
  category: 'interface',
  class: 'fa-solid fa-cloud-arrow-up'
}, {
  id: 'cloud-arrow-down',
  name: 'Cloud Download',
  category: 'interface',
  class: 'fa-solid fa-cloud-arrow-down'
}, {
  id: 'floppy-disk',
  name: 'Save',
  category: 'interface',
  class: 'fa-solid fa-floppy-disk'
}, {
  id: 'folder',
  name: 'Folder',
  category: 'interface',
  class: 'fa-solid fa-folder'
}, {
  id: 'folder-open',
  name: 'Folder Open',
  category: 'interface',
  class: 'fa-solid fa-folder-open'
}, {
  id: 'file',
  name: 'File',
  category: 'interface',
  class: 'fa-solid fa-file'
}, {
  id: 'copy',
  name: 'Copy',
  category: 'interface',
  class: 'fa-solid fa-copy'
}, {
  id: 'clipboard',
  name: 'Clipboard',
  category: 'interface',
  class: 'fa-solid fa-clipboard'
}, {
  id: 'eye',
  name: 'Eye',
  category: 'interface',
  class: 'fa-solid fa-eye'
}, {
  id: 'eye-slash',
  name: 'Eye Slash',
  category: 'interface',
  class: 'fa-solid fa-eye-slash'
}, {
  id: 'lock',
  name: 'Lock',
  category: 'interface',
  class: 'fa-solid fa-lock'
}, {
  id: 'unlock',
  name: 'Unlock',
  category: 'interface',
  class: 'fa-solid fa-unlock'
}, {
  id: 'key',
  name: 'Key',
  category: 'interface',
  class: 'fa-solid fa-key'
}, {
  id: 'shield',
  name: 'Shield',
  category: 'interface',
  class: 'fa-solid fa-shield'
}, {
  id: 'circle-info',
  name: 'Info',
  category: 'interface',
  class: 'fa-solid fa-circle-info'
}, {
  id: 'circle-question',
  name: 'Question',
  category: 'interface',
  class: 'fa-solid fa-circle-question'
}, {
  id: 'circle-exclamation',
  name: 'Exclamation',
  category: 'interface',
  class: 'fa-solid fa-circle-exclamation'
}, {
  id: 'triangle-exclamation',
  name: 'Warning',
  category: 'interface',
  class: 'fa-solid fa-triangle-exclamation'
}, {
  id: 'circle-check',
  name: 'Check Circle',
  category: 'interface',
  class: 'fa-solid fa-circle-check'
}, {
  id: 'circle-xmark',
  name: 'X Circle',
  category: 'interface',
  class: 'fa-solid fa-circle-xmark'
}, {
  id: 'square-check',
  name: 'Check Square',
  category: 'interface',
  class: 'fa-solid fa-square-check'
}, {
  id: 'filter',
  name: 'Filter',
  category: 'interface',
  class: 'fa-solid fa-filter'
}, {
  id: 'magnifying-glass',
  name: 'Search',
  category: 'interface',
  class: 'fa-solid fa-magnifying-glass'
}, {
  id: 'ellipsis',
  name: 'Ellipsis',
  category: 'interface',
  class: 'fa-solid fa-ellipsis'
}, {
  id: 'ellipsis-vertical',
  name: 'Ellipsis Vertical',
  category: 'interface',
  class: 'fa-solid fa-ellipsis-vertical'
}, {
  id: 'list',
  name: 'List',
  category: 'interface',
  class: 'fa-solid fa-list'
}, {
  id: 'list-ul',
  name: 'List Unordered',
  category: 'interface',
  class: 'fa-solid fa-list-ul'
}, {
  id: 'list-ol',
  name: 'List Ordered',
  category: 'interface',
  class: 'fa-solid fa-list-ol'
}, {
  id: 'table',
  name: 'Table',
  category: 'interface',
  class: 'fa-solid fa-table'
}, {
  id: 'table-cells',
  name: 'Table Cells',
  category: 'interface',
  class: 'fa-solid fa-table-cells'
}, {
  id: 'grip',
  name: 'Grip',
  category: 'interface',
  class: 'fa-solid fa-grip'
}, {
  id: 'grip-vertical',
  name: 'Grip Vertical',
  category: 'interface',
  class: 'fa-solid fa-grip-vertical'
}, {
  id: 'border-all',
  name: 'Border All',
  category: 'interface',
  class: 'fa-solid fa-border-all'
}, {
  id: 'maximize',
  name: 'Maximize',
  category: 'interface',
  class: 'fa-solid fa-maximize'
}, {
  id: 'minimize',
  name: 'Minimize',
  category: 'interface',
  class: 'fa-solid fa-minimize'
}, {
  id: 'compress',
  name: 'Compress',
  category: 'interface',
  class: 'fa-solid fa-compress'
}, {
  id: 'expand',
  name: 'Expand',
  category: 'interface',
  class: 'fa-solid fa-expand'
},
// ==========================================
// ARROWS (40 icons)
// ==========================================
{
  id: 'arrow-up',
  name: 'Arrow Up',
  category: 'arrows',
  class: 'fa-solid fa-arrow-up'
}, {
  id: 'arrow-down',
  name: 'Arrow Down',
  category: 'arrows',
  class: 'fa-solid fa-arrow-down'
}, {
  id: 'arrow-left',
  name: 'Arrow Left',
  category: 'arrows',
  class: 'fa-solid fa-arrow-left'
}, {
  id: 'arrow-right',
  name: 'Arrow Right',
  category: 'arrows',
  class: 'fa-solid fa-arrow-right'
}, {
  id: 'arrow-up-long',
  name: 'Arrow Up Long',
  category: 'arrows',
  class: 'fa-solid fa-arrow-up-long'
}, {
  id: 'arrow-down-long',
  name: 'Arrow Down Long',
  category: 'arrows',
  class: 'fa-solid fa-arrow-down-long'
}, {
  id: 'arrow-left-long',
  name: 'Arrow Left Long',
  category: 'arrows',
  class: 'fa-solid fa-arrow-left-long'
}, {
  id: 'arrow-right-long',
  name: 'Arrow Right Long',
  category: 'arrows',
  class: 'fa-solid fa-arrow-right-long'
}, {
  id: 'chevron-up',
  name: 'Chevron Up',
  category: 'arrows',
  class: 'fa-solid fa-chevron-up'
}, {
  id: 'chevron-down',
  name: 'Chevron Down',
  category: 'arrows',
  class: 'fa-solid fa-chevron-down'
}, {
  id: 'chevron-left',
  name: 'Chevron Left',
  category: 'arrows',
  class: 'fa-solid fa-chevron-left'
}, {
  id: 'chevron-right',
  name: 'Chevron Right',
  category: 'arrows',
  class: 'fa-solid fa-chevron-right'
}, {
  id: 'angle-up',
  name: 'Angle Up',
  category: 'arrows',
  class: 'fa-solid fa-angle-up'
}, {
  id: 'angle-down',
  name: 'Angle Down',
  category: 'arrows',
  class: 'fa-solid fa-angle-down'
}, {
  id: 'angle-left',
  name: 'Angle Left',
  category: 'arrows',
  class: 'fa-solid fa-angle-left'
}, {
  id: 'angle-right',
  name: 'Angle Right',
  category: 'arrows',
  class: 'fa-solid fa-angle-right'
}, {
  id: 'angles-up',
  name: 'Angles Up',
  category: 'arrows',
  class: 'fa-solid fa-angles-up'
}, {
  id: 'angles-down',
  name: 'Angles Down',
  category: 'arrows',
  class: 'fa-solid fa-angles-down'
}, {
  id: 'angles-left',
  name: 'Angles Left',
  category: 'arrows',
  class: 'fa-solid fa-angles-left'
}, {
  id: 'angles-right',
  name: 'Angles Right',
  category: 'arrows',
  class: 'fa-solid fa-angles-right'
}, {
  id: 'caret-up',
  name: 'Caret Up',
  category: 'arrows',
  class: 'fa-solid fa-caret-up'
}, {
  id: 'caret-down',
  name: 'Caret Down',
  category: 'arrows',
  class: 'fa-solid fa-caret-down'
}, {
  id: 'caret-left',
  name: 'Caret Left',
  category: 'arrows',
  class: 'fa-solid fa-caret-left'
}, {
  id: 'caret-right',
  name: 'Caret Right',
  category: 'arrows',
  class: 'fa-solid fa-caret-right'
}, {
  id: 'sort',
  name: 'Sort',
  category: 'arrows',
  class: 'fa-solid fa-sort'
}, {
  id: 'sort-up',
  name: 'Sort Up',
  category: 'arrows',
  class: 'fa-solid fa-sort-up'
}, {
  id: 'sort-down',
  name: 'Sort Down',
  category: 'arrows',
  class: 'fa-solid fa-sort-down'
}, {
  id: 'arrow-rotate-right',
  name: 'Rotate Right',
  category: 'arrows',
  class: 'fa-solid fa-arrow-rotate-right'
}, {
  id: 'arrow-rotate-left',
  name: 'Rotate Left',
  category: 'arrows',
  class: 'fa-solid fa-arrow-rotate-left'
}, {
  id: 'rotate',
  name: 'Rotate',
  category: 'arrows',
  class: 'fa-solid fa-rotate'
}, {
  id: 'rotate-right',
  name: 'Rotate Right',
  category: 'arrows',
  class: 'fa-solid fa-rotate-right'
}, {
  id: 'rotate-left',
  name: 'Rotate Left',
  category: 'arrows',
  class: 'fa-solid fa-rotate-left'
}, {
  id: 'arrows-rotate',
  name: 'Arrows Rotate',
  category: 'arrows',
  class: 'fa-solid fa-arrows-rotate'
}, {
  id: 'arrows-up-down',
  name: 'Arrows Up Down',
  category: 'arrows',
  class: 'fa-solid fa-arrows-up-down'
}, {
  id: 'arrows-left-right',
  name: 'Arrows Left Right',
  category: 'arrows',
  class: 'fa-solid fa-arrows-left-right'
}, {
  id: 'up-down',
  name: 'Up Down',
  category: 'arrows',
  class: 'fa-solid fa-up-down'
}, {
  id: 'left-right',
  name: 'Left Right',
  category: 'arrows',
  class: 'fa-solid fa-left-right'
}, {
  id: 'circle-arrow-up',
  name: 'Circle Arrow Up',
  category: 'arrows',
  class: 'fa-solid fa-circle-arrow-up'
}, {
  id: 'circle-arrow-down',
  name: 'Circle Arrow Down',
  category: 'arrows',
  class: 'fa-solid fa-circle-arrow-down'
}, {
  id: 'circle-arrow-left',
  name: 'Circle Arrow Left',
  category: 'arrows',
  class: 'fa-solid fa-circle-arrow-left'
}, {
  id: 'circle-arrow-right',
  name: 'Circle Arrow Right',
  category: 'arrows',
  class: 'fa-solid fa-circle-arrow-right'
},
// ==========================================
// SOCIAL MEDIA (40 icons)
// ==========================================
{
  id: 'facebook',
  name: 'Facebook',
  category: 'social',
  class: 'fa-brands fa-facebook'
}, {
  id: 'facebook-f',
  name: 'Facebook F',
  category: 'social',
  class: 'fa-brands fa-facebook-f'
}, {
  id: 'twitter',
  name: 'Twitter',
  category: 'social',
  class: 'fa-brands fa-twitter'
}, {
  id: 'x-twitter',
  name: 'X Twitter',
  category: 'social',
  class: 'fa-brands fa-x-twitter'
}, {
  id: 'instagram',
  name: 'Instagram',
  category: 'social',
  class: 'fa-brands fa-instagram'
}, {
  id: 'linkedin',
  name: 'LinkedIn',
  category: 'social',
  class: 'fa-brands fa-linkedin'
}, {
  id: 'linkedin-in',
  name: 'LinkedIn In',
  category: 'social',
  class: 'fa-brands fa-linkedin-in'
}, {
  id: 'youtube',
  name: 'YouTube',
  category: 'social',
  class: 'fa-brands fa-youtube'
}, {
  id: 'pinterest',
  name: 'Pinterest',
  category: 'social',
  class: 'fa-brands fa-pinterest'
}, {
  id: 'pinterest-p',
  name: 'Pinterest P',
  category: 'social',
  class: 'fa-brands fa-pinterest-p'
}, {
  id: 'github',
  name: 'GitHub',
  category: 'social',
  class: 'fa-brands fa-github'
}, {
  id: 'dribbble',
  name: 'Dribbble',
  category: 'social',
  class: 'fa-brands fa-dribbble'
}, {
  id: 'behance',
  name: 'Behance',
  category: 'social',
  class: 'fa-brands fa-behance'
}, {
  id: 'whatsapp',
  name: 'WhatsApp',
  category: 'social',
  class: 'fa-brands fa-whatsapp'
}, {
  id: 'telegram',
  name: 'Telegram',
  category: 'social',
  class: 'fa-brands fa-telegram'
}, {
  id: 'tiktok',
  name: 'TikTok',
  category: 'social',
  class: 'fa-brands fa-tiktok'
}, {
  id: 'snapchat',
  name: 'Snapchat',
  category: 'social',
  class: 'fa-brands fa-snapchat'
}, {
  id: 'reddit',
  name: 'Reddit',
  category: 'social',
  class: 'fa-brands fa-reddit'
}, {
  id: 'tumblr',
  name: 'Tumblr',
  category: 'social',
  class: 'fa-brands fa-tumblr'
}, {
  id: 'medium',
  name: 'Medium',
  category: 'social',
  class: 'fa-brands fa-medium'
}, {
  id: 'slack',
  name: 'Slack',
  category: 'social',
  class: 'fa-brands fa-slack'
}, {
  id: 'discord',
  name: 'Discord',
  category: 'social',
  class: 'fa-brands fa-discord'
}, {
  id: 'skype',
  name: 'Skype',
  category: 'social',
  class: 'fa-brands fa-skype'
}, {
  id: 'vimeo',
  name: 'Vimeo',
  category: 'social',
  class: 'fa-brands fa-vimeo'
}, {
  id: 'twitch',
  name: 'Twitch',
  category: 'social',
  class: 'fa-brands fa-twitch'
}, {
  id: 'spotify',
  name: 'Spotify',
  category: 'social',
  class: 'fa-brands fa-spotify'
}, {
  id: 'soundcloud',
  name: 'SoundCloud',
  category: 'social',
  class: 'fa-brands fa-soundcloud'
}, {
  id: 'amazon',
  name: 'Amazon',
  category: 'social',
  class: 'fa-brands fa-amazon'
}, {
  id: 'ebay',
  name: 'eBay',
  category: 'social',
  class: 'fa-brands fa-ebay'
}, {
  id: 'etsy',
  name: 'Etsy',
  category: 'social',
  class: 'fa-brands fa-etsy'
}, {
  id: 'paypal',
  name: 'PayPal',
  category: 'social',
  class: 'fa-brands fa-paypal'
}, {
  id: 'stripe',
  name: 'Stripe',
  category: 'social',
  class: 'fa-brands fa-stripe'
}, {
  id: 'apple',
  name: 'Apple',
  category: 'social',
  class: 'fa-brands fa-apple'
}, {
  id: 'google',
  name: 'Google',
  category: 'social',
  class: 'fa-brands fa-google'
}, {
  id: 'microsoft',
  name: 'Microsoft',
  category: 'social',
  class: 'fa-brands fa-microsoft'
}, {
  id: 'android',
  name: 'Android',
  category: 'social',
  class: 'fa-brands fa-android'
}, {
  id: 'stack-overflow',
  name: 'Stack Overflow',
  category: 'social',
  class: 'fa-brands fa-stack-overflow'
}, {
  id: 'wordpress',
  name: 'WordPress',
  category: 'social',
  class: 'fa-brands fa-wordpress'
}, {
  id: 'dev',
  name: 'Dev.to',
  category: 'social',
  class: 'fa-brands fa-dev'
}, {
  id: 'codepen',
  name: 'CodePen',
  category: 'social',
  class: 'fa-brands fa-codepen'
},
// ==========================================
// MEDIA (30 icons)
// ==========================================
{
  id: 'image',
  name: 'Image',
  category: 'media',
  class: 'fa-solid fa-image'
}, {
  id: 'images',
  name: 'Images',
  category: 'media',
  class: 'fa-solid fa-images'
}, {
  id: 'photo-film',
  name: 'Photo Film',
  category: 'media',
  class: 'fa-solid fa-photo-film'
}, {
  id: 'video',
  name: 'Video',
  category: 'media',
  class: 'fa-solid fa-video'
}, {
  id: 'film',
  name: 'Film',
  category: 'media',
  class: 'fa-solid fa-film'
}, {
  id: 'music',
  name: 'Music',
  category: 'media',
  class: 'fa-solid fa-music'
}, {
  id: 'play',
  name: 'Play',
  category: 'media',
  class: 'fa-solid fa-play'
}, {
  id: 'pause',
  name: 'Pause',
  category: 'media',
  class: 'fa-solid fa-pause'
}, {
  id: 'stop',
  name: 'Stop',
  category: 'media',
  class: 'fa-solid fa-stop'
}, {
  id: 'forward',
  name: 'Forward',
  category: 'media',
  class: 'fa-solid fa-forward'
}, {
  id: 'backward',
  name: 'Backward',
  category: 'media',
  class: 'fa-solid fa-backward'
}, {
  id: 'forward-step',
  name: 'Forward Step',
  category: 'media',
  class: 'fa-solid fa-forward-step'
}, {
  id: 'backward-step',
  name: 'Backward Step',
  category: 'media',
  class: 'fa-solid fa-backward-step'
}, {
  id: 'volume-high',
  name: 'Volume High',
  category: 'media',
  class: 'fa-solid fa-volume-high'
}, {
  id: 'volume-low',
  name: 'Volume Low',
  category: 'media',
  class: 'fa-solid fa-volume-low'
}, {
  id: 'volume-off',
  name: 'Volume Off',
  category: 'media',
  class: 'fa-solid fa-volume-off'
}, {
  id: 'volume-xmark',
  name: 'Volume Mute',
  category: 'media',
  class: 'fa-solid fa-volume-xmark'
}, {
  id: 'camera',
  name: 'Camera',
  category: 'media',
  class: 'fa-solid fa-camera'
}, {
  id: 'camera-retro',
  name: 'Camera Retro',
  category: 'media',
  class: 'fa-solid fa-camera-retro'
}, {
  id: 'microphone',
  name: 'Microphone',
  category: 'media',
  class: 'fa-solid fa-microphone'
}, {
  id: 'microphone-slash',
  name: 'Microphone Slash',
  category: 'media',
  class: 'fa-solid fa-microphone-slash'
}, {
  id: 'headphones',
  name: 'Headphones',
  category: 'media',
  class: 'fa-solid fa-headphones'
}, {
  id: 'photo-video',
  name: 'Photo Video',
  category: 'media',
  class: 'fa-solid fa-photo-video'
}, {
  id: 'circle-play',
  name: 'Circle Play',
  category: 'media',
  class: 'fa-solid fa-circle-play'
}, {
  id: 'circle-pause',
  name: 'Circle Pause',
  category: 'media',
  class: 'fa-solid fa-circle-pause'
}, {
  id: 'circle-stop',
  name: 'Circle Stop',
  category: 'media',
  class: 'fa-solid fa-circle-stop'
}, {
  id: 'podcast',
  name: 'Podcast',
  category: 'media',
  class: 'fa-solid fa-podcast'
}, {
  id: 'video-camera',
  name: 'Video Camera',
  category: 'media',
  class: 'fa-solid fa-video-camera'
}, {
  id: 'tv',
  name: 'TV',
  category: 'media',
  class: 'fa-solid fa-tv'
}, {
  id: 'display',
  name: 'Display',
  category: 'media',
  class: 'fa-solid fa-display'
},
// ==========================================
// COMMUNICATION (25 icons)
// ==========================================
{
  id: 'comment',
  name: 'Comment',
  category: 'communication',
  class: 'fa-solid fa-comment'
}, {
  id: 'comments',
  name: 'Comments',
  category: 'communication',
  class: 'fa-solid fa-comments'
}, {
  id: 'message',
  name: 'Message',
  category: 'communication',
  class: 'fa-solid fa-message'
}, {
  id: 'share',
  name: 'Share',
  category: 'communication',
  class: 'fa-solid fa-share'
}, {
  id: 'share-nodes',
  name: 'Share Nodes',
  category: 'communication',
  class: 'fa-solid fa-share-nodes'
}, {
  id: 'link',
  name: 'Link',
  category: 'communication',
  class: 'fa-solid fa-link'
}, {
  id: 'paper-plane',
  name: 'Send',
  category: 'communication',
  class: 'fa-solid fa-paper-plane'
}, {
  id: 'inbox',
  name: 'Inbox',
  category: 'communication',
  class: 'fa-solid fa-inbox'
}, {
  id: 'reply',
  name: 'Reply',
  category: 'communication',
  class: 'fa-solid fa-reply'
}, {
  id: 'reply-all',
  name: 'Reply All',
  category: 'communication',
  class: 'fa-solid fa-reply-all'
}, {
  id: 'quote-left',
  name: 'Quote Left',
  category: 'communication',
  class: 'fa-solid fa-quote-left'
}, {
  id: 'quote-right',
  name: 'Quote Right',
  category: 'communication',
  class: 'fa-solid fa-quote-right'
}, {
  id: 'at',
  name: 'At Symbol',
  category: 'communication',
  class: 'fa-solid fa-at'
}, {
  id: 'hashtag',
  name: 'Hashtag',
  category: 'communication',
  class: 'fa-solid fa-hashtag'
}, {
  id: 'bullhorn',
  name: 'Bullhorn',
  category: 'communication',
  class: 'fa-solid fa-bullhorn'
}, {
  id: 'rss',
  name: 'RSS',
  category: 'communication',
  class: 'fa-solid fa-rss'
}, {
  id: 'phone-volume',
  name: 'Phone Volume',
  category: 'communication',
  class: 'fa-solid fa-phone-volume'
}, {
  id: 'phone-slash',
  name: 'Phone Slash',
  category: 'communication',
  class: 'fa-solid fa-phone-slash'
}, {
  id: 'envelope-open',
  name: 'Envelope Open',
  category: 'communication',
  class: 'fa-solid fa-envelope-open'
}, {
  id: 'envelope-circle-check',
  name: 'Envelope Check',
  category: 'communication',
  class: 'fa-solid fa-envelope-circle-check'
}, {
  id: 'comment-dots',
  name: 'Comment Dots',
  category: 'communication',
  class: 'fa-solid fa-comment-dots'
}, {
  id: 'comment-sms',
  name: 'Comment SMS',
  category: 'communication',
  class: 'fa-solid fa-comment-sms'
}, {
  id: 'comment-slash',
  name: 'Comment Slash',
  category: 'communication',
  class: 'fa-solid fa-comment-slash'
}, {
  id: 'thumbs-up',
  name: 'Thumbs Up',
  category: 'communication',
  class: 'fa-solid fa-thumbs-up'
}, {
  id: 'thumbs-down',
  name: 'Thumbs Down',
  category: 'communication',
  class: 'fa-solid fa-thumbs-down'
},
// ==========================================
// SPINNERS (10 icons)
// ==========================================
{
  id: 'spinner',
  name: 'Spinner',
  category: 'spinners',
  class: 'fa-solid fa-spinner'
}, {
  id: 'circle-notch',
  name: 'Circle Notch',
  category: 'spinners',
  class: 'fa-solid fa-circle-notch'
}, {
  id: 'sync',
  name: 'Sync',
  category: 'spinners',
  class: 'fa-solid fa-sync'
}, {
  id: 'sync-alt',
  name: 'Sync Alt',
  category: 'spinners',
  class: 'fa-solid fa-sync-alt'
}, {
  id: 'rotate-spinner',
  name: 'Rotate',
  category: 'spinners',
  class: 'fa-solid fa-rotate'
}, {
  id: 'arrows-rotate-spinner',
  name: 'Arrows Rotate',
  category: 'spinners',
  class: 'fa-solid fa-arrows-rotate'
}, {
  id: 'yin-yang',
  name: 'Yin Yang',
  category: 'spinners',
  class: 'fa-solid fa-yin-yang'
}, {
  id: 'compact-disc',
  name: 'Compact Disc',
  category: 'spinners',
  class: 'fa-solid fa-compact-disc'
}, {
  id: 'fan',
  name: 'Fan',
  category: 'spinners',
  class: 'fa-solid fa-fan'
}, {
  id: 'dharmachakra',
  name: 'Dharma Wheel',
  category: 'spinners',
  class: 'fa-solid fa-dharmachakra'
},
// ==========================================
// BUSINESS (20 icons)
// ==========================================
{
  id: 'briefcase',
  name: 'Briefcase',
  category: 'business',
  class: 'fa-solid fa-briefcase'
}, {
  id: 'building',
  name: 'Building',
  category: 'business',
  class: 'fa-solid fa-building'
}, {
  id: 'chart-line',
  name: 'Chart Line',
  category: 'business',
  class: 'fa-solid fa-chart-line'
}, {
  id: 'chart-bar',
  name: 'Chart Bar',
  category: 'business',
  class: 'fa-solid fa-chart-bar'
}, {
  id: 'chart-pie',
  name: 'Chart Pie',
  category: 'business',
  class: 'fa-solid fa-chart-pie'
}, {
  id: 'money-bill',
  name: 'Money Bill',
  category: 'business',
  class: 'fa-solid fa-money-bill'
}, {
  id: 'dollar-sign',
  name: 'Dollar',
  category: 'business',
  class: 'fa-solid fa-dollar-sign'
}, {
  id: 'euro-sign',
  name: 'Euro',
  category: 'business',
  class: 'fa-solid fa-euro-sign'
}, {
  id: 'sterling-sign',
  name: 'Pound',
  category: 'business',
  class: 'fa-solid fa-sterling-sign'
}, {
  id: 'credit-card',
  name: 'Credit Card',
  category: 'business',
  class: 'fa-solid fa-credit-card'
}, {
  id: 'wallet',
  name: 'Wallet',
  category: 'business',
  class: 'fa-solid fa-wallet'
}, {
  id: 'handshake',
  name: 'Handshake',
  category: 'business',
  class: 'fa-solid fa-handshake'
}, {
  id: 'trophy',
  name: 'Trophy',
  category: 'business',
  class: 'fa-solid fa-trophy'
}, {
  id: 'medal',
  name: 'Medal',
  category: 'business',
  class: 'fa-solid fa-medal'
}, {
  id: 'award',
  name: 'Award',
  category: 'business',
  class: 'fa-solid fa-award'
}, {
  id: 'certificate',
  name: 'Certificate',
  category: 'business',
  class: 'fa-solid fa-certificate'
}, {
  id: 'scale-balanced',
  name: 'Scale',
  category: 'business',
  class: 'fa-solid fa-scale-balanced'
}, {
  id: 'gavel',
  name: 'Gavel',
  category: 'business',
  class: 'fa-solid fa-gavel'
}, {
  id: 'landmark',
  name: 'Landmark',
  category: 'business',
  class: 'fa-solid fa-landmark'
}, {
  id: 'university',
  name: 'University',
  category: 'business',
  class: 'fa-solid fa-university'
}];
const iconCategories = [{
  id: 'all',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('All Icons', 'themeplus')
}, {
  id: 'popular',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Popular', 'themeplus')
}, {
  id: 'interface',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Interface', 'themeplus')
}, {
  id: 'arrows',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Arrows', 'themeplus')
}, {
  id: 'social',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Social Media', 'themeplus')
}, {
  id: 'media',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media', 'themeplus')
}, {
  id: 'communication',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Communication', 'themeplus')
}, {
  id: 'spinners',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Spinners', 'themeplus')
}, {
  id: 'business',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Business', 'themeplus')
}];

/***/ }),

/***/ "./src/js/admin/hooks/useScrollbar.js":
/*!********************************************!*\
  !*** ./src/js/admin/hooks/useScrollbar.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * useScrollbar Hook
 * Shows scrollbar only when scrollable and on hover/scroll
 *
 * File: src/js/admin/hooks/useScrollbar.js
 */


function useScrollbar(options = {}) {
  const {
    hideDelay = 2000,
    showOnHover = true,
    isOpen = true
  } = options;
  const scrollRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [isScrollable, setIsScrollable] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isActive, setIsActive] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const hideTimeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isOpen) return;
    const element = scrollRef.current;
    if (!element) return;

    // Check if element is scrollable
    const checkScrollable = () => {
      const scrollable = element.scrollHeight > element.clientHeight;
      setIsScrollable(scrollable);
    };
    checkScrollable();
    setTimeout(checkScrollable, 100);
    const resizeObserver = new ResizeObserver(checkScrollable);
    resizeObserver.observe(element);
    const mutationObserver = new MutationObserver(checkScrollable);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true
    });

    // Show scrollbar on scroll
    const handleScroll = () => {
      setIsActive(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, hideDelay);
    };

    // Show scrollbar on hover
    const handleMouseEnter = () => {
      if (showOnHover) {
        setIsActive(true);
      }
    };

    // Hide scrollbar on leave (with delay)
    const handleMouseLeave = () => {
      if (showOnHover) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        hideTimeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, hideDelay);
      }
    };

    // Keep scrollbar visible when hovering scrollbar itself
    const handleMouseMove = e => {
      if (!showOnHover) return;
      const rect = element.getBoundingClientRect();
      const isNearScrollbar = e.clientX > rect.right - 16; // Within 16px of right edge

      if (isNearScrollbar) {
        // Mouse is on/near scrollbar - keep it visible
        setIsActive(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    };
    element.addEventListener('scroll', handleScroll);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      element.removeEventListener('scroll', handleScroll);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [hideDelay, showOnHover, isOpen]);
  const scrollbarClass = ['tpo-scrollbar', isScrollable ? 'tpo-scrollbar--scrollable' : '', isActive ? 'tpo-scrollbar--active' : ''].filter(Boolean).join(' ');
  return {
    scrollRef,
    scrollbarClass,
    isScrollable,
    isActive
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useScrollbar);

/***/ }),

/***/ "./src/js/admin/hooks/useUnsavedChanges.js":
/*!*************************************************!*\
  !*** ./src/js/admin/hooks/useUnsavedChanges.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useUnsavedChanges: () => (/* binding */ useUnsavedChanges)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * useUnsavedChanges Hook
 * Tracks unsaved changes across the app
 *
 * File: src/js/admin/hooks/useUnsavedChanges.js
 */


function useUnsavedChanges() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [originalValues, setOriginalValues] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [currentValues, setCurrentValues] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});

  /**
   * Initialize with saved values
   */
  const initialize = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(savedValues => {
    setOriginalValues(savedValues);
    setCurrentValues(savedValues);
    setHasUnsavedChanges(false);
  }, []);

  /**
   * Update current values
   */
  const updateValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((key, value) => {
    setCurrentValues(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  /**
   * Check if values have changed
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const hasChanges = JSON.stringify(currentValues) !== JSON.stringify(originalValues);
    setHasUnsavedChanges(hasChanges);
  }, [currentValues, originalValues]);

  /**
   * Mark as saved (updates original to current)
   */
  const markAsSaved = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setOriginalValues(currentValues);
    setHasUnsavedChanges(false);
  }, [currentValues]);

  /**
   * Browser beforeunload warning
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleBeforeUnload = e => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);
  return {
    hasUnsavedChanges,
    currentValues,
    initialize,
    updateValue,
    markAsSaved
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useUnsavedChanges);

/***/ }),

/***/ "./src/js/admin/services/CustomFontsService.js":
/*!*****************************************************!*\
  !*** ./src/js/admin/services/CustomFontsService.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Custom Fonts Service
 *
 * Handles API calls for custom fonts using WordPress apiFetch
 *
 * File: src/js/admin/services/CustomFontsService.js
 */


class CustomFontsService {
  /**
   * Get all custom fonts
   */
  async getFonts() {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: '/themeplus/v1/custom-fonts',
        method: 'GET'
      });
      return Object.values(data);
    } catch (error) {
      console.error('Error fetching custom fonts:', error);
      return [];
    }
  }

  /**
   * Get font names only (public endpoint)
   */
  async getFontNames() {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: '/themeplus/v1/custom-fonts/names',
        method: 'GET'
      });
      return data;
    } catch (error) {
      console.error('Error fetching font names:', error);
      return [];
    }
  }

  /**
   * Add custom font
   */
  async addFont(data) {
    try {
      const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: '/themeplus/v1/custom-fonts',
        method: 'POST',
        data: data
      });
      return result;
    } catch (error) {
      console.error('Error adding font:', error);
      throw error;
    }
  }

  /**
   * Update custom font
   */
  async updateFont(id, data) {
    try {
      const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: `/themeplus/v1/custom-fonts/${id}`,
        method: 'PUT',
        data: data
      });
      return result;
    } catch (error) {
      console.error('Error updating font:', error);
      throw error;
    }
  }

  /**
   * Delete custom font
   */
  async deleteFont(id) {
    try {
      const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
        path: `/themeplus/v1/custom-fonts/${id}`,
        method: 'DELETE'
      });
      return result;
    } catch (error) {
      console.error('Error deleting font:', error);
      throw error;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new CustomFontsService());

/***/ }),

/***/ "./src/js/admin/services/GoogleFontsService.js":
/*!*****************************************************!*\
  !*** ./src/js/admin/services/GoogleFontsService.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Google Fonts Service
 * Fetches and caches Google Fonts from Official API
 *
 * File: src/js/admin/services/GoogleFontsService.js
 */

const CACHE_KEY = 'themeplus_google_fonts';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

const POPULAR_FONTS = ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'PT Sans', 'Lora', 'Roboto Condensed', 'Source Sans Pro', 'Poppins', 'Merriweather', 'Ubuntu', 'Roboto Slab', 'Playfair Display', 'Noto Sans', 'PT Serif', 'Mukta', 'Rubik', 'Work Sans', 'Noto Serif', 'Titillium Web', 'Nunito', 'Nunito Sans', 'Heebo', 'Oxygen', 'Arimo', 'PT Sans Narrow', 'Karla', 'Cabin', 'Bitter', 'Crimson Text', 'Anton', 'Abel', 'Josefin Sans', 'Libre Baskerville', 'Quicksand', 'Archivo', 'Hind', 'Inconsolata', 'Dosis', 'Bebas Neue', 'Libre Franklin', 'Exo 2', 'Barlow', 'Prompt', 'Asap', 'Varela Round', 'Inter', 'DM Sans', 'Manrope'];
class GoogleFontsService {
  constructor() {
    this.fonts = [];
    this.loading = false;
    this.loadedFonts = new Set();
  }
  getCachedFonts() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      const data = JSON.parse(cached);
      const now = Date.now();
      if (now - data.timestamp < CACHE_DURATION) {
        return data.fonts;
      }
      localStorage.removeItem(CACHE_KEY);
      return null;
    } catch (error) {
      return null;
    }
  }
  cacheFonts(fonts) {
    try {
      const data = {
        fonts: fonts,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (error) {
      // Silent fail
    }
  }
  async fetchFromJSON() {
    const jsonUrl = window.themePlusData?.googleFontsUrl;
    if (!jsonUrl) {
      return POPULAR_FONTS;
    }
    try {
      const response = await fetch(jsonUrl);
      if (!response.ok) {
        throw new Error('Failed to load fonts JSON');
      }
      const data = await response.json();

      // Handle both trimmed format [{family, variants, category}]
      // and raw API format {items: [...]}
      const items = Array.isArray(data) ? data : data.items;
      return items.map(item => item.family);
    } catch (error) {
      console.warn('Google Fonts JSON failed, using fallback:', error);
      return POPULAR_FONTS;
    }
  }
  async loadFonts() {
    if (this.loading) {
      while (this.loading) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.fonts;
    }
    const cached = this.getCachedFonts();
    if (cached) {
      this.fonts = cached;
      return this.fonts;
    }
    this.loading = true;
    try {
      this.fonts = await this.fetchFromJSON();
      this.cacheFonts(this.fonts);
    } catch (error) {
      this.fonts = POPULAR_FONTS;
    } finally {
      this.loading = false;
    }
    return this.fonts;
  }
  async getFonts() {
    if (this.fonts.length > 0) {
      return this.fonts;
    }
    return await this.loadFonts();
  }
  loadFontPreview(fontFamily, subsets = ['latin']) {
    const fontKey = `${fontFamily}-${Array.isArray(subsets) ? subsets.join(',') : 'latin'}`;
    if (this.loadedFonts.has(fontKey)) {
      return;
    }
    const linkId = `google-font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}`;
    const fontName = fontFamily.replace(/\s+/g, '+');
    const subsetsParam = Array.isArray(subsets) && subsets.length > 0 ? `&subset=${subsets.join(',')}` : '';
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700&display=swap${subsetsParam}`;
    const existingLink = document.getElementById(linkId);
    if (existingLink) {
      existingLink.href = fontUrl;
      this.loadedFonts.add(fontKey);
      return;
    }
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = fontUrl;
    document.head.appendChild(link);
    this.loadedFonts.add(fontKey);
  }
  clearCache() {
    localStorage.removeItem(CACHE_KEY);
    this.fonts = [];
    this.loadedFonts.clear();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new GoogleFontsService());

/***/ }),

/***/ "./src/js/admin/utils/fieldHelpers.js":
/*!********************************************!*\
  !*** ./src/js/admin/utils/fieldHelpers.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   highlightText: () => (/* binding */ highlightText),
/* harmony export */   shouldShowField: () => (/* binding */ shouldShowField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Field Helper Utilities
 *
 * File: src/js/admin/utils/fieldHelpers.js
 */

/** Supported operators:
 *   ==, =        Equal to
 *   !=           Not equal to
 *   >            Greater than (numeric)
 *   <            Less than (numeric)
 *   >=           Greater than or equal to (numeric)
 *   <=           Less than or equal to (numeric)
 *   contains     Value contains string, or array contains item
 *   !contains    Value does not contain string, or array does not contain item
 *   empty        Field has no value / is empty
 *   !empty       Field has a value / is not empty
 */

/**
 * Supported 'required' formats:
 *
 * 1. Single condition (shorthand):
 *    'required' => ['field_id', '==', 'value']
 *
 * 2. Multiple conditions — AND (all must pass):
 *    'required' => [
 *      ['field_id', '==', 'value'],
 *      ['other_field', '!=', ''],
 *    ]
 *
 * 3. Multiple conditions — OR (any must pass):
 *    'required' => [
 *      'relation' => 'OR',
 *      ['field_id', '==', 'red'],
 *      ['field_id', '==', 'blue'],
 *    ]
 *
 * 4. Array of values — OR within a single rule (== any / != all):
 *    'required' => ['field_id', '==', ['classic', 'minimal']]
 *    'required' => ['field_id', '!=', ['classic', 'minimal']]
 *
 * 5. Mixed AND + array values:
 *    'required' => [
 *      ['enable_footer',     '==', true],
 *      ['site_footer_style', '==', ['classic', 'minimal']],
 *    ]
 */

/**
 * Resolve a scalar comparison value from any field type.
 * Array fields (dimensions, spacing, border, typography, background)
 * can be targeted via dot notation: 'container_width.width'
 *
 * @param {string} fieldId  e.g. 'container_width' or 'container_width.width'
 * @param {Object} options  Current saved options
 * @param {Object} defaults Field default values map
 * @returns {*}
 */
const resolveValue = (fieldId, options, defaults = {}) => {
  if (fieldId.includes('.')) {
    var _options$key;
    const [key, subKey] = fieldId.split('.');
    const parent = (_options$key = options[key]) !== null && _options$key !== void 0 ? _options$key : defaults[key];
    if (parent && typeof parent === 'object') {
      return parent[subKey];
    }
    return undefined;
  }
  const value = options[fieldId];
  return value !== undefined ? value : defaults[fieldId];
};

/**
 * Evaluate a single condition rule
 *
 * @param rule
 * @param {Object} options Current saved options
 * @param {Object} defaults Field default values map
 * @returns {boolean}
 */
const evaluateRule = (rule, options, defaults = {}) => {
  const [fieldId, operator, conditionValue] = rule;
  const currentValue = resolveValue(fieldId, options, defaults);

  // ── Array of values — ['field', '==', ['a', 'b']] ────────────────────────
  if (Array.isArray(conditionValue)) {
    if (operator === '==' || operator === '=') {
      // Match ANY value in the array
      // loose == intentional — handles "1" == true and numeric string coercion
      // noinspection EqualityComparisonWithCoercionJS
      return conditionValue.some(val => currentValue == val);
    }
    if (operator === '!=') {
      // Match NONE of the values in the array
      // noinspection EqualityComparisonWithCoercionJS
      return conditionValue.every(val => currentValue != val);
    }
  }
  switch (operator) {
    // Equality
    case '==':
    case '=':
      // noinspection EqualityComparisonWithCoercionJS
      return currentValue == conditionValue;
    // loose == intentional (handles "1" == true)

    // Inequality
    case '!=':
      // noinspection EqualityComparisonWithCoercionJS
      return currentValue != conditionValue;

    // Numeric comparisons
    case '>':
      return parseFloat(currentValue) > parseFloat(conditionValue);
    case '<':
      return parseFloat(currentValue) < parseFloat(conditionValue);
    case '>=':
      return parseFloat(currentValue) >= parseFloat(conditionValue);
    case '<=':
      return parseFloat(currentValue) <= parseFloat(conditionValue);

    // String / array contains
    case 'contains':
      if (Array.isArray(currentValue)) {
        return currentValue.includes(conditionValue);
      }
      if (typeof currentValue === 'string') {
        return currentValue.toLowerCase().includes(String(conditionValue).toLowerCase());
      }
      return false;

    // String / array does not contain
    case '!contains':
      if (Array.isArray(currentValue)) {
        return !currentValue.includes(conditionValue);
      }
      if (typeof currentValue === 'string') {
        return !currentValue.toLowerCase().includes(String(conditionValue).toLowerCase());
      }
      return true;

    // Empty check (null, undefined, '', [], {})
    case 'empty':
      if (currentValue === null || currentValue === undefined || currentValue === '') return true;
      if (Array.isArray(currentValue)) return currentValue.length === 0;
      if (typeof currentValue === 'object') return Object.keys(currentValue).length === 0;
      return false;

    // Not empty
    case '!empty':
      if (currentValue === null || currentValue === undefined || currentValue === '') return false;
      if (Array.isArray(currentValue)) return currentValue.length > 0;
      if (typeof currentValue === 'object') return Object.keys(currentValue).length > 0;
      return true;
    default:
      return true;
  }
};

/**
 * Check if a field should be displayed based on its 'required' config.
 *
 * @param {Object} field   Field configuration object
 * @param {Object} options Current saved options
 * @param {Object} defaults Field default values map
 * @returns {boolean}
 */
const shouldShowField = (field, options, defaults = {}) => {
  if (!field.required) return true;
  const required = field.required;

  // ── Format 1: shorthand single rule ──────────────────────────────────────
  // 'required' => ['field_id', '==', 'value']
  if (typeof required[0] === 'string') {
    return evaluateRule(required, options, defaults);
  }

  // ── Format 2 & 3: multiple rules with AND (default) or OR ────────────────
  // 'required' => [['field','==','val'], ['other','!=','']]           → AND
  // 'required' => ['relation'=>'OR', ['field','==','a'], [...]]       → OR
  const relation = (required.relation || 'AND').toUpperCase();

  // Collect only the actual rule arrays (skip the 'relation' key)
  const rules = Object.values(required).filter(item => Array.isArray(item));
  if (relation === 'OR') {
    return rules.some(rule => evaluateRule(rule, options, defaults));
  }

  // AND (default)
  return rules.every(rule => evaluateRule(rule, options, defaults));
};

/**
 * Highlight matching text in search results
 *
 * @param {string} text  Text to highlight
 * @param {string} query Search query
 * @returns {JSX.Element|string}
 */
const highlightText = (text, query) => {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (part.toLowerCase() === query.toLowerCase()) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("mark", {
        key: index,
        className: "tpo-highlight"
      }, part);
    }
    return part;
  });
};

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/js/admin/index.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/js/admin/App.jsx");

/**
 * ThemePlus Admin App Entry Point
 *
 * File: src/js/admin/index.js
 */




// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('themeplus-root');
  if (root) {
    const appRoot = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root);
    appRoot.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map