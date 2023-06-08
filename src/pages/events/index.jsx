import React, { useState, useEffect, useMemo } from 'react';
import { useAllEvents } from '../../api/api';
import EventList from '../../components/events/EventList';
import Head from 'next/head';

export default function AllEventsPage({ items }) {
  const [events, setEvents] = useState(items);
  const { data } = useAllEvents(process.env.NEXT_PUBLIC_DB_URL);

  const updatedEvents = useMemo(() => {
    data
  }, [data]);

  useEffect(() => {
    if (updatedEvents) {
      setEvents(updatedEvents);
    }
  }, [updatedEvents]);

  return (
    <div>
      <Head>
        <title>NextJS ALL Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList items={events}/>
    </div>
  )
}

export async function getStaticProps() {
  const events = await fetch(process.env.NEXT_PUBLIC_DB_URL)
    .then(res => res.json())
    .then(data => {
      return Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          ...value,
        }
      })
    });

  return {
    props: {
      items: events,
    }
  }
}
