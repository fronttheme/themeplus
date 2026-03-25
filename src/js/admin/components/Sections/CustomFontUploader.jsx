/**
 * ThemePlus Custom Font Uploader
 *
 * File: src/js/admin/components/Sections/CustomFontUploader.jsx
 *
 * @package ThemePlus
 * @since 1.0.0
 */

import {__} from '@wordpress/i18n';
import {useState, useEffect} from '@wordpress/element';
import Modal from '../Common/Modal';
import Notice from '../Common/Notice';
import Dialog from '../Common/Dialog';
import CustomFontsService from '../../services/CustomFontsService';
import TextInput from '../Common/TextInput';
import Button from "../Common/Button";
import FileUpload from "../Common/FileUpload";

function CustomFontUploader({onFontsUpdated}) {

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Data state
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingFont, setEditingFont] = useState(null);
  const [modalError, setModalError] = useState(null);

  // Form state
  const [fontName, setFontName] = useState('');
  const [fontFiles, setFontFiles] = useState({
    regular: {id: null, filename: null},
    italic: {id: null, filename: null},
    bold: {id: null, filename: null},
    bold_italic: {id: null, filename: null},
  });

  // Action state
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Notice state
  const [notice, setNotice] = useState(null);

  // ============================================================================
  // LIFECYCLE
  // ============================================================================

  useEffect(() => {
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
  const cleanFontName = (filename) => {
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
  const getFileId = (file) => {
    if (!file) return null;
    if (typeof file === 'object' && file.id) return file.id;
    if (typeof file === 'number') return file;
    return null;
  };

  /**
   * Get filename from file data
   */
  const getFilename = (file) => {
    if (!file) return null;
    if (typeof file === 'object' && file.filename) return file.filename;
    return null;
  };

  /**
   * Show page-level notice
   */
  const showNotice = (message, type = 'success') => {
    setNotice({message, type});
    setTimeout(() => setNotice(null), 3000);
  };

  /**
   * Show modal-level error
   */
  const showModalError = (message) => {
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
    return fonts.some(font =>
      font.name.toLowerCase() === name.toLowerCase() &&
      font.id !== excludeId
    );
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
  const loadFontCSS = (font) => {
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
    const data = await CustomFontsService.getFonts();

    // Validate which fonts have existing files
    const fontsWithStatus = await Promise.all(
      data.map(async (font) => {
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

        return {...font, fileExists};
      })
    );

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
      regular: {id: null, filename: null},
      italic: {id: null, filename: null},
      bold: {id: null, filename: null},
      bold_italic: {id: null, filename: null},
    });
    setModalError(null);
    setShowModal(true);
  };

  /**
   * Open edit modal
   */
  const openEditModal = (font) => {
    setEditingFont(font);
    setFontName(font.name);

    // Detect if we're in "fix mode"
    const isFixMode = !font.fileExists;

    // Convert from database format to component format
    const filesWithNames = {
      regular: {id: null, filename: null},
      italic: {id: null, filename: null},
      bold: {id: null, filename: null},
      bold_italic: {id: null, filename: null},
    };

    Object.keys(font.files || {}).forEach(variant => {
      const fileId = getFileId(font.files[variant]);

      if (fileId) {
        filesWithNames[variant] = {
          id: fileId,
          filename: isFixMode ? 'File not available!' : 'Loading...',
        };

        // Only fetch if NOT in fix mode
        if (!isFixMode) {
          wp.media.attachment(fileId).fetch().then(function () {
            const attachment = wp.media.attachment(fileId);
            setFontFiles(prev => ({
              ...prev,
              [variant]: {
                id: fileId,
                filename: attachment.get('filename') || attachment.get('title') || 'font-file',
              },
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
  const openMediaUploader = (variant) => {
    const frame = wp.media({
      title: __('Select Font File', 'themeplus'),
      button: {
        text: __('Use this file', 'themeplus'),
      },
      library: {
        type: [
          'application/x-font-woff',
          'application/x-font-woff2',
          'application/x-font-ttf',
          'font/woff',
          'font/woff2',
        ],
      },
      multiple: false,
    });

    frame.on('select', function () {
      const attachment = frame.state().get('selection').first().toJSON();

      // Check if file already used
      if (checkDuplicateFile(attachment.id, editingFont?.id)) {
        showModalError(__('This font file is already uploaded in another font. Please select a different file.', 'themeplus'));
        return;
      }

      // Store file info
      setFontFiles({
        ...fontFiles,
        [variant]: {
          id: attachment.id,
          filename: attachment.filename || attachment.title || 'font-file.woff2',
        },
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
      showModalError(__('Please enter a font name', 'themeplus'));
      return;
    }

    // Get regular file ID
    const regularFileId = getFileId(fontFiles.regular);

    if (!regularFileId) {
      showModalError(__('Please upload at least the regular font file', 'themeplus'));
      return;
    }

    // Check duplicate name
    if (checkDuplicateName(fontName, editingFont?.id)) {
      showModalError(__('A font with this name already exists. Please use a different name.', 'themeplus'));
      return;
    }

    // Check duplicate file
    if (checkDuplicateFile(regularFileId, editingFont?.id)) {
      showModalError(__('This font file is already uploaded. Please select a different file.', 'themeplus'));
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
        bold_italic: getFileId(fontFiles.bold_italic),
      };

      const data = {
        name: fontName,
        files: filesData,
      };

      if (editingFont) {
        await CustomFontsService.updateFont(editingFont.id, data);
        showNotice(__('Font updated successfully', 'themeplus'));
      } else {
        const result = await CustomFontsService.addFont(data);
        showNotice(__('Font added successfully', 'themeplus'));

        if (result.id) {
          const newFont = {
            id: result.id,
            name: fontName,
            files: filesData,
          };
          loadFontCSS(newFont);
        }
      }

      setShowModal(false);
      await loadFonts();
    } catch (error) {
      showModalError(error.message || __('An error occurred', 'themeplus'));
    } finally {
      setSaving(false);
    }
  };

  /**
   * Confirm delete font
   */
  const confirmDeleteFont = (font) => {
    setDeleteConfirm({
      id: font.id,
      name: font.name,
    });
  };

  /**
   * Delete font (confirmed)
   */
  const deleteFont = async () => {
    if (!deleteConfirm) return;

    setDeleting(deleteConfirm.id);

    try {
      await CustomFontsService.deleteFont(deleteConfirm.id);

      // Remove font CSS from page
      const styleId = `custom-font-${deleteConfirm.id}`;
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }

      showNotice(__('Font deleted successfully', 'themeplus'));
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

    return (
      <div className="tpo-font-file-upload" key={variant}>
        <label>
          {label}
          {required && <span style={{color: 'red'}}> *</span>}
        </label>
        <div className="tpo-font-file-upload__wrapper">
          <Button
            color="light"
            onClick={() => openMediaUploader(variant)}
            disabled={saving}>
            {fileId
              ? (isFixMode ? __('Reupload File', 'themeplus') : __('Change File', 'themeplus'))
              : __('Upload File', 'themeplus')
            }
          </Button>
          {fileId && filename && (
            <div className="tpo-custom-font-uploads">
              <span
                className="tpo-font-file-upload__filename"
                title={filename}
                style={filename === 'File not available!' ? {color: '#ff418a'} : {}}>
              <i className="fa-solid fa-file-lines"></i>
                {filename}
            </span>
              <Button
                className="tpo-button--small-dismiss"
                size="small"
                color="danger"
                onClick={() => setFontFiles({
                  ...fontFiles,
                  [variant]: {id: null, filename: null}
                })}
                disabled={saving}
                iconOnly={true}
                ariaLabel={__('Remove File', 'themeplus')}>
                <i className="fa-solid fa-xmark"></i>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="tpo-custom-font-uploader">

      {/* Page Notice - Auto-dismiss success, manual dismiss errors */}
      {notice && (
        <Notice
          status={notice.type}
          isDismissible={true}
          autoDismiss={notice.type === 'success' ? 3000 : null}
          onDismiss={() => setNotice(null)}
        >
          {notice.message}
        </Notice>
      )}

      {/* Header */}
      <div className="tpo-custom-font-uploader__header">
        <FileUpload
          variant="button"
          icon="fa-cloud-arrow-up"
          label={__('Add Font', 'themeplus')}
          onClick={openAddModal}
        />
      </div>

      {/* Fonts List */}
      <div className="tpo-custom-font-uploader__list">
        {loading ? (
          <p>{__('Loading fonts...', 'themeplus')}</p>
        ) : fonts.length === 0 ? (
          <div className="tpo-custom-font-uploader__empty">
            <p>{__('No custom fonts yet. Click "Add Font" to upload your first custom font.', 'themeplus')}</p>
          </div>
        ) : (
          <table className="tpo-custom-font-uploader__table widefat">
            <thead>
            <tr>
              <th>{__('Font Name', 'themeplus')}</th>
              <th>{__('Variants', 'themeplus')}</th>
              <th>{__('Preview', 'themeplus')}</th>
              <th>{__('Actions', 'themeplus')}</th>
            </tr>
            </thead>
            <tbody>
            {fonts.map((font) => (
              <tr
                key={font.id}
                className={`
                    ${deleting === font.id ? 'tpo-font-row--deleting' : ''}
                    ${!font.fileExists ? 'tpo-font-row--invalid' : ''}
                  `.trim()}
              >
                <td className="tpo-custom-fonts--name">
                  {font.name}
                  {!font.fileExists && (
                    <span
                      className="tpo-font-warning"
                      title={__('Font file not found in Media Library', 'themeplus')}
                    >
                        <i className="fa-solid fa-triangle-exclamation"></i>
                      </span>
                  )}
                </td>
                <td className="tpo-custom-fonts--variants">
                  {font.fileExists
                    ? `${Object.keys(font.files || {}).filter(v => getFileId(font.files[v])).length} variant(s)`
                    : <span className="tpo-text-muted">{__('File missing', 'themeplus')}</span>
                  }
                </td>
                <td className="tpo-custom-fonts--preview">
                  {font.fileExists ? (
                    <span style={{fontFamily: font.name, fontSize: '18px'}}>
                        {__('The quick brown fox', 'themeplus')}
                      </span>
                  ) : (
                    <span className="tpo-text-muted">{__('—', 'themeplus')}</span>
                  )}
                </td>
                <td className="tpo-custom-fonts--action">
                  <div className="tpo-actions-bar">
                    <Button
                      color={!font.fileExists ? "info" : "muted"}
                      onClick={() => openEditModal(font)}
                      disabled={deleting === font.id}
                      title={!font.fileExists ? __('Re-upload font files', 'themeplus') : ''}
                      ariaLabel={!font.fileExists ? __('Re-upload font files', 'themeplus') : ''}
                      iconOnly={true}>
                      {!font.fileExists ? <i className="fa-solid fa-arrows-rotate"></i> :
                        <i className="fa-solid fa-pencil"></i>}
                    </Button>
                    {' '}
                    <Button
                      color="muted"
                      onClick={() => confirmDeleteFont(font)}
                      disabled={deleting === font.id}
                      loading={deleting === font.id}
                      iconOnly={true}
                      ariaLabel={__('Delete font', 'themeplus')}>
                      {deleting === font.id ? <i className="fa-solid fa-spinner"></i> :
                        <i className="fa-solid fa-trash-can"></i>}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => !saving && setShowModal(false)}
          title={
            <>
              {saving && <i className="fa-solid fa-spinner fa-spin" style={{marginRight: '8px'}}/>}
              {editingFont
                ? editingFont.fileExists
                  ? (saving ? __('Updating Font...', 'themeplus') : __('Edit Custom Font', 'themeplus'))
                  : (saving ? __('Re-adding Font...', 'themeplus') : __('Fix Custom Font', 'themeplus'))
                : (saving ? __('Adding Font...', 'themeplus') : __('Add Custom Font', 'themeplus'))
              }
            </>
          }
          size="medium"
          closeOnClickOutside={!saving}
          closeOnEscape={!saving}
          showCloseButton={!saving}
          showFooter={true}
          footer={
            <div className="tpo-custom-font-uploader__footer tpo-field-group--button">
              <Button
                onClick={saveFont}
                disabled={saving}
                loading={saving}>
                {editingFont
                  ? (editingFont.fileExists
                      ? __('Update Font', 'themeplus')
                      : __('Add Font', 'themeplus')
                  )
                  : __('Add Font', 'themeplus')
                }
              </Button>
              <Button
                color="muted"
                onClick={() => setShowModal(false)}
                disabled={saving}>
                {__('Cancel', 'themeplus')}
              </Button>
            </div>
          }>
          {/* Modal Error Notice */}
          {modalError && (
            <Notice
              status="danger"
              isDismissible={true}
              onDismiss={() => setModalError(null)}
            >
              {modalError}
            </Notice>
          )}

          {/* Font Name */}
          <TextInput
            label={__('Font Name', 'themeplus')}
            value={fontName}
            onChange={(value) => {
              setFontName(value);
              if (modalError && value) {
                setModalError(null);
              }
            }}
            placeholder={__('My Custom Font', 'themeplus')}
            disabled={saving}
            required={true}
            fullWidth={true}
          />

          {/* Font Files */}
          <div className="tpo-font-files">
            <div className="tpo-custom-font-files--header">
              <h4>{__('Font Files', 'themeplus')}</h4>
              <p className="description">
                {__('Upload font files for different variants. Regular weight is required.', 'themeplus')}
              </p>
            </div>
            {renderFileUploader('regular', __('Regular', 'themeplus'), true)}
            {renderFileUploader('italic', __('Italic (Optional)', 'themeplus'))}
            {renderFileUploader('bold', __('Bold (Optional)', 'themeplus'))}
            {renderFileUploader('bold_italic', __('Bold Italic (Optional)', 'themeplus'))}
          </div>

          {/* Accepted Formats */}
          <div className="tpo-font-formats">
            <p className="description">
              <strong>{__('Accepted formats:', 'themeplus')}</strong> .woff, .woff2
              <br/>
              <strong>{__('Recommended:', 'themeplus')}</strong> .woff2 for best performance
              <br/>
              <strong>{__('Convert your fonts:', 'themeplus')}</strong>{' '}
              <a href="https://www.fontsquirrel.com/tools/webfont-generator" target="_blank" rel="noopener noreferrer">
                {__('Font Squirrel Webfont Generator', 'themeplus')}
              </a>
            </p>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <Dialog
          isOpen={!!deleteConfirm}
          onClose={() => !deleting && setDeleteConfirm(null)}
          title={__('Delete Custom Font', 'themeplus')}
          message={__(
            'Are you sure you want to delete "%s"? This action cannot be undone.',
            'themeplus'
          ).replace('%s', deleteConfirm.name)}
          type="confirm"
          onConfirm={deleteFont}
          confirmText={__('Delete', 'themeplus')}
          cancelText={__('Cancel', 'themeplus')}
        />
      )}
    </div>
  );
}

export default CustomFontUploader;