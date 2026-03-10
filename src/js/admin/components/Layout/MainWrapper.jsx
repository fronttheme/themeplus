/**
 * ThemePlus Main Wrapper Component
 *
 * File: src/js/admin/components/Layout/MainWrapper.jsx
 */

/**
 * Main Wrapper Component
 *
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components
 */
function MainWrapper({children}) {
  return (
    <div className="tpo-main-wrapper">
      <div className="tpo-container">
        {children}
      </div>
    </div>
  );
}

export default MainWrapper;