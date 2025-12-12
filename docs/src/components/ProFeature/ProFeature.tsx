import styles from './ProFeature.module.css';

interface ProFeatureProps {
  title?: string;
  description?: string;
}

const ProFeature = ({ 
  title = 'Pro Feature',
  description = 'This feature is part of our commercial offering. Start a free trial to explore all Pro features.'
}: ProFeatureProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.badge}>
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className={styles.icon}
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span className={styles.badgeText}>{title}</span>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <a 
          href="https://sdk.thewidlarzgroup.com/signup?utm_source=rnv&utm_medium=docs&utm_campaign=pro-feature"
          target="_blank"
          rel="noreferrer"
          className={styles.primaryButton}
        >
          Start Free Trial
        </a>
        <a 
          href="https://www.thewidlarzgroup.com/?utm_source=rnv&utm_medium=docs&utm_campaign=pro-feature#Contact"
          target="_blank"
          rel="noreferrer"
          className={styles.secondaryButton}
        >
          Contact Sales
        </a>
      </div>
    </div>
  );
};

export default ProFeature;

