import { getButtonClassName } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with multiple variants
 * @domain core
 * @type ui-component
 * @category form
 *
 * @props
 * @param {ButtonProps} props - Component properties
 *
 * @styling
 * - Variants: primary, secondary, danger, ghost
 * - Sizes: sm, md, lg
 * - Responsive: Full width option
 *
 * @accessibility
 * - Keyboard: Full keyboard navigation support
 * - ARIA: Proper button semantics
 * - Screen Reader: Clear button purpose
 */
export const Button = (props: ButtonProps) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled = false,
    type = 'button',
    onClick,
    className,
    ...rest
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={getButtonClassName({ variant, size, fullWidth, className })}
      {...rest}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Carregando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
