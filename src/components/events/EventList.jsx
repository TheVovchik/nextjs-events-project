import React from 'react';
import EventItem from './EventItem';
import styles from './EventList.module.css';

export default function EventList ({ items }) {
  return (
    <ul className={styles.list}>
      {items.map(event => {
        return <EventItem event={event} key={event.id} />
      })}
    </ul>
  )
}
