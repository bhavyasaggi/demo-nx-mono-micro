import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

import { Link as ChakraLink } from '@chakra-ui/react';

interface LinkProps extends NextLinkProps {
  className?: string;
  style?: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
}

export default function Link({
  as,
  href,
  passHref,
  children,
  className,
  style,
  ...restProps
}: LinkProps) {
  return (
    <ChakraLink
      as={NextLink}
      href={href ? String(href) : undefined}
      passHref={passHref}
      className={className}
      style={style}
      {...restProps}
    >
      {children}
    </ChakraLink>
  );
}
