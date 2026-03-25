/**
 * ThemePlus Body Component
 *
 * File: src/js/admin/components/Layout/Body.jsx
 */

import {__} from '@wordpress/i18n';
import {useSettings} from '../../context/SettingsContext';
import FieldRenderer from '../Common/FieldRenderer';
import SearchResults from '../Common/SearchResults';
import ImportExport from '../Sections/ImportExport';
import CustomFontUploader from '../Sections/CustomFontUploader';
import DevPanel from '../DevPanel/DevPanel';
import {shouldShowField} from '../../utils/fieldHelpers';
import useScrollbar from '../../hooks/useScrollbar';
import BodySkeleton from './BodySkeleton';

function Body({sections = [], activeTab, showModal, searchQuery = '', onClearSearch}) {
  const {options, setOptions, isLoaded} = useSettings();

  // Scrollbar hook
  const {scrollRef, scrollbarClass} = useScrollbar({
    hideDelay: 2000,
    showOnHover: true,
    isOpen: true, // Body is always visible
  });

  const getActiveContent = () => {
    if (searchQuery && searchQuery.length >= 2) return null;

    // Custom Fonts Section
    if (activeTab === 'custom-fonts') {
      return {title: __('Custom Fonts', 'themeplus'), isCustomFonts: true};
    }

    // Import/Export Section
    if (activeTab === 'import-export') {
      return {title: __('Import/Export Settings', 'themeplus'), isImportExport: true};
    }

    // Dev Panel Section
    if (activeTab === 'developer-panel') {
      return {title: __('Developer Panel', 'themeplus'), isDevPanel: true};
    }

    // Subsection handling
    if (activeTab.includes('__')) {
      const [sectionId, subsectionId] = activeTab.split('__');
      const section = sections.find(s => s.id === sectionId);
      if (!section) return null;
      const subsection = section.subsections?.find(sub => sub.id === subsectionId);
      // Subsection
      if (subsection) return {
        title: subsection.title,
        fields: subsection.fields || [],
        excerpt: subsection.excerpt || '',
      };
    }

    // Regular section
    const section = sections.find(s => s.id === activeTab);
    // Regular section
    if (section) return {
      title: section.title,
      fields: section.fields || [],
      excerpt: section.excerpt || '',
    };

    return null;
  };

  // Build defaults map from all fields across sections
  const defaults = {};
  sections.forEach(section => {
    const allFields = [
      ...(section.fields || []),
      ...(section.subsections || []).flatMap(sub => sub.fields || []),
    ];
    allFields.forEach(f => {
      if (f.default !== undefined) defaults[f.id] = f.default;
    });
  });

  // Search Results
  if (searchQuery && searchQuery.length >= 2) {
    return (
      <main ref={scrollRef} className={`tpo-body ${scrollbarClass}`}>
        <div className="tpo-body__content">
          <SearchResults
            searchQuery={searchQuery}
            sections={sections}
            onClearSearch={onClearSearch}
          />
        </div>
      </main>
    );
  }

  // Options not yet loaded from API → show skeleton
  if (!isLoaded) {
    return (
      <main ref={scrollRef} className={`tpo-body ${scrollbarClass}`}>
        <div className="tpo-body__content">
          <BodySkeleton/>
        </div>
      </main>
    );
  }

  const activeContent = getActiveContent();

  // Empty State
  if (!activeContent) {
    return (
      <main ref={scrollRef} className={`tpo-body ${scrollbarClass}`}>
        <div className="tpo-body__content">
          <div className="tpo-body__empty">
            <p>{__('Select a tab to view settings.', 'themeplus')}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main ref={scrollRef} className={`tpo-body ${scrollbarClass}`}>
      <div className="tpo-body__content">
        <div className="tpo-body__section">
          <h2 className="tpo-body__section-title">{activeContent.title}</h2>
          {activeContent.excerpt && (
            <p
              className="tpo-body__section-excerpt"
              dangerouslySetInnerHTML={{__html: activeContent.excerpt}}
            />
          )}

          {/* Custom Fonts Section */}
          {activeContent.isCustomFonts ? (
              <CustomFontUploader/>
            ) : /* Import/Export Section */
            activeContent.isImportExport ? (
                <ImportExport showModal={showModal}/>
              ) : /* Developer Panel */
              activeContent.isDevPanel ? (
                  <DevPanel/>
                ) : /* Regular Fields */
                activeContent.fields.length > 0 ? (
                  <div className="tpo-body__fields">
                    {!isLoaded ? null : activeContent.fields.map((field) => {
                      if (!shouldShowField(field, options, defaults)) return null;

                      return (
                        <FieldRenderer
                          key={field.id}
                          field={field}
                          value={options[field.id]}
                          onUpdate={(newValue) => {
                            setOptions(prev => ({...prev, [field.id]: newValue}));
                          }}
                          showModal={showModal}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="tpo-body__empty">
                    <p>{__('No fields available for this section.', 'themeplus')}</p>
                  </div>
                )}
        </div>
      </div>
    </main>
  );
}

export default Body;