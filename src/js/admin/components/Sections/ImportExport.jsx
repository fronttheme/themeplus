/**
 * ThemePlus Import/Export Component
 *
 * File: src/js/admin/components/Sections/ImportExport.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
import {useSettings} from '../../context/SettingsContext';
import apiFetch from '@wordpress/api-fetch';

function ImportExport({showModal}) {
  const {options, setOptions, saveOptions} = useSettings();
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importData, setImportData] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  /**
   * Export options as JSON
   */
  const handleExport = () => {
    setExporting(true);

    try {
      const jsonData = JSON.stringify(options, null, 2);
      const blob = new Blob([jsonData], {type: 'application/json'});
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
        title: __('Success!', 'themeplus'),
        message: __('Settings exported successfully!', 'themeplus'),
      });
    } catch (error) {
      console.error('Export error:', error);

      // Modal call
      showModal({
        type: 'error',
        title: __('Error!', 'themeplus'),
        message: __('Failed to export settings.', 'themeplus'),
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
        title: __('Warning', 'themeplus'),
        message: __('Please paste your settings data.', 'themeplus'),
      });
      return;
    }

    // Show confirm modal with onConfirm callback
    showModal({
      type: 'confirm',
      title: __('Import Settings?', 'themeplus'),
      message: __('This will replace all current settings. Are you sure you want to continue?', 'themeplus'),
      onConfirm: async () => {
        setImporting(true);

        try {
          const parsedData = JSON.parse(importData);

          if (typeof parsedData !== 'object' || parsedData === null) {
            throw new Error('Invalid data format');
          }

          setOptions(parsedData);

          const response = await apiFetch({
            path: '/themeplus/v1/options',
            method: 'POST',
            data: {options: parsedData},
          });

          if (response.success) {
            showModal({
              type: 'success',
              title: __('Success!', 'themeplus'),
              message: __('Settings imported successfully! Page will reload.', 'themeplus'),
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
            title: __('Error!', 'themeplus'),
            message: __('Failed to import settings. Please check your data format.', 'themeplus'),
          });
        } finally {
          setImporting(false);
        }
      },
    });
  };

  /**
   * Import from file
   */
  const handleFileImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setImportData(content);
        setShowImportBox(true);
      }
    };

    reader.onerror = () => {
      showModal({
        type: 'error',
        title: __('Error!', 'themeplus'),
        message: __('Failed to read file.', 'themeplus'),
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
      title: __('Reset All Settings?', 'themeplus'),
      message: __('Are you sure you want to reset all settings to default? This action cannot be undone!', 'themeplus'),
      confirmText: __('Yes, Reset All', 'themeplus'),
      cancelText: __('Cancel', 'themeplus'),
      onConfirm: async () => {
        try {
          const response = await apiFetch({
            path: '/themeplus/v1/options/reset',
            method: 'POST',
          });

          if (response.success) {
            showModal({
              type: 'success',
              title: __('Success!', 'themeplus'),
              message: __('Settings reset successfully! Page will reload.', 'themeplus'),
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
            title: __('Error!', 'themeplus'),
            message: __('Failed to reset settings.', 'themeplus'),
          });
        }
      },
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
        title: __('Success!', 'themeplus'),
        message: __('Settings copied to clipboard!', 'themeplus'),
      });
    } catch (error) {
      console.error('Copy error:', error);

      showModal({
        type: 'error',
        title: __('Error!', 'themeplus'),
        message: __('Failed to copy settings.', 'themeplus'),
      });
    }
  };

  return (
    <div className="tpo-import-export">
      {/* Export Section */}
      <div className="tpo-import-export__section">
        <div className="tpo-import-export__header">
          <h3 className="tpo-import-export__title">
            <i className="fa-solid fa-floppy-disk"></i>
            {__('Export Settings', 'themeplus')}
          </h3>
          <p className="tpo-import-export__description">
            {__('Download your current settings as a JSON file.', 'themeplus')}
          </p>
        </div>

        <div className="tpo-import-export__actions tpo-field-group--button">
          <button
            type="button"
            className="tpo-import-export__button tpo-import-export__button--primary tpo-button tpo-button--secondary"
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? __('Exporting...', 'themeplus') : __('Download Settings', 'themeplus')}
          </button>

          <button
            type="button"
            className="tpo-import-export__button tpo-import-export__button--secondary tpo-button tpo-button--green"
            onClick={handleCopySettings}
          >
            {__('Copy to Clipboard', 'themeplus')}
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="tpo-import-export__section">
        <div className="tpo-import-export__header">
          <h3 className="tpo-import-export__title">
            <i className="fa-solid fa-file-export"></i>
            {__('Import Settings', 'themeplus')}
          </h3>
          <p className="tpo-import-export__description">
            {__('Upload a settings file or paste JSON data to import.', 'themeplus')}
          </p>
        </div>

        <div className="tpo-import-export__actions tpo-field-group--button">
          <label className="tpo-import-export__file-label tpo-button tpo-button--secondary">
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleFileImport}
              className="tpo-import-export__file-input"
            />
            <span className="tpo-import-export__button tpo-import-export__button--primary">
              {__('Upload JSON File', 'themeplus')}
            </span>
          </label>

          <button
            type="button"
            className="tpo-import-export__button tpo-import-export__button--secondary tpo-button tpo-button--info"
            onClick={() => setShowImportBox(!showImportBox)}
          >
            {showImportBox ? __('Hide Text Box', 'themeplus') : __('Paste JSON Data', 'themeplus')}
          </button>
        </div>

        {/* Import Text Box */}
        {showImportBox && (
          <div className="tpo-import-export__import-box">
            <textarea
              className="tpo-import-export__textarea"
              placeholder={__('Paste your exported JSON data here...', 'themeplus')}
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              rows={10}
            />
            <div className="tpo-import-export__import-actions tpo-field-group--button">
              <button
                type="button"
                className="tpo-import-export__button tpo-import-export__button--success tpo-button tpo-button--primary"
                onClick={handleImport}
                disabled={importing || !importData.trim()}
              >
                {importing ? __('Importing...', 'themeplus') : __('Import Settings', 'themeplus')}
              </button>
              <button
                type="button"
                className="tpo-import-export__button tpo-import-export__button--secondary tpo-button tpo-button--secondary"
                onClick={() => {
                  setImportData('');
                  setShowImportBox(false);
                }}
              >
                {__('Cancel', 'themeplus')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset Section */}
      <div className="tpo-import-export__section tpo-import-export__section--danger">
        <div className="tpo-import-export__header">
          <h3 className="tpo-import-export__title">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {__('Reset Settings', 'themeplus')}
          </h3>
          <p className="tpo-import-export__description">
            {__('Reset all settings to their default values. This action cannot be undone.', 'themeplus')}
          </p>
        </div>

        <div className="tpo-import-export__actions tpo-field-group--button">
          <button
            type="button"
            className="tpo-import-export__button tpo-import-export__button--danger tpo-button tpo-button--danger"
            onClick={handleReset}
          >
            {__('Reset All Settings', 'themeplus')}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="tpo-import-export__info">
        <h4 className="tpo-import-export__info-title">
          <i className="fa-solid fa-lightbulb"></i>
          {__('Tips', 'themeplus')}
        </h4>
        <ul className="tpo-import-export__info-list">
          <li>{__('Always backup your settings before making major changes.', 'themeplus')}</li>
          <li>{__('Exported files can be imported on any site running ThemePlus.', 'themeplus')}</li>
          <li>{__('Import will overwrite all current settings.', 'themeplus')}</li>
          <li>{__('Reset will restore default values for all options.', 'themeplus')}</li>
        </ul>
      </div>
    </div>
  );
}

export default ImportExport;