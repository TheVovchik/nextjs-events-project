import React from 'react';
import styles from './EventItem.module.css';
import Button from '../ui/button';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Image from 'next/image';

export default function EventItem({ event }) {
  const {
    title,
    image,
    date,
    location,
    id,
  } = event;

  return (
    <li className={styles.item}>
      <Image
        src={`/${image}`}
        alt={title}
        width={250}
        height={160}
      />

      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>

          <div className={styles.date}>
            <DateIcon />
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>

          <div className={styles.address}>
            <AddressIcon />
            <address>
              {location.replace(', ', '\n')}
            </address>
          </div>
        </div>

        <div className={styles.actions}>
          <Button link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}><ArrowRightIcon /></span>
          </Button>
        </div>
      </div>
    </li>
  )
}
