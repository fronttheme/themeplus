/**
 * ThemePlus Code Editor Field - Syntax Highlighting
 * Uses WordPress wp.codeEditor API (CodeMirror)
 *
 * File: src/js/admin/components/Fields/CodeEditorField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useEffect, useRef} from '@wordpress/element';
import Button from '../Common/Button';

function CodeEditorField({
                           id,
                           label,
                           value = '',
                           onChange,
                           mode = 'css',
                           height = 300,
                           help = '',
                           showModal, // Modal function from parent
                         }) {
  const [code, setCode] = useState(value);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const editorRef = useRef(null);

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
      json: 'application/json',
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
          'Cmd-/': 'toggleComment',
        },
      },
    };
  };

  /**
   * Initialize CodeMirror editor
   */
  useEffect(() => {
    if (!textareaRef.current || !window.wp || !window.wp.codeEditor) {
      console.warn('WordPress CodeEditor not available');
      return;
    }

    // Initialize editor
    const settings = window.wp.codeEditor.defaultSettings
      ? {...window.wp.codeEditor.defaultSettings, ...getEditorSettings()}
      : getEditorSettings();

    editorRef.current = window.wp.codeEditor.initialize(
      textareaRef.current,
      settings
    );

    // Handle changes
    if (editorRef.current && editorRef.current.codemirror) {
      editorRef.current.codemirror.on('change', (cm) => {
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
  useEffect(() => {
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
      json: 'JSON',
    };
    return labels[mode] || mode.toUpperCase();
  };

  /**
   * Copy code to clipboard
   */
  const copyCode = () => {
    const textToCopy = editorRef.current && editorRef.current.codemirror
      ? editorRef.current.codemirror.getValue()
      : code;

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
        formatted = code
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/;\s*/g, ';\n  ')
          .replace(/\s*}\s*/g, '\n}\n')
          .replace(/,\s*/g, ',\n')
          .trim();
      } else if (mode === 'javascript' || mode === 'js') {
        formatted = code
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/;\s*/g, ';\n  ')
          .replace(/\s*}\s*/g, '\n}\n')
          .trim();
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
        title: __('Clear Code?', 'themeplus'),
        message: __('Are you sure you want to clear all code? This action cannot be undone.', 'themeplus'),
        confirmText: __('Clear', 'themeplus'),
        cancelText: __('Cancel', 'themeplus'),
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
      if (confirm(__('Are you sure you want to clear all code?', 'themeplus'))) {
        if (editorRef.current && editorRef.current.codemirror) {
          editorRef.current.codemirror.setValue('');
        }
        setCode('');
        onChange('');
      }
    }
  };

  // Fallback if CodeEditor not available
  const fallbackEditor = (
    <textarea
      ref={textareaRef}
      className="tpo-code-editor__textarea"
      value={code}
      onChange={(e) => {
        setCode(e.target.value);
        onChange(e.target.value);
      }}
      style={{minHeight: `${height}px`}}
      placeholder={__('Enter code here...', 'themeplus')}
    />
  );

  return (
    <div className="tpo-field tpo-field--code-editor">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-code-editor tpo-field-card">
          {/* Editor toolbar */}
          <div className="tpo-code-editor__toolbar">
            <div className="tpo-code-editor__info">
              <span className="tpo-code-editor__language">
                <i className="fa-solid fa-laptop-code"></i>
                {getLanguageLabel()}
              </span>
              <span className="tpo-code-editor__lines">
                {code.split('\n').length} {__('lines', 'themeplus')}
              </span>
            </div>
            <div className="tpo-code-editor__actions tpo-field-group--button">
              <Button
                size="small"
                color="light"
                onClick={copyCode}>
                <i className={`fa-solid fa-${copied ? 'check-double' : 'copy'}`}/>
                {copied ? __('Copied!', 'themeplus') : __('Copy', 'themeplus')}
              </Button>

              {(mode === 'css' || mode === 'javascript' || mode === 'json') && (
                <Button
                  size="small"
                  color="light"
                  onClick={formatCode}>
                  <i className="fa-solid fa-align-left"></i>
                  {__('Format', 'themeplus')}
                </Button>
              )}

              <Button
                size="small"
                color="danger"
                onClick={clearCode}>
                <i className="fa-solid fa-trash-can"></i>
                {__('Clear', 'themeplus')}
              </Button>
            </div>
          </div>

          {/* Code editor wrapper */}
          <div className="tpo-code-editor__wrapper">
            {fallbackEditor}
          </div>
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">
          {help}
        </div>
      )}
    </div>
  );
}

export default CodeEditorField;