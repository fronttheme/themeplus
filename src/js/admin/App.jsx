/**
 * ThemePlus Main App Component
 *
 * File: src/js/admin/App.jsx
 */

import {useState, useEffect, useCallback} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

// Context
import {SettingsProvider} from './context/SettingsContext';
import {ThemeProvider} from './context/ThemeContext';

// Custom Hook
import useUnsavedChanges from './hooks/useUnsavedChanges';

// Layout Components
import MainWrapper from './components/Layout/MainWrapper';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Body from './components/Layout/Body';
import Footer from './components/Layout/Footer';
import Dialog from './components/Common/Dialog';

import Preloader from './components/Common/Preloader';

function App() {
  const [loading, setLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState({sections: [], fields: {}});
  const [options, setOptions] = useState({});
  const [activeTab, setActiveTab] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [preloaderEnabled] = useState(() => {
    const stored = localStorage.getItem('themeplus_preloader_enabled');
    return stored === null ? true : stored === 'true';
  });

  // Minimum display time: 6500ms (to see full animation)
  const MIN_LOADING_TIME = 7000;

  useEffect(() => {
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
    markAsSaved,
  } = useUnsavedChanges();

  const [dialog, setDialog] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    onConfirm: null,
    confirmText: __('OK', 'themeplus'),
    cancelText: __('Cancel', 'themeplus'),
  });

  useEffect(() => {
    loadData().catch(error => {
      console.error('Failed to load data:', error);
    });
  }, []);

  const showDialog = useCallback(({
                                    type = 'success',
                                    title = '',
                                    message = '',
                                    confirmText = __('OK', 'themeplus'),
                                    cancelText = __('Cancel', 'themeplus'),
                                    onConfirm = null,
                                  }) => {
    setDialog({
      isOpen: true,
      type,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
    });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog({...dialog, isOpen: false});
  }, [dialog]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const configResponse = await apiFetch({
        path: '/themeplus/v1/config',
        method: 'GET',
      });

      if (!configResponse.success) {
        throw new Error('Failed to load configuration');
      }

      const sectionsArray = Object.values(configResponse.data.sections);

      setConfig({
        sections: sectionsArray,
        fields: configResponse.data.fields,
      });

      if (sectionsArray.length > 0) {
        setActiveTab(sectionsArray[0].id);
      }

      const optionsResponse = await apiFetch({
        path: '/themeplus/v1/options',
        method: 'GET',
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
  const handleSetOptions = useCallback((updater) => {
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

  const saveOptions = useCallback(async () => {
    try {
      const response = await apiFetch({
        path: '/themeplus/v1/options',
        method: 'POST',
        data: {options: currentValues}, // Save currentValues
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
          title: __('Success!', 'themeplus'),
          message: __('Options saved successfully!', 'themeplus')
        });
      } else {
        throw new Error(response.message || 'Failed to save options');
      }
    } catch (error) {
      console.error('Error saving options:', error);
      showDialog({
        type: 'error',
        title: __('Error!', 'themeplus'),
        message: __('Failed to save options: ', 'themeplus') + error.message
      });
    }
  }, [currentValues, markAsSaved, showDialog]);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const resetSection = useCallback(() => {
    showDialog({
      type: 'confirm',
      title: __('Reset Section?', 'themeplus'),
      message: __('Are you sure you want to reset this section to default values?', 'themeplus'),
      onConfirm: async () => {
        try {
          const sectionId = activeTab.includes('__') ? activeTab.split('__')[0] : activeTab;

          const response = await apiFetch({
            path: '/themeplus/v1/options/reset-section',
            method: 'POST',
            data: {section_id: sectionId},
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
              title: __('Success!', 'themeplus'),
              message: __('Section reset successfully!', 'themeplus')
            });
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error('Error resetting section:', error);
          showDialog({
            type: 'error',
            title: __('Error!', 'themeplus'),
            message: __('Failed to reset section: ', 'themeplus') + error.message
          });
        }
      }
    });
  }, [activeTab, initialize, showDialog]);

  const resetAll = useCallback(() => {
    showDialog({
      type: 'confirm',
      title: __('Reset All Settings?', 'themeplus'),
      message: __('Are you sure you want to reset ALL settings to default values? This action cannot be undone!', 'themeplus'),
      onConfirm: async () => {
        try {
          const response = await apiFetch({
            path: '/themeplus/v1/options/reset',
            method: 'POST',
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
              title: __('Success!', 'themeplus'),
              message: __('All settings reset successfully!', 'themeplus')
            });
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          console.error('Error resetting all:', error);
          showDialog({
            type: 'error',
            title: __('Error!', 'themeplus'),
            message: __('Failed to reset settings: ', 'themeplus') + error.message
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
    return (
      <Preloader
        message={__('Loading ThemePlus', 'themeplus')}
        variant="animated"
        overlay={false}
      />
    );
  }

  if (error) {
    return (
      <div className="tpo-error">
        <div className="tpo-error__icon">⚠️</div>
        <h2 className="tpo-error__title">{__('Error Loading ThemePlus', 'themeplus')}</h2>
        <p className="tpo-error__message">{error}</p>
        <button className="tpo-error__button" onClick={loadData}>{__('Try Again', 'themeplus')}</button>
      </div>
    );
  }

  // CRITICAL: Pass handleSetOptions wrapper instead of raw setOptions
  const settingsValue = {
    options,
    setOptions: handleSetOptions,
  };

  return (
    <ThemeProvider>
      <SettingsProvider value={settingsValue}>
        <MainWrapper>
          <Sidebar
            sections={config.sections}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <div className="tpo-body-wrapper">
            <Header
              onSave={saveOptions}
              onResetSection={resetSection}
              onResetAll={resetAll}
              activeSection={searchQuery ? `Search: "${searchQuery}"` : getActiveSectionName()}
              hasUnsavedChanges={hasUnsavedChanges}
            />
            <Body
              sections={config.sections}
              activeTab={activeTab}
              showDialog={showDialog}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
            <Footer
              onSave={saveOptions}
              onResetSection={resetSection}
              onResetAll={resetAll}
            />
          </div>
        </MainWrapper>

        <Dialog
          isOpen={dialog.isOpen}
          onClose={closeDialog}
          type={dialog.type}
          title={dialog.title}
          message={dialog.message}
          confirmText={dialog.confirmText}
          cancelText={dialog.cancelText}
          onConfirm={dialog.onConfirm}
        />
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;