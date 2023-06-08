import { NotificationContext } from '../store/notification-context';
import classes from './newsletter-registration.module.css';
import React, { useRef, useContext } from 'react';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const { showNotification } = useContext(NotificationContext);


  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then(() => {
        showNotification({
          title: 'Success',
          message: 'Successfully registred for newsletter!',
          status: 'success',
        });
      })
      .catch((error) => {
        showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
