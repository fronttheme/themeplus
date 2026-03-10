/**
 * ThemePlus TextField Component
 *
 * File: src/js/admin/components/Fields/TextField.jsx
 */

import TextInput from '../Common/TextInput';

function TextField({
                     id,
                     label,
                     value = '',
                     onChange,
                     placeholder = '',
                     help = '',
                     required = false,
                   }) {
  return (
    <div className="tpo-field tpo-field--text">
      <TextInput
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        help={help}
        required={required}
        fullWidth={true}
      />
    </div>
  );
}

export default TextField;