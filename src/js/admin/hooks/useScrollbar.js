/**
 * useScrollbar Hook
 * Shows scrollbar only when scrollable and on hover/scroll
 *
 * File: src/js/admin/hooks/useScrollbar.js
 */

import {useEffect, useRef, useState} from '@wordpress/element';

function useScrollbar(options = {}) {
  const {
    hideDelay = 2000,
    showOnHover = true,
    isOpen = true,
  } = options;

  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const element = scrollRef.current;
    if (!element) return;

    // Check if element is scrollable
    const checkScrollable = () => {
      const scrollable = element.scrollHeight > element.clientHeight;
      setIsScrollable(scrollable);
    };

    checkScrollable();
    setTimeout(checkScrollable, 100);

    const resizeObserver = new ResizeObserver(checkScrollable);
    resizeObserver.observe(element);

    const mutationObserver = new MutationObserver(checkScrollable);
    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
    });

    // Show scrollbar on scroll
    const handleScroll = () => {
      setIsActive(true);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      hideTimeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, hideDelay);
    };

    // Show scrollbar on hover
    const handleMouseEnter = () => {
      if (showOnHover) {
        setIsActive(true);
      }
    };

    // Hide scrollbar on leave (with delay)
    const handleMouseLeave = () => {
      if (showOnHover) {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = setTimeout(() => {
          setIsActive(false);
        }, hideDelay);
      }
    };

    // Keep scrollbar visible when hovering scrollbar itself
    const handleMouseMove = (e) => {
      if (!showOnHover) return;

      const rect = element.getBoundingClientRect();
      const isNearScrollbar = e.clientX > rect.right - 16; // Within 16px of right edge

      if (isNearScrollbar) {
        // Mouse is on/near scrollbar - keep it visible
        setIsActive(true);

        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }
    };

    element.addEventListener('scroll', handleScroll);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      element.removeEventListener('scroll', handleScroll);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [hideDelay, showOnHover, isOpen]);

  const scrollbarClass = [
    'tpo-scrollbar',
    isScrollable ? 'tpo-scrollbar--scrollable' : '',
    isActive ? 'tpo-scrollbar--active' : '',
  ].filter(Boolean).join(' ');

  return {
    scrollRef,
    scrollbarClass,
    isScrollable,
    isActive,
  };
}

export default useScrollbar;