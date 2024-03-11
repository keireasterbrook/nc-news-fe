import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Article.css';
import newsApi from '../utils/newsAPI'; 

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Article = () => {
    const params = useParams();
    const articleId = params.article_id
    const [article, setArticle] = useState([]);

    useEffect(() => {
        newsApi.get(`/articles/${articleId}`)
        .then(response => {
            const data = response.data.article;
            setArticle(data)  
        })
    }, [articleId]);


    return (
        <div className='article'>
            <h1 className='articleTitle'>{article.title}</h1>
            <img src={article.article_img_url} alt="article image" className='articleImg' />
            <p className='articleAuthor'>Author: {article.author}</p>
            <p className='articleBody'>{article.body}</p>
            <p className='articleTopic'>Topic: {article.topic}</p>
            <p className='articleVotes'>Votes: {article.votes}</p>
            <p className='articleTime'>Date Posted: {formatDate(article.created_at)}</p>
        </div>
    );
}

export default Article;