import styles from '../../pages/Home.module.css'

/**
 * Feature card component
 */
function FeatureCard({ icon, title, description }) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon} aria-hidden="true">
        {icon}
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  )
}

/**
 * Features grid section
 * @param {Object} props - Component props
 * @param {Array} props.features - Array of feature objects with id, icon, title, description
 */
export default function Features({ features = [] }) {
  return (
    <section className={styles.features} aria-labelledby="features-heading">
      <div className={styles.featuresContent}>
        <h2 id="features-heading" className={styles.sectionTitle}>
          Why Choose Friendify?
        </h2>
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
