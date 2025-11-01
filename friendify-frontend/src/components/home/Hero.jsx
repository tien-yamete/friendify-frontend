import { Link } from 'react-router-dom'
import styles from '../../pages/Home.module.css'

/**
 * Hero section component for the landing page
 * @param {Object} props - Component props
 * @param {string} props.headline - Main headline text
 * @param {string} props.subtext - Supporting text below headline
 * @param {string} props.primaryButtonText - Primary CTA button text
 * @param {string} props.primaryButtonLink - Primary CTA button link
 * @param {string} props.secondaryButtonText - Secondary button text
 * @param {string} props.secondaryButtonLink - Secondary button link
 * @param {string} props.illustration - Hero image URL
 */
export default function Hero({
  headline,
  subtext,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  illustration
}) {
  return (
    <section className={styles.hero} aria-labelledby="hero-headline">
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 id="hero-headline" className={styles.heroHeadline}>
            {headline}
          </h1>
          <p className={styles.heroSubtext}>
            {subtext}
          </p>
          <div className={styles.heroButtons}>
            <Link 
              to={primaryButtonLink} 
              className={styles.buttonPrimary}
              aria-label={primaryButtonText}
            >
              {primaryButtonText}
            </Link>
            <Link 
              to={secondaryButtonLink} 
              className={styles.buttonSecondary}
              aria-label={secondaryButtonText}
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <img 
            src={illustration} 
            alt="People connecting and sharing moments"
            className={styles.heroImage}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
