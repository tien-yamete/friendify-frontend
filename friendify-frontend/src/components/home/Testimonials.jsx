import styles from '../../pages/Home.module.css'

/**
 * Individual testimonial card
 */
function TestimonialCard({ name, role, avatar, quote }) {
  return (
    <div className={styles.testimonialCard}>
      <blockquote className={styles.testimonialQuote}>
        "{quote}"
      </blockquote>
      <div className={styles.testimonialAuthor}>
        <img 
          src={avatar} 
          alt={`${name}'s profile`}
          className={styles.testimonialAvatar}
          loading="lazy"
        />
        <div className={styles.testimonialInfo}>
          <p className={styles.testimonialName}>{name}</p>
          <p className={styles.testimonialRole}>{role}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Testimonials section component
 * @param {Object} props - Component props
 * @param {Array} props.testimonials - Array of testimonial objects
 */
export default function Testimonials({ testimonials = [] }) {
  return (
    <section className={styles.testimonials} aria-labelledby="testimonials-heading">
      <div className={styles.testimonialsContent}>
        <h2 id="testimonials-heading" className={styles.sectionTitle}>
          What Our Users Say
        </h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              avatar={testimonial.avatar}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
