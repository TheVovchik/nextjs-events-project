import { useRouter } from 'next/router';
import { useFilteredEvents } from '../../api/api';
import EventList from '../../components/events/EventList';
import React, { useEffect, useMemo, useState } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';

const pageHeadData = (filtredYear, filtredMonth) => (
  <Head>
    <title>{`Events for ${filtredYear}/${filtredMonth}`}</title>
    <meta name="description" content={`All events for ${filtredYear}/${filtredMonth}`} />
  </Head>
);

export default function SlugPage({ initialEvents }) {
  const [events, setEvents] = useState(initialEvents);
  const router = useRouter();
  const [year, month] = router.query.slug;
  const filtredYear = Number(year);
  const filtredMonth = Number(month);

  const { data } = useFilteredEvents({
    year: filtredYear,
    month: filtredMonth,
  }, process.env.NEXT_PUBLIC_DB_URL);

  const updatedEvents = useMemo(() => {
    data
  }, [data]);

  useEffect(() => {
    if (updatedEvents) {
      setEvents(updatedEvents);
    }
  }, [updatedEvents])

  if (!router.query.slug) {
    return (
      <>
        {pageHeadData(filtredYear, filtredMonth)}
        <p>Loading...</p>
      </>
    );
  }

  if (
    isNaN(filtredYear)
      || isNaN(filtredMonth)
      || filtredYear > 2030
      || filtredYear < 2021
      || filtredMonth < 1
      || filtredMonth > 12
  ) {
    return (
      <>
        {pageHeadData(filtredYear, filtredMonth)}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
      </>
    )
  }

  if (!events || events.length === 0) {
    return (
      <>
        {pageHeadData(filtredYear, filtredMonth)}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">
            Show All Events
          </Button>
        </div>
      </>
    )
  }

  const date = new Date(filtredYear, filtredMonth - 1);

  return (
    <>
      {pageHeadData(filtredYear, filtredMonth)}
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  )
}

export async function getServerSideProps(context) {
  const [year, month] = context.params.slug;

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

  const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1;
    });
  
  return {
    props: {
      initialEvents: filteredEvents,
    }
  }
}
