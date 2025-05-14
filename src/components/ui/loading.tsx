import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
}

export default function Loading({ className, size = 'default' }: LoadingProps) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-t-transparent border-primary',
        sizeClasses[size],
        className
      )}
    />
  );
}