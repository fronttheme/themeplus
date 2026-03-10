/**
 * useUnsavedChanges Hook
 * Tracks unsaved changes across the app
 *
 * File: src/js/admin/hooks/useUnsavedChanges.js
 */

import {useState, useEffect, useCallback} from '@wordpress/element';

export function useUnsavedChanges() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalValues, setOriginalValues] = useState({});
  const [currentValues, setCurrentValues] = useState({});

  /**
   * Initialize with saved values
   */
  const initialize = useCallback((savedValues) => {
    setOriginalValues(savedValues);
    setCurrentValues(savedValues);
    setHasUnsavedChanges(false);
  }, []);

  /**
   * Update current values
   */
  const updateValue = useCallback((key, value) => {
    setCurrentValues(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  /**
   * Check if values have changed
   */
  useEffect(() => {
    const hasChanges = JSON.stringify(currentValues) !== JSON.stringify(originalValues);
    setHasUnsavedChanges(hasChanges);
  }, [currentValues, originalValues]);

  /**
   * Mark as saved (updates original to current)
   */
  const markAsSaved = useCallback(() => {
    setOriginalValues(currentValues);
    setHasUnsavedChanges(false);
  }, [currentValues]);

  /**
   * Browser beforeunload warning
   */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return {
    hasUnsavedChanges,
    currentValues,
    initialize,
    updateValue,
    markAsSaved,
  };
}

export default useUnsavedChanges;