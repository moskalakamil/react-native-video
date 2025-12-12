import styles from './PlusBadge.module.css';

interface PlusBadgeProps {
  tooltip?: string;
}

const PlusBadge = ({ tooltip = 'Pro feature' }: PlusBadgeProps) => {
  return (
    <span className={styles.badge} title={tooltip}>
      <svg 
        width="12" 
        height="12" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className={styles.icon}
      >
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </span>
  );
};

export default PlusBadge;

