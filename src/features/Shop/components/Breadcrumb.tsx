'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  homeElement?: React.ReactNode;
  separator: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

export const Breadcrumb = (props: Props) => {
  const {
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeClasses,
    capitalizeLinks,
  } = props;

  const paths = usePathname();
  const pathNames = paths.split('/').filter((x) => x);

  return (
    <div>
      <ul className={containerClasses}>
        {homeElement && (
          <li className={listClasses}>
            <Link href={'/'}>{homeElement}</Link>
          </li>
        )}
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks
            ? link[0]!.toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};
