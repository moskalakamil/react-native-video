import Link from '@docusaurus/Link';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

function ArrowIcon() {
  return (
    <svg 
      className={styles.arrowIcon} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomepageBusinessValue(): ReactNode {
  return (
    <section className={styles.businessValue}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <span className={styles.label}>Enterprise Solutions</span>
            <h2 className={styles.title}>
              Need custom integration or support?
            </h2>
            <p className={styles.description}>
              Our team provides enterprise-grade integration services, custom development, and dedicated support to help you build the perfect video solution for your business.
            </p>
            <Link 
              to="https://www.thewidlarzgroup.com/?utm_source=rnv&utm_medium=docs&utm_campaign=business-value&utm_id=enterprise#Contact"
              className={styles.ctaButton}
              target="_blank"
              rel="noreferrer"
            >
              Get in touch
              <ArrowIcon />
            </Link>
          </div>
          <div className={styles.featuresList}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Custom Integration</h3>
                <p className={styles.featureDescription}>
                  Tailored solutions for your specific requirements
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Dedicated Support</h3>
                <p className={styles.featureDescription}>
                  Priority support with direct access to our team
                </p>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>Expert Consultation</h3>
                <p className={styles.featureDescription}>
                  Architecture guidance and best practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

