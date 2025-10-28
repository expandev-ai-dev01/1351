import { getLoadingSpinnerClassName } from './variants';
import type { LoadingSpinnerProps } from './types';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component for async operations
 * @domain core
 * @type ui-component
 * @category feedback
 *
 * @props
 * @param {LoadingSpinnerProps} props - Component properties
 *
 * @styling
 * - Variants: sm, md, lg
 * - Responsive: Scales appropriately
 *
 * @accessibility
 * - ARIA: role="status" with aria-label
 * - Screen Reader: Announces loading state
 */
export const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { size = 'md', className } = props;

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div
        className={getLoadingSpinnerClassName({ size, className })}
        role="status"
        aria-label="Carregando"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};
