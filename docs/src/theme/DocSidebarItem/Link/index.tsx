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
import type {AddCustomProps, CustomSidebarProps} from '@site/src/types/sidebar';

import styles from './styles.module.css';

function LinkLabel({label}: {label: string}) {
  return (
    <span title={label} className={styles.linkLabel}>
      {label}
    </span>
  );
}

type CustomProps = Omit<Props, 'item'> & {
  item: AddCustomProps<Props['item']> & Props['item']
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: CustomProps): ReactNode {
  const {href, label, className, autoAddBaseUrl, customProps} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  const isLink = item.type === 'link';

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
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
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
