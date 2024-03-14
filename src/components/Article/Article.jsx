import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';
import newsApi from '../utils/newsAPI'; 
import Loading from '../Loading/Loading';
import Comments from '../Comments/Comments';


function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Article = () => {
    const params = useParams();
    const articleId = params.article_id
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        newsApi.get(`/articles/${articleId}`)
        .then(response => {
            const data = response.data.article;
            setArticle(data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            alert('Article does not exist')
        })
    }, [articleId]);

    const increaseVotes = (articleId) => {
        const increase = {inc_votes: 1}
        newsApi.patch(`/articles/${articleId}`, increase)
        .then((response) => {
            const data = response.data.article;
            setArticle(data)
        })
        .catch((error) => {console.log(error)})
    }

    const decreaseVotes = (articleId) => {
        const decrease = {inc_votes: - 1}
        newsApi.patch(`/articles/${articleId}`, decrease)
        .then((response) => {
            const data = response.data.article;
            setArticle(data)
        })
        .catch((error) => {console.log(error)})
    }


    if(isLoading){
        return <Loading />
    }

    return (
        <>
        <div className='article'>
            <h1 className='articleTitle'>{article.title}</h1>
            <img src={article.article_img_url} alt="article image" className='articleImg' />
            <p className='articleAuthor'>Author: {article.author}</p>
            <p className='articleBody'>{article.body}</p>
            <p className='articleTopic'>Topic: {article.topic}</p>
            <p className='articleVotes'>Votes: {article.votes} 
            <button className='voteBtn' onClick={() => {increaseVotes(article.article_id)}}>👍</button>
            <button className='voteBtn' onClick={() => {decreaseVotes(article.article_id)}}>👎</button>
            </p>
            <p className='articleTime'>Date Posted: {formatDate(article.created_at)}</p>
        </div>
        <div>
            <Comments articleId={articleId} />
        </div>
        </>
        
    );
}

export default Article;
