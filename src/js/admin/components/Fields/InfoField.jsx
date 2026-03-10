/**
 * ThemePlus Info Field - Informational notice boxes
 *
 * File: src/js/admin/components/Fields/InfoField.jsx
 */

import Notice from '../Common/Notice';

function InfoField({
                     title,
                     desc,
                     content,
                     style = 'info',
                   }) {
  return (
    <div className="tpo-field tpo-field--info">
      <Notice status={style} title={title}>
        {desc || content}
      </Notice>
    </div>
  );
}

export default InfoField;