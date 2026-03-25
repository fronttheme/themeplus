/**
 * ThemePlus Body Skeleton
 * File: src/js/admin/components/Layout/BodySkeleton.jsx
 */

function BodySkeleton() {
  return (
    <div className="tpo-body__skeleton">
      <div className="tpo-skeleton__header">
        <div className="tpo-skeleton__title"/>
        <div className="tpo-skeleton__excerpt"/>
      </div>
      <div className="tpo-skeleton__fields">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="tpo-skeleton__field">
            <div className="tpo-skeleton__field-label"/>
            <div className="tpo-skeleton__field-input"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BodySkeleton;