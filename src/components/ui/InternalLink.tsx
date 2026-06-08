import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isInternalHref, scrollToSectionWhenReady, toRouterPath } from '../../utils/navigation';

type InternalLinkProps = {
  href: string;
  className?: string;
  title?: string;
  onClick?: () => void;
  children: ReactNode;
  motionProps?: Pick<HTMLMotionProps<'a'>, 'whileHover' | 'whileTap'>;
};

export function InternalLink({
  href,
  className = '',
  title,
  onClick,
  children,
  motionProps,
}: InternalLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHashLink = href.includes('#');

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    if (!isInternalHref(href)) return;

    e.preventDefault();
    const to = toRouterPath(href);
    const target =
      typeof to === 'string'
        ? { pathname: to, hash: '' }
        : { pathname: to.pathname ?? '/', hash: to.hash?.replace(/^#/, '') ?? '' };

    const samePath = location.pathname === target.pathname;
    const sameHash = (location.hash.replace(/^#/, '') || '') === (target.hash || '');

    if (samePath && sameHash) {
      if (target.hash) scrollToSectionWhenReady(target.hash);
      return;
    }

    navigate(to);

    if (target.hash) {
      requestAnimationFrame(() => scrollToSectionWhenReady(target.hash));
    }
  };

  if (!isInternalHref(href)) {
    return (
      <a href={href} className={className} title={title} onClick={onClick}>
        {children}
      </a>
    );
  }

  const link = (
    <Link
      to={toRouterPath(href)}
      className={className}
      title={title}
      onClick={isHashLink ? handleHashClick : onClick}
    >
      {children}
    </Link>
  );

  if (motionProps) {
    return (
      <motion.span
        className="inline-flex"
        whileHover={motionProps.whileHover}
        whileTap={motionProps.whileTap}
      >
        {link}
      </motion.span>
    );
  }

  return link;
}
