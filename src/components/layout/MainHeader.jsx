import Link from 'next/link';
import React from 'react';
import styles from './MainHeader.module.css';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          NextEvents
        </Link>
      </div>

      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events">
              All Events
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
