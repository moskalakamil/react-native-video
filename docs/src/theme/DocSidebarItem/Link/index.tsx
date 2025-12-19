import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/DocSidebarItem/Link';
import ProBadge from '@site/src/components/ProBadge/ProBadge';
import StatusBadge from '@site/src/components/StatusBadge/StatusBadge';
import type {WithCustomProps} from '@site/src/types/sidebar';

import styles from './styles.module.css';

function LinkLabel({label}: {label: string}) {
  return (
    <span title={label} className={styles.linkLabel}>
      {label}
    </span>
  );
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: WithCustomProps<Props>): ReactNode {
  const {href, label, className, autoAddBaseUrl, customProps} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  const isLink = item.type === 'link';

  // Dynamic indent for nested items (level 3+)
  const nestedIndent = level >= 3 ? (level - 2) * 0.05 : 0;

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          styles.menuLink,
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        style={nestedIndent > 0 ? { paddingLeft: `${nestedIndent + 2.5}rem` } : undefined}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <LinkLabel label={label} />
        {!isInternalLink && <IconExternalLink />}
        {isLink && (
          <>
            {customProps?.plan === 'pro' && <ProBadge />}
            {customProps?.badgeType && (
              <StatusBadge type={customProps.badgeType} />
            )}
          </>
        )}
      </Link>
    </li>
  );
}
