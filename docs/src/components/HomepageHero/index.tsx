import Link from '@docusaurus/Link';
import { useDocsPreferredVersion } from '@docusaurus/theme-common';
import { useMemo, type ReactNode } from 'react';
import styles from './styles.module.css';

interface PreferredVersion {
  preferredVersion: { label: string; mainDocId: string; path: string } | null;
}

function ArrowIcon() {
  return (
    <svg
      className={styles.buttonIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function HomepageHero(): ReactNode {
  const version = useDocsPreferredVersion() as PreferredVersion;

  const link = useMemo(() => {
    if (!version.preferredVersion) {
      return '/docs/v6/intro';
    }
    return `${version.preferredVersion.path}/${version.preferredVersion.mainDocId}`;
  }, [version]);

  return (
    <header className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          v7 Beta Available
        </div>

        <img
          src="./img/twg-logo.png"
          alt="React Native Video"
          className={styles.logo}
        />

        <h1 className={styles.title}>
          <span className={styles.titleAccent}>Video</span> for React Native
        </h1>

        <p className={styles.subtitle}>
          The most feature-rich video player for React Native. Multi-platform
          support with DRM, subtitles, and audio tracks.
        </p>

        <div className={styles.buttons}>
          <Link to={link} className={styles.buttonPrimary}>
            Get Started
            <ArrowIcon />
          </Link>
          <Link
            to="https://github.com/TheWidlarzGroup/react-native-video"
            className={styles.buttonSecondary}
          >
            <GitHubIcon />
            View on GitHub
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>7k+</span>
            <span className={styles.statLabel}>GitHub Stars</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>350k+</span>
            <span className={styles.statLabel}>Weekly Downloads</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>TWG</span>
            <span className={styles.statLabel}>Company Backed</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Explore</span>
        <div className={styles.scrollLine} />
      </div>
    </header>
  );
}
