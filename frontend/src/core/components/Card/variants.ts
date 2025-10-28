import { clsx } from 'clsx';

export interface CardVariantProps {
  variant?: 'elevated' | 'outline' | 'flat';
  className?: string;
}

export function getCardClassName(props: CardVariantProps): string {
  const { variant = 'elevated', className } = props;

  return clsx(
    'rounded-lg p-6',
    {
      'bg-white shadow-md': variant === 'elevated',
      'bg-white border border-gray-200': variant === 'outline',
      'bg-gray-50': variant === 'flat',
    },
    className
  );
}
