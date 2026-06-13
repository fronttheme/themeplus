/**
 * ThemePlus DatePicker Field
 * Uses WordPress native DatePicker/DateTimePicker component
 *
 * File: src/js/admin/components/Fields/DatePickerField.jsx
 */

import {__} from '@wordpress/i18n';
import {DateTimePicker, DatePicker, Dropdown} from '@wordpress/components';
import Button from '../Common/Button';

function DatePickerField({
                           id,
                           label,
                           value = '',
                           onChange,
                           help = '',
                           placeholder = __('Select date...', 'themeplus'),
                           showTime = false, // Toggle time picker
                           is12Hour = true,  // 12/24-hour format
                         }) {

  /**
   * Handle date change
   */
  const handleDateChange = (newDate) => {
    const formatted = showTime ? (newDate || '') : (newDate ? newDate.split('T')[0] : '');
    onChange(formatted);
  };

  /**
   * Format display date
   */
  const getDisplayDate = () => {
    if (!value) return placeholder;

    try {
      const date = new Date(value);
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
      return value;
    }
  };

  /**
   * Clear date
   */
  const clearDate = () => onChange('');

  /**
   * Set today
   */
  const setToday = () => onChange(new Date().toISOString().split('T')[0]);

  return (
    <div className="tpo-field tpo-field--datepicker">
      {label && (
        <div className="tpo-field__header">
          <label className="tpo-field__label">
            {label}
          </label>
        </div>
      )}

      <div className="tpo-field__body">
        <div className="tpo-datepicker tpo-field-card">
          <Dropdown
            className="tpo-datepicker__dropdown"
            contentClassName="tpo-datepicker__popover"
            popoverProps={{placement: 'bottom-start'}}
            renderToggle={({isOpen, onToggle}) => (
              <div className="tpo-datepicker__input-wrapper">
                <button
                  type="button"
                  className="tpo-datepicker__input"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  <span className={value ? '' : 'tpo-datepicker__placeholder'}>
                    {getDisplayDate()}
                  </span>
                  <i className="fa-solid fa-calendar-days"></i>
                </button>
              </div>
            )}
            renderContent={({onClose}) => (
              <div className="tpo-datepicker__content">
                {showTime ? (
                  // Full DateTimePicker with time
                  <DateTimePicker
                    currentDate={value || null}
                    onChange={handleDateChange}
                    is12Hour={is12Hour}
                    __nextRemoveHelpButton
                    __nextRemoveResetButton
                  />
                ) : (
                  // Date only - use DatePicker component
                  <DatePicker
                    currentDate={value || null}
                    onChange={handleDateChange}
                    __nextRemoveHelpButton
                    __nextRemoveResetButton
                  />
                )}

                {/* Info about time picker */}
                {showTime && (
                  <div className="tpo-datepicker__info">
                    <small>
                      {__('Select date and time', 'themeplus')}
                    </small>
                  </div>
                )}

                {/* Close button */}
                <div className="tpo-datepicker__footer">
                  <Button
                    color="green"
                    size="small"
                    onClick={onClose}>
                    {__('Done', 'themeplus')}
                  </Button>
                </div>
              </div>
            )}
          />

          {value && (
            <div className="tpo-datepicker__actions tpo-field-group--button">
              <Button
                size="small"
                color="secondary"
                onClick={setToday}>
                <i className="fa-solid fa-calendar-days"></i>
                {__('Today', 'themeplus')}
              </Button>
              <Button
                size="small"
                color="muted"
                onClick={clearDate}>
                <i className="fa-solid fa-xmark"></i>
                {__('Clear', 'themeplus')}
              </Button>
            </div>
          )}
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

export default DatePickerField;