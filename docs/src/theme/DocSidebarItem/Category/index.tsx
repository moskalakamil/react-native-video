import React, {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useMemo,
} from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import {isSamePath} from '@docusaurus/theme-common/internal';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
  useVisibleSidebarItems,
} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
import DocSidebarItemLink from '@theme/DocSidebarItem/Link';
import type {Props} from '@theme/DocSidebarItem/Category';

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from '@docusaurus/plugin-content-docs';
import styles from './styles.module.css';

// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({
  isActive,
  collapsed,
  updateCollapsed,
  activePath,
}: {
  isActive: boolean;
  collapsed: boolean;
  updateCollapsed: (b: boolean) => void;
  activePath: string;
}) {
  const wasActive = usePrevious(isActive);
  const previousActivePath = usePrevious(activePath);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    const stillActiveButPathChanged =
      isActive && wasActive && activePath !== previousActivePath;
    if ((justBecameActive || stillActiveButPathChanged) && collapsed) {
      updateCollapsed(false);
    }
  }, [
    isActive,
    wasActive,
    collapsed,
    updateCollapsed,
    activePath,
    previousActivePath,
  ]);
}

/**
 * When a collapsible category has no link, we still link it to its first child
 * during SSR as a temporary fallback. This allows to be able to navigate inside
 * the category even when JS fails to load, is delayed or simply disabled
 * React hydration becomes an optional progressive enhancement
 * see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
 * see https://github.com/facebook/docusaurus/issues/3030
 */
function useCategoryHrefWithSSRFallback(
  item: Props['item'],
): string | undefined {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation
    if (isBrowser || !item.collapsible) {
      return undefined;
    }
    return findFirstSidebarItemLink(item);
  }, [item, isBrowser]);
}

function CollapseButton({
  collapsed,
  categoryLabel,
  onClick,
}: {
  collapsed: boolean;
  categoryLabel: string;
  onClick: ComponentProps<'button'>['onClick'];
}) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
              {
                id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
                message: "Expand sidebar category '{label}'",
                description: 'The ARIA label to expand the sidebar category',
              },
              {label: categoryLabel},
            )
          : translate(
              {
                id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
                message: "Collapse sidebar category '{label}'",
                description: 'The ARIA label to collapse the sidebar category',
              },
              {label: categoryLabel},
            )
      }
      aria-expanded={!collapsed}
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}

function CategoryLinkLabel({label, isRootCategory}: {label: string; isRootCategory: boolean}) {
  return (
    <span 
      title={label} 
      className={clsx(styles.categoryLinkLabel, {
        [styles.categoryLinkLabelRoot]: isRootCategory,
        [styles.categoryLinkLabelNested]: !isRootCategory,
      })}
      >
      {label}
    </span>
  );
}

export default function DocSidebarItemCategory(props: Props): ReactNode {
  const visibleChildren = useVisibleSidebarItems(
    props.item.items,
    props.activePath,
  );
  if (visibleChildren.length === 0) {
    return <DocSidebarItemCategoryEmpty {...props} />;
  } else {
    return <DocSidebarItemCategoryCollapsible {...props} />;
  }
}

function isCategoryWithHref(
  category: PropSidebarItemCategory,
): category is PropSidebarItemCategory & {href: string} {
  return typeof category.href === 'string';
}

// If a category doesn't have any visible children, we render it as a link
function DocSidebarItemCategoryEmpty({item, ...props}: Props): ReactNode {
  // If the category has no link, we don't render anything
  // It's not super useful to render a category you can't open nor click
  if (!isCategoryWithHref(item)) {
    return null;
  }
  // We remove props that don't make sense for a link and forward the rest
  const {
    type,
    collapsed,
    collapsible,
    items,
    linkUnlisted,
    ...forwardableProps
  } = item;
  const linkItem: PropSidebarItemLink = {
    type: 'link',
    ...forwardableProps,
  };
  return <DocSidebarItemLink item={linkItem} {...props} />;
}

function DocSidebarItemCategoryCollapsible({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): ReactNode {
  const {items, label, collapsible, className, href} = item;
  const {
    docs: {
      sidebar: {autoCollapseCategories},
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);

  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);

  // Root categories (level === 1) are always expanded and non-collapsible
  const isRootCategory = level === 1;

  const {collapsed, setCollapsed} = useCollapsible({
    // Root categories (level === 1) are always expanded
    // Nested categories (level > 1) are always collapsed by default, unless they are active
    initialState: () => {
      if (isRootCategory) {
        return false; // Always expanded for root categories
      }
      if (!collapsible) {
        return false;
      }
      // For nested categories: only expand if active, otherwise always collapse
      return isActive ? false : true;
    },
  });

  const {expandedItem, setExpandedItem} = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = (toCollapsed: boolean = !collapsed) => {
    // Root categories cannot be collapsed
    if (isRootCategory) {
      return;
    }
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  
  // Only auto-expand for nested categories, not root
  // We need to call the hook unconditionally (React rules), but make it a no-op for root categories
  useAutoExpandActiveCategory({
    isActive: isActive && !isRootCategory,
    collapsed: isRootCategory ? false : collapsed,
    updateCollapsed: isRootCategory ? () => {} : updateCollapsed,
    activePath,
  });
  
  useEffect(() => {
    // Root categories should never collapse - always keep them expanded
    if (isRootCategory) {
      setCollapsed(false);
      return;
    }
    // Auto-collapse when other categories expand (only if autoCollapseCategories is enabled)
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories, isRootCategory]);

  const handleItemClick: ComponentProps<'a'>['onClick'] = (e) => {
    onItemClick?.(item);
    // Root categories cannot be collapsed, so skip collapse logic
    if (isRootCategory) {
      return;
    }
    if (collapsible) {
      if (href) {
        // When already on the category's page, we collapse it
        // We don't use "isActive" because it would collapse the
        // category even when we browse a children element
        // See https://github.com/facebook/docusaurus/issues/11213
        if (isCurrentPage) {
          e.preventDefault();
          updateCollapsed();
        } else {
          // When navigating to a new category, we always expand
          // see https://github.com/facebook/docusaurus/issues/10854#issuecomment-2609616182
          updateCollapsed(false);
        }
      } else {
        e.preventDefault();
        updateCollapsed();
      }
    }
  };

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
          [styles.rootCategoryContainer]: isRootCategory,
        },
        className,
      )}>
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}>
        <Link
          className={clsx(styles.categoryLink, 'menu__link', {
            [styles.categoryLinkRoot]: isRootCategory,
            'menu__link--sublist': collapsible && !isRootCategory,
            'menu__link--sublist-caret': !href && collapsible && !isRootCategory,
            'menu__link--active': isActive,
          })}
          onClick={handleItemClick}
          aria-current={isCurrentPage ? 'page' : undefined}
          role={collapsible && !href && !isRootCategory ? 'button' : undefined}
          aria-expanded={collapsible && !href && !isRootCategory ? !collapsed : undefined}
          href={collapsible && !isRootCategory ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
          {...props}>
          {/* Only show collapse button for nested categories (not root) */}
          {href && collapsible && !isRootCategory && (
            <CollapseButton
              collapsed={collapsed}
              categoryLabel={label}
              onClick={(e) => {
                e.preventDefault();
                updateCollapsed();
              }}
            />
          )}
          <CategoryLinkLabel label={label} isRootCategory={isRootCategory} />
        </Link>
      </div>

      <Collapsible lazy as="ul" className={clsx('menu__list', isRootCategory && styles.categoryList)} collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}
