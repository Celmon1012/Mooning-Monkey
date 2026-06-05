import type { To } from 'react-router-dom';

/** Convert app hrefs (`/#about`, `/Evaluation`) into React Router `to` values */
export function toRouterPath(href: string): To {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return href;
  }

  const pathname = href.slice(0, hashIndex) || '/';
  const hash = href.slice(hashIndex + 1);
  return { pathname, hash };
}

export function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior, block: 'start' });
    return true;
  }
  return false;
}

/** Retry scroll until lazy homepage sections mount */
export function scrollToSectionWhenReady(id: string, maxAttempts = 40) {
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToSection(id)) return;
    if (attempts++ < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
}
