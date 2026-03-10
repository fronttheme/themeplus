/**
 * ThemePlus Typography Component
 *
 * File: src/js/admin/components/Fields/Typography.jsx
 */

import {__} from '@wordpress/i18n';
import {useState, useEffect} from '@wordpress/element';
import GoogleFontsService from '../../services/GoogleFontsService';
import CustomFontsService from '../../services/CustomFontsService';
import Select from '../Common/Select';
import Spinner from '../Common/Spinner';
import ButtonSet from '../Common/ButtonSet';

function Typography({
                      id,
                      label,
                      value = {},
                      onChange,
                      help = '',
                      // Control toggles - ALL DEFAULT FALSE except font-family
                      'font-family': fontFamily = true, // Always shown
                      'font-size': fontSize = false,
                      'font-weight': fontWeight = false,
                      'font-style': fontStyle = false,
                      'line-height': lineHeight = false,
                      'letter-spacing': letterSpacing = false,
                      'text-transform': textTransform = false,
                      subsets = true, // Default true
                      units = 'px', // Default unit
                    }) {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [customFonts, setCustomFonts] = useState([]);
  const [loadingFonts, setLoadingFonts] = useState(true);
  const [activeFontTab, setActiveFontTab] = useState('google');

  // Get unit for property
  const getUnit = (property) => {
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
  const standardFonts = [
    'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
    'Georgia', 'Helvetica', 'Impact', 'Lucida Console',
    'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana',
  ];

  // Font style options
  const fontStyleOptions = {
    normal: __('Normal', 'themeplus'),
    italic: __('Italic', 'themeplus'),
  };

  // Font weights
  const fontWeights = [
    {value: '100', label: '100 - Thin'},
    {value: '200', label: '200 - Extra Light'},
    {value: '300', label: '300 - Light'},
    {value: '400', label: '400 - Regular'},
    {value: '500', label: '500 - Medium'},
    {value: '600', label: '600 - Semi Bold'},
    {value: '700', label: '700 - Bold'},
    {value: '800', label: '800 - Extra Bold'},
    {value: '900', label: '900 - Black'},
  ];

  // Text transform options
  const textTransformOptions = [
    {value: 'none', label: __('None', 'themeplus')},
    {value: 'uppercase', label: __('Uppercase', 'themeplus')},
    {value: 'lowercase', label: __('Lowercase', 'themeplus')},
    {value: 'capitalize', label: __('Capitalize', 'themeplus')},
  ];

  // Subsets options
  const subsetsOptions = [
    {value: 'latin', label: __('Latin', 'themeplus')},
    {value: 'latin-ext', label: __('Latin Extended', 'themeplus')},
    {value: 'cyrillic', label: __('Cyrillic', 'themeplus')},
    {value: 'cyrillic-ext', label: __('Cyrillic Extended', 'themeplus')},
    {value: 'greek', label: __('Greek', 'themeplus')},
    {value: 'greek-ext', label: __('Greek Extended', 'themeplus')},
    {value: 'vietnamese', label: __('Vietnamese', 'themeplus')},
    {value: 'arabic', label: __('Arabic', 'themeplus')},
    {value: 'hebrew', label: __('Hebrew', 'themeplus')},
    {value: 'thai', label: __('Thai', 'themeplus')},
    {value: 'devanagari', label: __('Devanagari', 'themeplus')},
  ];

  // Load Google Fonts
  useEffect(() => {
    loadGoogleFonts();
  }, []);

  // Load Custom Fonts
  useEffect(() => {
    loadCustomFonts();
  }, []);

  // Load font preview when changed
  useEffect(() => {
    if (fontFamilyValue && !standardFonts.includes(fontFamilyValue)) {
      GoogleFontsService.loadFontPreview(fontFamilyValue, subsetsValue);
    }
  }, [fontFamilyValue, subsetsValue]);

  const loadGoogleFonts = async () => {
    try {
      setLoadingFonts(true);
      const fonts = await GoogleFontsService.getFonts();
      setGoogleFonts(fonts);
    } catch (error) {
      console.error('Error loading Google Fonts:', error);
    } finally {
      setLoadingFonts(false);
    }
  };

  const loadCustomFonts = async () => {
    try {
      const allFonts = await CustomFontsService.getFonts();
      const validatedFonts = await Promise.all(
        allFonts.map(async (font) => {
          const regularFileId = font.files?.regular?.id || font.files?.regular;
          if (!regularFileId) return null;
          try {
            await wp.media.attachment(regularFileId).fetch();
            return font.name;
          } catch (error) {
            return null;
          }
        })
      );
      setCustomFonts(validatedFonts.filter(name => name !== null));
    } catch (error) {
      console.error('Error loading custom fonts:', error);
    }
  };

  const handleChange = (key, newValue) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };

  const handleFontSelect = (font) => {
    handleChange('font-family', font);
    if (!standardFonts.includes(font)) {
      GoogleFontsService.loadFontPreview(font, subsetsValue);
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
    return fonts.map(font => ({value: font, label: font}));
  };

  return (
    <div className="tpo-field tpo-field--typography">
      <div className="tpo-field__header">
        <label className="tpo-field__label">{label}</label>
      </div>

      <div className="tpo-field__body">
        <div className="tpo-typography tpo-field-card">
          {/* Font Family - Always shown */}
          {fontFamily && (
            <div className="tpo-typography__row">
              <label className="tpo-typography__label">
                {__('Font Family', 'themeplus')}
              </label>
              <div className="tpo-typography__control">
                {/* Font Tabs */}
                <div className="tpo-typography__font-tabs">
                  <button
                    type="button"
                    className={`tpo-typography__font-tab ${activeFontTab === 'google' ? 'active' : ''}`}
                    onClick={() => setActiveFontTab('google')}
                  >
                    {__('Google Fonts', 'themeplus')}
                    <span className="tpo-typography__font-count">{googleFonts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`tpo-typography__font-tab ${activeFontTab === 'standard' ? 'active' : ''}`}
                    onClick={() => setActiveFontTab('standard')}
                  >
                    {__('Standard', 'themeplus')}
                    <span className="tpo-typography__font-count">{standardFonts.length}</span>
                  </button>
                  <button
                    type="button"
                    className={`tpo-typography__font-tab ${activeFontTab === 'custom' ? 'active' : ''}`}
                    onClick={() => setActiveFontTab('custom')}
                  >
                    {__('Custom', 'themeplus')}
                    <span className="tpo-typography__font-count">{customFonts.length}</span>
                  </button>
                </div>

                {/* Font Select */}
                {loadingFonts && activeFontTab === 'google' ? (
                  <div className="tpo-typography__loading">
                    {__('Loading fonts...', 'themeplus')}
                  </div>
                ) : (
                  <Select
                    value={fontFamilyValue}
                    onChange={handleFontSelect}
                    options={getFontOptions()}
                    searchable={getFontOptions().length > 10}
                    placeholder={__('Select font...', 'themeplus')}
                    className="tpo-typography__font-select"
                  />
                )}
              </div>
            </div>
          )}

          {/* Subsets - Show only for Google Fonts */}
          {subsets && activeFontTab === 'google' && (
            <div className="tpo-typography__row">
              <label className="tpo-typography__label">
                {__('Character Sets', 'themeplus')}
              </label>
              <Select
                value={subsetsValue}
                onChange={(val) => {
                  handleChange('subsets', val);
                  if (fontFamilyValue && !standardFonts.includes(fontFamilyValue)) {
                    GoogleFontsService.loadFontPreview(fontFamilyValue, val);
                  }
                }}
                options={subsetsOptions}
                multiple={true}
                placeholder={__('Select character sets...', 'themeplus')}
                className="tpo-typography__subsets-select"
              />
            </div>
          )}

          {/* Shared Options - 2 Column Grid */}
          {(fontSize || lineHeight || fontWeight || fontStyle || textTransform || letterSpacing) && (
            <div className="tpo-typography__options">
              {/* Font Size */}
              {fontSize && (
                <div className="tpo-typography__option">
                  <label className="tpo-typography__label">
                    {__('Font Size', 'themeplus')}
                  </label>
                  <Spinner
                    value={fontSizeValue}
                    onChange={(val) => handleChange('font-size', val)}
                    min={8}
                    max={200}
                    step={1}
                    unit={getUnit('font-size')}
                    placeholder="16"
                  />
                </div>
              )}

              {/* Line Height */}
              {lineHeight && (
                <div className="tpo-typography__option">
                  <label className="tpo-typography__label">
                    {__('Line Height', 'themeplus')}
                  </label>
                  <Spinner
                    value={lineHeightValue}
                    onChange={(val) => handleChange('line-height', val)}
                    min={0.5}
                    max={5}
                    step={0.1}
                    placeholder="1.5"
                  />
                </div>
              )}

              {/* Font Weight */}
              {fontWeight && (
                <div className="tpo-typography__option">
                  <label className="tpo-typography__label">
                    {__('Font Weight', 'themeplus')}
                  </label>
                  <Select
                    value={fontWeightValue}
                    onChange={(val) => handleChange('font-weight', val)}
                    options={fontWeights}
                    className="tpo-typography__select"
                  />
                </div>
              )}

              {/* Font Style */}
              {fontStyle && (
                <div className="tpo-typography__option">
                  <ButtonSet
                    label={__('Font Style', 'themeplus')}
                    value={value['font-style'] || 'normal'}
                    onChange={(val) => handleChange('font-style', val)}
                    options={fontStyleOptions}
                  />
                </div>
              )}

              {/* Text Transform */}
              {textTransform && (
                <div className="tpo-typography__option">
                  <label className="tpo-typography__label">
                    {__('Text Transform', 'themeplus')}
                  </label>
                  <Select
                    value={textTransformValue}
                    onChange={(val) => handleChange('text-transform', val)}
                    options={textTransformOptions}
                    className="tpo-typography__select"
                  />
                </div>
              )}

              {/* Letter Spacing */}
              {letterSpacing && (
                <div className="tpo-typography__option">
                  <label className="tpo-typography__label">
                    {__('Letter Spacing', 'themeplus')}
                  </label>
                  <Spinner
                    value={letterSpacingValue}
                    onChange={(val) => handleChange('letter-spacing', val)}
                    min={-5}
                    max={20}
                    step={0.1}
                    unit="px"
                    placeholder="0"
                  />
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          <div className="tpo-typography__preview">
            <div className="tpo-typography__preview-label">
              {__('Preview', 'themeplus')}
            </div>
            <div
              className="tpo-typography__preview-text"
              style={{
                fontFamily: fontFamilyValue,
                fontSize: fontSize ? `${fontSizeValue}${getUnit('font-size')}` : undefined,
                fontWeight: fontWeight ? fontWeightValue : undefined,
                lineHeight: lineHeight ? lineHeightValue : undefined,
                letterSpacing: letterSpacing ? `${letterSpacingValue}${getUnit('letter-spacing')}` : undefined,
                textTransform: textTransform ? textTransformValue : undefined,
                fontStyle: fontStyle ? fontStyleValue : undefined,
              }}
            >
              {__('The quick brown fox jumps over the lazy dog', 'themeplus')}
            </div>
          </div>
        </div>
      </div>

      {help && (
        <div className="tpo-field__help">{help}</div>
      )}
    </div>
  );
}

export default Typography;