import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageHero from '@site/src/components/HomepageHero';
import HomepageTestimonials from '@site/src/components/HomepageTestimonials';
import HomepageBusinessValue from '@site/src/components/HomepageBusinessValue';
import Layout from '@theme/Layout';
import { type ReactNode } from 'react';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Video player for React Native."
    >
      <HomepageHero />
      <main>
        <HomepageFeatures />
        <HomepageTestimonials />
        <HomepageBusinessValue />
      </main>
    </Layout>
  );
}
