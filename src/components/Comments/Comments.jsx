import './Comments.css';
import { useParams } from 'react-router-dom';
import newsApi from '../utils/newsAPI'; 
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { useContext } from 'react';
import { UserContext } from '../Users/Users'

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Comments = () => {
    const params = useParams();
    const articleId = params.article_id;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const { currUser } = useContext(UserContext)

    useEffect(() => {
        newsApi.get(`./articles/${articleId}/comments`)
        .then((response) => {
            const data = response.data.comments;
            setComments(data);
            setIsLoading(false);
        });
    }, [comments]);

    const handleComment = (event) => {
        event.preventDefault()
        const comment = { username: currUser, body: newComment };
            
        newsApi.post(`articles/${articleId}/comments`, comment)
        .then((response) => {
            const data = response.data.comment;
            setComments([...comments, data]); 
            setNewComment('');
        })
        .catch((error) => {
            console.log(error)
        })
    };

    const handleDelete = (commentId, user) => {
        if(currUser === user){
        newsApi.delete(`comments/${commentId}`)
        .then(() => {
            confirm('Comment deleted');
        })
        .catch((error) => {console.log(error)})
    } 
    }

    const commentUpVote = (commentId) => {
        const increase = {inc_votes: 1}
        newsApi.patch(`/comments/${commentId}`, increase)
        .then((response) => {
            const data = response.data.article;
            setComments(data)
         })
        .catch((error) => {console.log(error)})
    }

    const commentDownVote = (commentId) => {
        const decrease = {inc_votes: -1}
        newsApi.patch(`/comments/${commentId}`, decrease)
        .then((response) => {
            const data = response.data.article;
            setComments(data)
         })
        .catch((error) => {console.log(error)})
    }

    if(isLoading){
        return <Loading />;
    }

  

    return (
    <>
        <h1 className='commentsTitle'>Comments</h1>
        <div className='comment'>
           
        <form onSubmit={handleComment}>
            <textarea 
                name="addComment" 
                id="addComment" 
                cols="70" 
                rows="10" 
                value={newComment}
                placeholder='Your Comment Here...'
                onChange={(comment) => {setNewComment(comment.target.value)}}
                required
            ></textarea>
            <input type="Submit" className='submitBtn'/>
        </form>
        {comments && comments.map((comment) => {
            return(
                <div key={comment.comment_id} className='commentCard'> 
                <p className='commentAuthor'><strong>User:</strong> {comment.author}</p>
                <p className='commentBody'>{comment.body}</p>
                <p className='commentVotes'><strong>Votes:</strong> {comment.votes}</p>
                <p className='commentDate'><strong>Date Posted:</strong> {formatDate(comment.created_at)}</p> 
                <button className='voteBtn' onClick={() => {commentUpVote(comment.comment_id)}}>👍</button>
                <button className='voteBtn' onClick={() => {commentDownVote(comment.comment_id)}}>👎</button>
                {currUser === comment.author && (
                <button className='delete' onClick={() => handleDelete(comment.comment_id, comment.author) }>Delete</button>
                )}
                </div>
                );
            })}
        </div>
    </>
);

};

export default Comments;
