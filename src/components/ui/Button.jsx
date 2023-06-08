import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css';

export default function Button({ link, onClick, children }) {
  if (link) {
    return (
      <Link href={link} className={styles.btn}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={styles.btn}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
