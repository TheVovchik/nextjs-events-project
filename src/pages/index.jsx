import EventList from '../components/events/EventList';
import EventsSearch from '../components/events/EventsSearch';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useFeaturedEvents } from '../api/api';
import NewsletterRegistration from '../components/input/newsletter-registration';
import Head from 'next/head';

export default function HomePage({ items }) {
  const [events, setEvents] = useState(items);
  const router = useRouter();
  const { data } = useFeaturedEvents(process.env.NEXT_PUBLIC_DB_URL);

  const updatedEvents = useMemo(() => {
    data
  }, [data]);

  useEffect(() => {
    if (updatedEvents) {
      setEvents(updatedEvents);
    }
  }, [updatedEvents])

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <NewsletterRegistration />
      <EventList items={events} />
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

  const featuredEvents = events.filter((event) => event.isFeatured) || null;

  return {
    props: {
      items: featuredEvents,
    },
    revalidate: 1800,
  }
}
