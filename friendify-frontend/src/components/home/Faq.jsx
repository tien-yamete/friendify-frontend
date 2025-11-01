import { useState } from 'react'
import styles from '../../pages/Home.module.css'

/**
 * Individual FAQ item with accordion behavior
 */
function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={styles.faqItem}>
      <button
        className={styles.faqQuestion}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question}`}
      >
        <span>{question}</span>
        <span className={styles.faqIcon} aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div 
          id={`faq-answer-${question}`}
          className={styles.faqAnswer}
          role="region"
        >
          {answer}
        </div>
      )}
    </div>
  )
}

/**
 * FAQ accordion section
 * @param {Object} props - Component props
 * @param {Array} props.faqs - Array of FAQ objects with id, question, answer
 */
export default function Faq({ faqs = [] }) {
  const [openId, setOpenId] = useState(null)

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className={styles.faq} aria-labelledby="faq-heading">
      <div className={styles.faqContent}>
        <h2 id="faq-heading" className={styles.sectionTitle}>
          Frequently Asked Questions
        </h2>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
