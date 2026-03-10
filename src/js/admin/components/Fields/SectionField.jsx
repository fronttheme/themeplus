/**
 * ThemePlus Section Field - Visual section divider/heading
 *
 * File: src/js/admin/components/Fields/SectionField.jsx
 */

function SectionField({
                        title,
                        desc,
                        content,
                      }) {
  return (
    <div className="tpo-field tpo-field--section tpo-section">
      {title && (
        <h3 className="tpo-section__title">
          {title}
        </h3>
      )}
      {(desc || content) && (
        <div className="tpo-section__desc">
          {desc || content}
        </div>
      )}
    </div>
  );
}

export default SectionField;