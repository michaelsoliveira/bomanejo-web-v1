import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
import React from 'react'

import { Link } from './Link';

// NavLink.propTypes = {
//     href: PropTypes.string.isRequired,
//     exact: PropTypes.bool
// };

// NavLink.defaultProps = {
//     exact: false
// };

type NavLinkProps = {
    href: string;
    exact?: boolean | null;
    className: string;
    children: React.ReactNode; // 👈️ added type for children
  };

const NavLink = ({href, exact, className, children}: NavLinkProps) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    
    if (isActive) {
        className += ' active';
    }

    return <Link href={href}>{children}</Link>;
}

export { NavLink }