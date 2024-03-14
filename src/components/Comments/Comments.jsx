import './Comments.css';
import { useParams } from 'react-router-dom';
import newsApi from '../utils/newsAPI'; 
import { useEffect, useState, useMemo } from 'react';
import Loading from '../Loading/Loading';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

function allUsers(comments) {
    const newUsers = []
    comments.map((comment) =>{
    
        if(!newUsers.includes(comment.author)){
             newUsers.push(comment.author)
        } 
        
    })

    return newUsers;

}

const Comments = () => {
    const params = useParams();
    const articleId = params.article_id;
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const users = useMemo(() => allUsers(comments), [comments])

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

        if (!selectedUser) {
            alert('Please select a user');
            return;
        }
   
            const comment = { username: selectedUser, body: newComment };
            
            newsApi.post(`articles/${articleId}/comments`, comment)
            .then((response) => {
    
                const data = response.data.comment;
                setComments([...comments, data]); 
                setSelectedUser('');
                setNewComment('');
            })
            .catch((error) => {
                console.log(error)
            })

        
    };

    const handleDelete = (commentId, user) => {

        if(selectedUser === user){
        newsApi.delete(`comments/${commentId}`)
        .then(() => {
            confirm('Comment deleted');
        })
        .catch((error) => {console.log(error)})
    } else {
        alert('You cannot delete another users comment')
    }
    }

    if(isLoading){
        return <Loading />;
    }

    

    


return (
    <>
        <h1 className='commentsTitle'>Comments</h1>
        <div className='comment'>
            <select value={selectedUser} onChange={(user) => setSelectedUser(user.target.value)}>
                <option value="select">Select User</option>
                {users.map((user, index) => (
                    <option key={index} value={user}>{user}</option>
                ))}
            </select>
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
                <input type="Submit" />
            </form>
            {comments.map((comment) => {
                return(
                    <div key={comment.comment_id} className='commentCard'> 
                        <p className='commentAuthor'>User: {comment.author}</p>
                        <p className='commentBody'>{comment.body}</p>
                        <p className='commentVotes'>Votes: {comment.votes}</p>
                        <p className='commentDate'>Date Posted: {formatDate(comment.created_at)}</p> 
                        {selectedUser === comment.author && (
                            <button onClick={() => handleDelete(comment.comment_id, comment.author)}>Delete</button>
                        )}
                    </div>
                );
            })}
        </div>
    </>
);

};

export default Comments;
