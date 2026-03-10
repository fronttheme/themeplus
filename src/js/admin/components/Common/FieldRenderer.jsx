/**
 * ThemePlus Field Renderer
 *
 * File: src/js/admin/components/Common/FieldRenderer.jsx
 */

import {
  TextField,
  TextareaField,
  NumberField,
  SelectField,
  ButtonSet,
  RadioField,
  CheckboxField,
  SliderField,
  ToggleField,
  ColorPicker,
  Typography,
  ImageField,
  IconField,
  Dimensions,
  InfoField,
  SectionField,
  ShortcodeField,
  RawField,
  SelectImageField,
  DatePickerField,
  SocialMediaField,
  GradientPickerField,
  CodeEditorField,
  RepeaterField,
  BackgroundField,
  BorderField,
  SpacingField,
  LinkField,
  GalleryField,
  GroupField,
} from '../Fields';

function FieldRenderer({field, value, onUpdate, showModal}) {
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
  const searchTerms = [
    title || '',
    subtitle || '',
    desc || '',
    id || '',
  ].filter(Boolean).join(' ').toLowerCase();

  // Common wrapper attributes
  const wrapperProps = {
    className: 'tpo-field-wrapper',
    'data-search-terms': searchTerms,
    'data-field-id': id,
    'data-field-title': title,
  };

  // Handle display-only fields (no value/onChange)
  if (type === 'info') {
    return (
      <div {...wrapperProps}>
        <InfoField
          title={title}
          desc={helpText}
          content={content}
          {...fieldProps}
        />
      </div>
    );
  }

  if (type === 'section') {
    return (
      <div {...wrapperProps}>
        <SectionField
          title={title}
          desc={helpText}
          content={content}
          {...fieldProps}
        />
      </div>
    );
  }

  if (type === 'raw') {
    return (
      <div {...wrapperProps}>
        <RawField
          id={id}
          title={title}
          desc={helpText}
          content={content}
          {...fieldProps}
        />
      </div>
    );
  }

  // Regular fields with value/onChange
  const props = {
    id,
    label: title,
    value: currentValue,
    onChange: onUpdate,
    help: helpText,
    showModal,
    ...fieldProps,
  };

  if (type === 'code_editor') {
    return (
      <div {...wrapperProps}>
        <CodeEditorField {...props} />
      </div>
    );
  }

  // Field type mapping (30 fields type)
  const fields = {
    // Text Fields
    text: TextField,
    textarea: TextareaField,

    // Number Fields
    number: NumberField,
    spinner: NumberField,
    slider: SliderField,

    // Choice Fields
    select: SelectField,
    button_set: ButtonSet,
    radio: RadioField,
    checkbox: CheckboxField,
    select_image: SelectImageField,

    // Toggle Fields
    toggle: ToggleField,
    switch: ToggleField,

    // Color Fields
    color: ColorPicker,
    gradient_picker: GradientPickerField,

    // Media Fields
    image: ImageField,
    icon: IconField,

    // Layout Fields
    dimensions: Dimensions,
    typography: Typography,

    // Special Fields
    info: InfoField,
    section: SectionField,
    shortcode: ShortcodeField,
    raw: RawField,

    // Date Fields
    date_picker: DatePickerField,

    // Social Fields
    social_media: SocialMediaField,

    // Code Fields
    code_editor: CodeEditorField,

    // Advanced Fields
    repeater: RepeaterField,

    // Enhancement Fields
    background: BackgroundField,
    border: BorderField,
    spacing: SpacingField,
    link: LinkField,
    gallery: GalleryField,
    group: GroupField,
  };

  const FieldComponent = fields[type];

  // Unknown field type
  if (!FieldComponent) {
    return (
      <div {...wrapperProps}>
        <div className="tpo-field tpo-field--unknown">
          <p>Unknown field type: {type}</p>
        </div>
      </div>
    );
  }

  return (
    <div {...wrapperProps}>
      <FieldComponent {...props} />
    </div>
  );
}

export default FieldRenderer;