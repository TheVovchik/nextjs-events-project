import { useEffect } from 'react';
import classes from './comment-list.module.css';

function CommentList({ comments, isLoading }) {
  useEffect(() => {
    window.scrollTo(0, 10000);
  }, [])

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && comments.length > 0 
        && (<ul className={classes.comments}>
        {comments.map(comment => {
          return (
            <li key={comment._id}>
              <p>{comment.text}</p>
              <div>
                By <address>{comment.name}</address>
              </div>
            </li>
          );
        })}
      </ul>)}
      {!isLoading && comments.length === 0 
        && <p> No comments yet</p>}
    </>
  );
}

export default CommentList;