import { Link } from 'react-router-dom'
import styles from '../../pages/Home.module.css'

/**
 * Call-to-action band component
 * @param {Object} props - Component props
 * @param {string} props.headline - CTA headline text
 * @param {string} props.subtext - Supporting text
 * @param {string} props.buttonText - Button text
 * @param {string} props.buttonLink - Button link
 */
export default function CtaBand({ headline, subtext, buttonText, buttonLink }) {
  return (
    <section className={styles.ctaBand} aria-labelledby="cta-headline">
      <div className={styles.ctaContent}>
        <h2 id="cta-headline" className={styles.ctaHeadline}>
          {headline}
        </h2>
        <p className={styles.ctaSubtext}>
          {subtext}
        </p>
        <Link 
          to={buttonLink} 
          className={styles.ctaButton}
          aria-label={buttonText}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
