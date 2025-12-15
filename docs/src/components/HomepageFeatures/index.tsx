import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
};

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureIcon}>
    <circle cx="12" cy="12" r="2.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
  </svg>
);

const SubtitlesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureIcon}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 14h4M6 18h8M14 14h4" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureIcon}>
    <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlatformsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureIcon}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" strokeLinecap="round" />
  </svg>
);

const PerformanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureIcon}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PluginsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.featureIcon}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
  </svg>
);

const FeatureList: FeatureItem[] = [
  {
    title: 'React Native First',
    icon: <ReactIcon />,
    description: 'Built specifically for React Native with a native-first approach. Seamless integration with your existing React Native projects.',
  },
  {
    title: 'Multi-Platform',
    icon: <PlatformsIcon />,
    description: 'iOS, Android, tvOS, visionOS, Vega OS, Web, and Windows. One API across all platforms with platform-specific optimizations.',
  },
  {
    title: 'Subtitles & Audio',
    icon: <SubtitlesIcon />,
    description: 'Full support for multiple subtitle formats and audio tracks. Switch between languages on the fly.',
  },
  {
    title: 'DRM Protected',
    icon: <ShieldIcon />,
    description: 'Industry-standard DRM support including Widevine, FairPlay, and PlayReady for secure content delivery.',
  },
  {
    title: 'High Performance',
    icon: <PerformanceIcon />,
    description: 'Optimized native players under the hood. Smooth playback with minimal memory footprint.',
  },
  {
    title: 'Plugin System',
    icon: <PluginsIcon />,
    description: 'Extensible architecture with a powerful plugin system. Add custom functionality without forking.',
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIconWrapper}>
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>Features</span>
          <h2 className={styles.headerTitle}>
            Everything you need for video playback
          </h2>
          <p className={styles.headerSubtitle}>
            A comprehensive video solution trusted by thousands of developers worldwide
          </p>
        </div>

        <div className={styles.grid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
