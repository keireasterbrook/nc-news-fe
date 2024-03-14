import './Topics.css'
import { useState, useEffect } from 'react';
import newsApi from '../utils/newsAPI';
import {useParams, useNavigate, Link } from 'react-router-dom';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}



const Topics = () => {
    const params = useParams();
    const topic = params.topic
    const navigate = useNavigate()

    const [topicArticles, setTopicArticles] = useState([])
    
    useEffect(() => {
        newsApi.get(`/articles?topic=${topic}`)
        .then((response) => {
            const data = response.data.article
            if(data.length === 0){
                navigate('*')
            }
            else {setTopicArticles(data)}
        })
    }, [navigate])


    return (
        <>
        <h1 className='topicTitle'>{topic}</h1>
        <Link to='/'><button>Back to all Articles</button></Link>
        <div className='topicArticlesList'>
        
            {topicArticles.map((article) => {

                return (
                    <div key={article.article_id} className={`topicArticlesCard`}>
                        <img src={article.article_img_url} alt="Article image" className='topicArticlesImg'/>
                        <div className='topicArticlesDetails'>
                        <Link to={`/articles/${article.article_id}`} className='topicArticlesTitle'>{article.title}</Link>
                            <p className='topicArticlesTime'>{formatDate(article.created_at)}</p>
                        </div>
                    </div>
                )
            })}
            

        </div>
        </>
    )

}

export default Topics