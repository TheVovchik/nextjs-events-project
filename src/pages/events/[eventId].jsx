import { useRouter } from 'next/router';
import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { useEventById } from '../../api/api';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';
import Comments from '../../components/input/comments';

export default function EventPage({ initialEvent }) {
  const [event, setEvent] = useState(initialEvent);
  const router = useRouter();

  const { eventId } = router.query;
  const { data } = useEventById(eventId, process.env.NEXT_PUBLIC_DB_URL);

  const updatedEvents = useMemo(() => {
    data
  }, [data]);

  useEffect(() => {
    if (updatedEvents) {
      setEvent(updatedEvents);
    }
  }, [updatedEvents]);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventSummary title={event.title}/>

      <EventLogistics event={event}/>
  
      <EventContent>
        <p>{event.description}</p>
      </EventContent>

      <Comments eventId={event.id} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { eventId } = context.params;

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
  const event = events.find((event) => event.id === eventId) || null;

  return {
    props: {
      initialEvent: event,
    }
  }
}

export async function getStaticPaths() {
  const eventsPaths = await fetch(process.env.NEXT_PUBLIC_DB_URL)
    .then(res => res.json())
    .then(data => {
      return Object.entries(data).map(([key]) => {
        return {
          params: {
            eventId: key,
          }
        }
      })
    });

    return {
      paths: eventsPaths,
      fallback: true,
    }
}