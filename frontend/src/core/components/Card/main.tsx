import { getCardClassName } from './variants';
import type { CardProps } from './types';

/**
 * @component Card
 * @summary Container card component for grouped content
 * @domain core
 * @type ui-component
 * @category display
 *
 * @props
 * @param {CardProps} props - Component properties
 *
 * @styling
 * - Variants: elevated, outline, flat
 * - Responsive: Full width by default
 *
 * @accessibility
 * - Semantic: Uses article element
 * - Screen Reader: Clear content grouping
 */
export const Card = (props: CardProps) => {
  const { children, variant = 'elevated', className, ...rest } = props;

  return (
    <article className={getCardClassName({ variant, className })} {...rest}>
      {children}
    </article>
  );
};
