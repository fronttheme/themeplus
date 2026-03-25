/**
 * ThemePlus Sidebar Skeleton
 * File: src/js/admin/components/Layout/SidebarSkeleton.jsx
 */

function SidebarSkeleton() {
  return (
    <div className="tpo-sidebar__skeleton">
      <div className="tpo-skeleton__brand">
        <div className="tpo-skeleton__logo"/>
        <div className="tpo-skeleton__brand-info">
          <div className="tpo-skeleton__brand-name"/>
          <div className="tpo-skeleton__brand-version"/>
        </div>
      </div>
      <div className="tpo-skeleton__search"/>
      <div className="tpo-skeleton__nav">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="tpo-skeleton__nav-item"
               style={{width: `${75 - i * 5}%`}}
          />
        ))}
      </div>
    </div>
  );
}

export default SidebarSkeleton;