/**
 * ThemePlus DatePicker Field
 * Uses WordPress native DatePicker/DateTimePicker component
 *
 * File: src/js/admin/components/Fields/DatePickerField.jsx
 */

import {__} from '@wordpress/i18n';
import {useState} from '@wordpress/element';
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
                           is12Hour = true,  // 12/24 hour format
                         }) {
  const [selectedDate, setSelectedDate] = useState(value);

  /**
   * Handle date change
   */
  const handleDateChange = (newDate) => {
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
            position="bottom left"
            renderToggle={({isOpen, onToggle}) => (
              <div className="tpo-datepicker__input-wrapper">
                <button
                  type="button"
                  className="tpo-datepicker__input"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                >
                  <span className={selectedDate ? '' : 'tpo-datepicker__placeholder'}>
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
                    currentDate={selectedDate || null}
                    onChange={handleDateChange}
                    is12Hour={is12Hour}
                    __nextRemoveHelpButton
                    __nextRemoveResetButton
                  />
                ) : (
                  // Date only - use DatePicker component
                  <DatePicker
                    currentDate={selectedDate || null}
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

          {selectedDate && (
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