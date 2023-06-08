import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../store/notification-context';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;
  const { showNotification } = useContext(NotificationContext)

  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: 'Posting a comment...',
      message: `Adding a comment for the event ${eventId}.`,
      status: 'pending',
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
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
          message: 'Successfully added a comment!',
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

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);

      fetch(`/api/comments/${eventId}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          res.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!')
          })
        })
        .then(data => setComments(data.comments))
        .catch((error) => {
          showNotification({
            title: 'Error',
            message: error.message || 'Something went wrong!',
            status: 'error',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [showComments, eventId])

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} isLoading={isLoading} />}
    </section>
  );
}

export default Comments;