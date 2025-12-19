import React from 'react';
import clsx from 'clsx';
import styles from './StatusBadge.module.css';

type StatusBadgeType = 'planned' | 'new';

interface StatusBadgeProps {
  type: StatusBadgeType;
}

const config = {
  planned: {
    label: 'Planned',
    title: 'Planned feature',
    className: 'badgePlanned',
  },
  new: {
    label: 'New',
    title: 'New feature',
    className: 'badgeNew',
  },
};

export default function StatusBadge({ type }: StatusBadgeProps) {
  const { label, title, className } = config[type];

  return (
    <span className={clsx(styles.badge, styles[className])} title={title}>
      {label}
    </span>
  );
}
