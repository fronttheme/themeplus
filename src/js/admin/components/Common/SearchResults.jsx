/**
 * ThemePlus Search Results Component
 *
 * File: src/js/admin/components/Common/SearchResults.jsx
 */

import {__} from '@wordpress/i18n';
import {useEffect, useState, useCallback} from '@wordpress/element';
import {useSettings} from '../../context/SettingsContext';
import FieldRenderer from './FieldRenderer';
import {shouldShowField} from '../../utils/fieldHelpers';
import Button from "./Button";

function SearchResults({searchQuery, sections, onClearSearch}) {
  const {options, setOptions} = useSettings();
  const [searching, setSearching] = useState(false);
  const [matchingFields, setMatchingFields] = useState([]);

  const matchesField = (field, query) => {
    const searchableText = [
      field.title || '',
      field.subtitle || '',
      field.desc || '',
      field.id || '',
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  };

  const performSearch = useCallback(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setMatchingFields([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const matches = [];

      sections.forEach(section => {
        section.fields?.forEach(field => {
          if (matchesField(field, query)) {
            matches.push({
              field,
              section: section.title,
              subsection: null,
            });
          }
        });

        section.subsections?.forEach(subsection => {
          subsection.fields?.forEach(field => {
            if (matchesField(field, query)) {
              matches.push({
                field,
                section: section.title,
                subsection: subsection.title,
              });
            }
          });
        });
      });

      setMatchingFields(matches);
      setSearching(false);
    }, 100);
  }, [searchQuery, sections]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  if (searching) {
    return (
      <div className="tpo-search-results">
        <div className="tpo-search-results__loading">
          <div className="tpo-search-results__loading-spinner"><i className="fa-solid fa-gear"></i></div>
          <p>{__('Searching...', 'themeplus')}</p>
        </div>
      </div>
    );
  }

  if (!searchQuery || searchQuery.length < 2) {
    return null;
  }

  return (
    <div className="tpo-search-results">
      <div className="tpo-search-results__header tpo-field-has-btn">
        <div className="tpo-search-results__info">
          <span className="tpo-search-results__count">
            {matchingFields.length === 0
              ? __('No results found', 'themeplus')
              : `${matchingFields.length} ${__('field(s) found for', 'themeplus')} "${searchQuery}"`
            }
          </span>
        </div>
        <Button
          color="secondary"
          onClick={onClearSearch}>
          {__('Clear Search', 'themeplus')}<i className="fa-solid fa-xmark"></i>
        </Button>
      </div>

      {matchingFields.length > 0 ? (
        <div className="tpo-search-results__list">
          {matchingFields.map((match) => {
            if (!shouldShowField(match.field, options)) {
              return null;
            }

            return (
              <div key={match.field.id} className="tpo-search-results__item tpo-field-card">
                <div className="tpo-search-results__breadcrumb">
                                    <span className="tpo-search-results__breadcrumb-text">
                                        {match.section}
                                      {match.subsection && ` › ${match.subsection}`}
                                    </span>
                </div>

                <div className="tpo-search-results__field">
                  <FieldRenderer
                    field={match.field}
                    value={options[match.field.id]}
                    onUpdate={(newValue) => {
                      setOptions(prev => ({...prev, [match.field.id]: newValue}));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="tpo-search-results__empty">
          <div className="tpo-search-results__empty-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
          <p className="tpo-search-results__empty-text">
            {__('No fields match your search.', 'themeplus')}
          </p>
          <div className="tpo-search-results__tips tpo-field-card">
            <p className="tpo-search-results__tips-title">
              <i className="fa-solid fa-lightbulb"></i>{__('Search Tips:', 'themeplus')}
            </p>
            <ul className="tpo-search-results__tips-list">
              <li>{__('Try different keywords', 'themeplus')}</li>
              <li>{__('Check your spelling', 'themeplus')}</li>
              <li>{__('Use shorter search terms', 'themeplus')}</li>
              <li>{__('Try searching by field name', 'themeplus')}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;