import type { ReactNode } from 'react';
import styles from './styles.module.css';

type TestimonialItem = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

const TestimonialList: TestimonialItem[] = [
  {
    quote: '',
    author: '',
    role: '',
    company: '',
  },
  {
    quote: '',
    author: '',
    role: '',
    company: '',
  },
  {
    quote: '',
    author: '',
    role: '',
    company: '',
  },
];

function Testimonial({quote, author, role, company}: TestimonialItem) {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.quoteIcon}>"</div>
      <p className={styles.quote}>{quote || 'Testimonial quote will appear here'}</p>
      <div className={styles.author}>
        <div className={styles.authorName}>{author || 'Author Name'}</div>
        <div className={styles.authorRole}>
          {role && company ? `${role} at ${company}` : role || company || 'Role, Company'}
        </div>
      </div>
    </div>
  );
}

export default function HomepageTestimonials(): ReactNode {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerLabel}>Testimonials</span>
          <h2 className={styles.headerTitle}>
            Trusted by developers worldwide
          </h2>
        </div>

        <div className={styles.grid}>
          {TestimonialList.map((props, idx) => (
            <Testimonial key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

