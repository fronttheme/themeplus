/**
 * ThemePlus Developer Panel
 *
 * File: src/js/admin/components/DevPanel/DevPanel.jsx
 */

import {useState, useEffect} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import Select from '../Common/Select';
import DevFieldCard from './DevFieldCard';
import Button from "../Common/Button";

function DevPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    section: 'all',
    search: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const response = await apiFetch({path: '/themeplus/v1/dev-panel'});
      setData(response);
    } catch (error) {
      console.error('Dev panel error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="tpo-dev-loading">Loading...</div>;
  if (!data) return <div className="tpo-dev-error">Failed to load</div>;

  // Get unique types
  const types = [
    {value: 'all', label: __('All Types', 'themeplus')},
    ...Array.from(new Set(data.fields.map(f => f.type))).map(type => ({
      value: type,
      label: type
    }))
  ];

  // Get unique sections
  const uniqueSections = {};
  data.fields.forEach(field => {
    if (!uniqueSections[field.section_id]) {
      uniqueSections[field.section_id] = field.section_title;
    }
  });

  const sections = [
    {value: 'all', label: __('All Sections', 'themeplus')},
    ...Object.entries(uniqueSections).map(([id, title]) => ({
      value: id,
      label: title
    }))
  ];

  // Filter fields
  const filtered = data.fields.filter(field => {
    // Type filter
    if (filters.type !== 'all' && field.type !== filters.type) {
      return false;
    }

    // Section filter
    if (filters.section !== 'all' && field.section_id !== filters.section) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const searchable = [
        field.id,
        field.title,
        field.subtitle,
        field.type,
        field.section_title
      ].filter(Boolean).join(' ').toLowerCase();

      if (!searchable.includes(search)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="tpo-dev-panel">
      {/* Header */}
      <div className="tpo-dev-header">
        <div className="tpo-dev-header__title">
          <p>{__('Field reference and usage examples', 'themeplus')}</p>
        </div>
        <div className="tpo-dev-badge">
          <i className="fa-solid fa-bug"></i>
          {__('DEV MODE', 'themeplus')}
        </div>
      </div>

      {/* Stats */}
      <div className="tpo-dev-stats">
        <div className="tpo-dev-stat">
          <div className="tpo-dev-stat__value">{data.statistics.total_fields}</div>
          <div className="tpo-dev-stat__label">{__('Total Fields', 'themeplus')}</div>
        </div>
        <div className="tpo-dev-stat">
          <div className="tpo-dev-stat__value">{data.statistics.total_sections}</div>
          <div className="tpo-dev-stat__label">{__('Sections', 'themeplus')}</div>
        </div>
        <div className="tpo-dev-stat">
          <div className="tpo-dev-stat__value">{Object.keys(data.statistics.by_type).length}</div>
          <div className="tpo-dev-stat__label">{__('Field Types', 'themeplus')}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="tpo-dev-filters">
        <div className="tpo-dev-search-wrapper">
          <i className="fa-solid fa-magnifying-glass tpo-dev-search-icon"></i>
          <input
            type="text"
            className="tpo-dev-search"
            placeholder={__('Search by field ID, title, type...', 'themeplus')}
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          {filters.search && (
            <Button
              color="muted"
              size="small"
              iconOnly={true}
              onClick={() => setFilters({...filters, search: ''})}
              ariaLabel={__('Clear search', 'themeplus')}>
              <i className="fa-solid fa-xmark"></i>
            </Button>
          )}
        </div>

        <Select
          value={filters.type}
          options={types}
          onChange={(value) => setFilters({...filters, type: value})}
          className="tpo-dev-select"
        />

        <Select
          value={filters.section}
          options={sections}
          onChange={(value) => setFilters({...filters, section: value})}
          className="tpo-dev-select"
        />

        <div className="tpo-dev-results">
          {filtered.length} {__('of', 'themeplus')} {data.fields.length}
        </div>
      </div>

      {/* Field Cards */}
      <div className="tpo-dev-fields">
        {filtered.length > 0 ? (
          filtered.map(field => (
            <DevFieldCard key={field.id} field={field}/>
          ))
        ) : (
          <div className="tpo-dev-empty">
            <i className="fa-solid fa-search"></i>
            <p>{__('No fields found matching your filters', 'themeplus')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DevPanel;