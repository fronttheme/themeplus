/**
 * ThemePlus Check Icon
 *
 * File: src/js/admin/components/themeplus/CheckIcon.jsx
 */

const ThemePlusCheckIcon = ({
                              size = 20,
                              color = 'currentColor',
                              className = ''
                            }) => {
  return (
    <div className={`themeplus-check ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="10" fill={color}/>
        <path
          d="M6 10L9 13L14 7"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ThemePlusCheckIcon;