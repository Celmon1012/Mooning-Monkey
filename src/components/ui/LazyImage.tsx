import { type ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Above-the-fold hero images */
  priority?: boolean;
}

export function LazyImage({ priority = false, loading, decoding, ...props }: LazyImageProps) {
  return (
    <img
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={decoding ?? 'async'}
      {...props}
    />
  );
}
