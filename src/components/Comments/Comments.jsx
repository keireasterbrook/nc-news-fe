import './Comments.css'
import { useParams } from 'react-router-dom';
import newsApi from '../utils/newsAPI'; 
import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Comments = () => {
    const params = useParams();
    const articleId = params.article_id
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        newsApi.get(`./articles/${articleId}/comments`)
        .then((response) => {
            const data = response.data.comments
            setComments(data)
            setIsLoading(false)
        })
    }, [articleId])

    if(isLoading){
        return <Loading />
    }

    return (
        <>
        <h1 className='commentsTitle'>Comments</h1>
        <div className='comment'>
            {comments.map((comment) => {
                return(
                <div key={comment.comment_id} className='commentCard'> 
                    <p className='commentAuthor'>User: {comment.author}</p>
                    <p className='commentBody'>{comment.body}</p>
                    <p className='commentVotes'>Votes: {comment.votes}</p>
                    <p className='commentDate'>Date Posted: {formatDate(comment.created_at)}</p> 
                </div>
                )
            })}

        </div>
        </>
    )
}

export default Comments;