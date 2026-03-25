/**
 * ThemePlus Sidebar Component
 *
 * File: src/js/admin/components/Layout/Sidebar.jsx
 */

import {__} from '@wordpress/i18n';
import {useEffect, useRef, useState} from '@wordpress/element';
import useScrollbar from '../../hooks/useScrollbar';
import Button from "../Common/Button";
import SidebarSkeleton from './SidebarSkeleton';

function Sidebar({
                   sections = [],
                   activeTab,
                   onTabChange,
                   searchQuery = '',
                   onSearchChange,
                   isLoaded = false
                 }) {
  const [mainWalkerStyle, setMainWalkerStyle] = useState({});
  const subWalkerRefs = useRef({});

  // Scrollbar hooks for both scrollable areas
  const {scrollRef: sidebarRef, scrollbarClass: sidebarScrollClass} = useScrollbar({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: true,
  });

  const {scrollRef: navRef, scrollbarClass: navScrollClass} = useScrollbar({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: true,
  });

  // Update MAIN walker
  useEffect(() => {
    const updateMainWalker = () => {
      if (!navRef.current) return;

      const activeMainLink = navRef.current.querySelector('.tpo-sidebar__link--active');

      if (activeMainLink && !activeTab.includes('__')) {
        const listElement = navRef.current.querySelector('.tpo-sidebar__list');
        if (!listElement) return;

        const listRect = listElement.getBoundingClientRect();
        const linkRect = activeMainLink.getBoundingClientRect();

        setMainWalkerStyle({
          top: linkRect.top - listRect.top,
          height: linkRect.height,
          opacity: 1,
        });
      } else {
        setMainWalkerStyle({opacity: 0});
      }
    };

    const timer = setTimeout(updateMainWalker, 50);
    return () => clearTimeout(timer);
  }, [activeTab, sections, navRef]);

  // Get sub-walker style for a specific section
  const getSubWalkerStyle = (sectionId) => {
    if (!activeTab.startsWith(sectionId + '__')) {
      return {opacity: 0};
    }

    const sublistRef = subWalkerRefs.current[sectionId];
    if (!sublistRef) return {opacity: 0};

    const activeSublink = sublistRef.querySelector('.tpo-sidebar__sublink--active');
    if (!activeSublink) return {opacity: 0};

    const sublistRect = sublistRef.getBoundingClientRect();
    const sublinkRect = activeSublink.getBoundingClientRect();

    return {
      top: sublinkRect.top - sublistRect.top,
      height: sublinkRect.height,
      opacity: 1,
    };
  };

  // Force re-render when activeTab changes
  const [, forceUpdate] = useState({});
  useEffect(() => {
    setTimeout(() => forceUpdate({}), 50);
  }, [activeTab]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.tpo-sidebar__search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Escape to clear search
      if (e.key === 'Escape' && searchQuery) {
        handleClearSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClearSearch = () => {
    onSearchChange('');
  };

  // Clear search when tab is clicked
  const handleTabClick = (sectionId) => {
    if (searchQuery) {
      onSearchChange('');
    }

    // If section has subsections, activate first subsection automatically
    const section = sections.find(s => s.id === sectionId);
    if (section?.subsections?.length > 0) {
      onTabChange(`${sectionId}__${section.subsections[0].id}`);
    } else {
      onTabChange(sectionId);
    }
  };

  // Clear search when sub-tab is clicked
  const handleSubTabClick = (parentId, subSectionId) => {
    if (searchQuery) {
      onSearchChange('');
    }
    onTabChange(`${parentId}__${subSectionId}`);
  };

  const isTabActive = (sectionId) => {
    return activeTab === sectionId || activeTab.startsWith(`${sectionId}__`);
  };

  // Get OS-specific icon for search shortcut
  function getOSIcon() {
    const userAgent = window.navigator.userAgent;

    if (userAgent.includes('Mac')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1495.18 700">
          <path d="M590.4,0H109.6C49.07,0,0,49.07,0,109.6v480.81c0,60.53,49.07,109.6,109.6,109.6h480.81c60.53,0,109.6-49.07,109.6-109.6V109.6c0-60.53-49.07-109.6-109.6-109.6ZM109.6,650c-32.86,0-59.6-26.73-59.6-59.6V109.6c0-32.86,26.73-59.6,59.6-59.6h480.81c32.86,0,59.6,26.73,59.6,59.6v480.81c0,32.86-26.73,59.6-59.6,59.6H109.6Z"/>
          <path d="M475,387.5h-37.5v-75h37.5c48.36,0,87.5-39.14,87.5-87.5s-39.14-87.5-87.5-87.5-87.5,39.14-87.5,87.5v37.5h-75v-37.5c0-48.36-39.14-87.5-87.5-87.5s-87.5,39.14-87.5,87.5,39.14,87.5,87.5,87.5h37.5v75h-37.5c-48.36,0-87.5,39.14-87.5,87.5s39.14,87.5,87.5,87.5,87.5-39.14,87.5-87.5v-37.5h75v37.5c0,48.36,39.14,87.5,87.5,87.5s87.5-39.14,87.5-87.5-39.14-87.5-87.5-87.5ZM437.5,225c0-20.7,16.8-37.5,37.5-37.5s37.5,16.8,37.5,37.5-16.8,37.5-37.5,37.5h-37.5v-37.5ZM262.5,475c0,20.7-16.8,37.5-37.5,37.5s-37.5-16.8-37.5-37.5,16.8-37.5,37.5-37.5h37.5v37.5ZM262.5,262.5h-37.5c-20.7,0-37.5-16.8-37.5-37.5s16.8-37.5,37.5-37.5,37.5,16.8,37.5,37.5v37.5ZM387.5,387.5h-75v-75h75v75ZM475,512.5c-20.7,0-37.5-16.8-37.5-37.5v-37.5h37.5c20.7,0,37.5,16.8,37.5,37.5s-16.8,37.5-37.5,37.5Z"/>
          <path d="M1385.58,0h-480.81c-60.53,0-109.6,49.07-109.6,109.6v480.81c0,60.53,49.07,109.6,109.6,109.6h480.81c60.53,0,109.6-49.07,109.6-109.6V109.6c0-60.53-49.07-109.6-109.6-109.6ZM904.77,650c-32.86,0-59.6-26.73-59.6-59.6V109.6c0-32.86,26.73-59.6,59.6-59.6h480.81c32.86,0,59.6,26.73,59.6,59.6v480.81c0,32.86-26.73,59.6-59.6,59.6h-480.81Z"/>
          <polygon points="1074.2 350 1293.19 562.5 1221.4 562.5 1047.16 393.44 1047.16 562.5 997.16 562.5 997.16 137.5 1047.16 137.5 1047.16 306.56 1221.4 137.5 1293.2 137.5 1074.2 350"/>
        </svg>
      );
    } else if (userAgent.includes('Win')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 882.78 382.32">
          <path d="M377.75,0H40C17.91,0,0,17.91,0,40v302.32c0,22.09,17.91,40,40,40h337.75c22.09,0,40-17.91,40-40V40c0-22.09-17.91-40-40-40ZM397.75,289.86c0,11.05-8.95,20-20,20H40c-11.05,0-20-8.95-20-20V40c0-11.05,8.95-20,20-20h337.75c11.05,0,20,8.95,20,20v249.86ZM89.52,141.89c-3.36,7.21-5.05,16.01-5.05,26.4s1.68,19.32,5.05,26.52c3.36,7.21,7.97,12.65,13.82,16.34,5.85,3.69,12.43,5.53,19.75,5.53,4.05,0,7.91-.55,11.57-1.67,3.66-1.11,6.97-2.75,9.94-4.93,2.97-2.18,5.48-4.85,7.55-8.01,2.07-3.16,3.5-6.8,4.29-10.9l19.56.06c-1.05,6.33-3.06,12.14-6.05,17.44-2.99,5.3-6.81,9.87-11.47,13.7s-9.98,6.8-15.95,8.89c-5.98,2.09-12.5,3.14-19.56,3.14-11.12,0-21.02-2.65-29.71-7.95-8.69-5.3-15.54-12.89-20.53-22.78-4.99-9.89-7.49-21.68-7.49-35.38s2.51-25.55,7.52-35.42c5.02-9.87,11.87-17.45,20.56-22.75,8.69-5.3,18.58-7.95,29.65-7.95,6.81,0,13.17.97,19.09,2.92,5.91,1.95,11.23,4.8,15.95,8.55,4.72,3.75,8.63,8.32,11.72,13.7,3.09,5.38,5.18,11.53,6.27,18.45h-19.56c-.75-4.19-2.15-7.88-4.2-11.06-2.05-3.18-4.56-5.89-7.52-8.11-2.97-2.22-6.28-3.9-9.94-5.03s-7.53-1.7-11.63-1.7c-7.4,0-14.01,1.86-19.84,5.59-5.83,3.73-10.43,9.2-13.79,16.4ZM241.01,216.36l3.38,15.52c-1.09.42-2.63.85-4.64,1.29s-4.51.68-7.52.72c-4.93.08-9.53-.8-13.79-2.64-4.26-1.84-7.71-4.69-10.34-8.55-2.63-3.85-3.95-8.69-3.95-14.52v-57h-14.11v-15.08h14.11v-23.13h18.74v23.13h19.75v15.08h-19.75v53.11c0,3.65.54,6.38,1.63,8.2,1.09,1.82,2.5,3.06,4.23,3.71,1.73.65,3.62.97,5.67.97,1.5,0,2.82-.1,3.95-.31,1.13-.21,2.01-.38,2.63-.5ZM311.06,134.78c1.61.08,2.87.19,3.79.31v17.98c-.75-.21-2.09-.45-4.01-.72-1.92-.27-3.85-.41-5.77-.41-4.43,0-8.37.93-11.82,2.8-3.45,1.86-6.17,4.44-8.18,7.73-2.01,3.29-3.01,7.03-3.01,11.22v58.95h-18.74v-96.54h18.12v15.33h1c1.75-5.19,4.86-9.29,9.31-12.29,4.45-3,9.5-4.49,15.14-4.49,1.17,0,2.56.04,4.17.13ZM331.15,103.92h18.74v128.72h-18.74V103.92ZM842.78,0h-337.75c-22.09,0-40,17.91-40,40v302.32c0,22.09,17.91,40,40,40h337.75c22.09,0,40-17.91,40-40V40c0-22.09-17.91-40-40-40ZM862.78,289.86c0,11.05-8.95,20-20,20h-337.75c-11.05,0-20-8.95-20-20V40c0-11.05,8.95-20,20-20h337.75c11.05,0,20,8.95,20,20v249.86ZM676.76,161.87l51.97,70.77h-23.32l-41.5-57.51-15.17,17.47v40.04h-19.37V103.92h19.37v61.47h1.57l53.85-61.47h24.39l-51.78,57.95Z"/>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 966.4 966.4">
          <path d="M954.53,897.26l-163.97-163.96c28.24-33.81,51.19-71.4,68.44-112.18,23.32-55.14,35.15-113.7,35.15-174.04s-11.83-118.89-35.15-174.04c-22.52-53.24-54.75-101.05-95.8-142.1-41.05-41.05-88.86-73.28-142.1-95.8C565.97,11.83,507.42,0,447.08,0s-118.89,11.83-174.04,35.15c-53.24,22.52-101.05,54.75-142.1,95.8s-73.28,88.85-95.8,142.1C11.83,328.19,0,386.74,0,447.08s11.83,118.89,35.15,174.04c22.52,53.24,54.75,101.05,95.8,142.1,41.05,41.05,88.85,73.28,142.1,95.8,55.14,23.32,113.7,35.15,174.04,35.15s118.89-11.83,174.04-35.15c40.78-17.25,78.37-40.2,112.18-68.44l163.97,163.96c7.91,7.91,18.27,11.86,28.64,11.86s20.73-3.95,28.64-11.86c15.82-15.82,15.82-41.46,0-57.28ZM447.08,813.16c-97.78,0-189.71-38.08-258.86-107.22-69.14-69.14-107.22-161.07-107.22-258.86s38.08-189.71,107.22-258.86c69.14-69.14,161.07-107.22,258.86-107.22s189.71,38.08,258.86,107.22c69.14,69.14,107.22,161.07,107.22,258.86s-38.08,189.71-107.22,258.86c-69.14,69.14-161.07,107.22-258.86,107.22Z"/>
        </svg>
      );
    }
  }

  if (!isLoaded) {
    return (
      <aside ref={sidebarRef} className={`tpo-sidebar ${sidebarScrollClass}`}>
        <SidebarSkeleton/>
      </aside>
    );
  }

  return (
    <aside ref={sidebarRef} className={`tpo-sidebar ${sidebarScrollClass}`}>
      {/* Header */}
      <div className="tpo-sidebar__header">
        <div className="tpo-sidebar__brand">
          <div className="tpo-sidebar__logo">
            <img
              src={`${themePlusData.imagesUrl}themeplus.svg`}
              alt={__('ThemePlus Logo', 'themeplus')}
              className="tpo-sidebar__logo-image"
            />
          </div>
          <div className="tpo-sidebar__info">
            <h1 className="tpo-sidebar__title">
              {__('ThemePlus', 'themeplus')}
            </h1>
            <span className="tpo-sidebar__version">
              {window.themePlusData?.version || '1.0.0'}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="tpo-sidebar__search">
        <input
          type="text"
          className="tpo-sidebar__search-input"
          placeholder={`${__('Search fields...', 'themeplus')}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {searchQuery && (
          <Button
            size="small"
            onClick={handleClearSearch}
            iconOnly={true}
            ariaLabel={__('Clear search', 'themeplus')}>
            <i className="fa-solid fa-xmark"></i>
          </Button>
        )}

        {!searchQuery && (
          <div className="tpo-search-key-short-icon">
            {getOSIcon()}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav ref={navRef} className={`tpo-sidebar__nav ${navScrollClass}`}>
        <ul className="tpo-sidebar__list">
          {/* Main Walker */}
          <div
            className="tpo-sidebar__main-walker"
            style={{
              transform: `translateY(${mainWalkerStyle.top || 0}px)`,
              height: `${mainWalkerStyle.height || 0}px`,
              opacity: mainWalkerStyle.opacity || 0,
            }}
          />

          {sections.map((section) => {
            const hasSubsections = section.subsections && section.subsections.length > 0;
            const subWalkerStyle = getSubWalkerStyle(section.id);
            const isExpanded = hasSubsections && isTabActive(section.id);

            const itemClasses = [
              'tpo-sidebar__item',
              hasSubsections && 'tpo-sidebar__item--has-children',
              isExpanded && 'tpo-sidebar__item--expanded',
            ].filter(Boolean).join(' ');

            return (
              <li key={section.id} className={itemClasses}>
                {/* Main Link */}
                <button
                  className={`tpo-sidebar__link ${
                    isTabActive(section.id) ? 'tpo-sidebar__link--active' : ''
                  }`}
                  onClick={() => handleTabClick(section.id)}
                  type="button"
                >
                  <span className="tpo-sidebar__link-icon">
                    <i className={`fas fa-${section.icon}`}/>
                  </span>
                  <span className="tpo-sidebar__link-text">{section.title}</span>
                  {hasSubsections && (
                    <span className="tpo-sidebar__link-arrow">
                      <i className="fa-solid fa-chevron-right"></i>
                    </span>
                  )}
                </button>

                {/* Subsections */}
                {hasSubsections && isTabActive(section.id) && (
                  <ul
                    className="tpo-sidebar__sublist"
                    ref={(el) => {
                      if (el) {
                        subWalkerRefs.current[section.id] = el;
                      }
                    }}
                  >
                    {/* Sub Walker */}
                    <div
                      className="tpo-sidebar__sub-walker"
                      style={{
                        transform: `translateY(${subWalkerStyle.top || 0}px)`,
                        height: `${subWalkerStyle.height || 0}px`,
                        opacity: subWalkerStyle.opacity || 0,
                      }}
                    />

                    {section.subsections.map((subSection) => (
                      <li key={subSection.id} className="tpo-sidebar__subitem">
                        <button
                          className={`tpo-sidebar__sublink ${
                            activeTab === `${section.id}__${subSection.id}`
                              ? 'tpo-sidebar__sublink--active'
                              : ''
                          }`}
                          onClick={() => handleSubTabClick(section.id, subSection.id)}
                          type="button"
                        >
                          {/* Subsection Icon */}
                          {subSection.icon && (
                            <span className="tpo-sidebar__sublink-icon">
                              <i className={`fas fa-${subSection.icon}`}/>
                            </span>
                          )}

                          {/* Subsection Title */}
                          <span className="tpo-sidebar__sublink-text">
                            {subSection.title}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;