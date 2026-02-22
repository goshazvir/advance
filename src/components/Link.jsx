'use client';

// Next Imports
import NextLink from 'next/link';

const getOnClickHandler = (onClick, href) => {
  if (onClick) return e => onClick(e);
  if (!href) return e => e.preventDefault();
  return undefined;
};

const Link = props => {
  // Props
  const {href, onClick, ...rest} = props;

  return (
    <NextLink
      {...rest}
      href={href || '/'}
      onClick={getOnClickHandler(onClick, href)}
    />
  );
};

export default Link;
