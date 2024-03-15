import './Topics.css'
import { useState, useEffect } from 'react';
import newsApi from '../utils/newsAPI';
import {useParams, useNavigate, Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Topics = () => {
    const params = useParams();
    const topic = params.topic
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [topicArticles, setTopicArticles] = useState([])
    
    useEffect(() => {
        newsApi.get(`/articles?topic=${topic}`)
        .then((response) => {
            const data = response.data.article
            if(data.length === 0){
                navigate('*')
        }
            else {
                setTopicArticles(data)
                setIsLoading(false)
        }
        })
    }, [navigate])

    if(isLoading){
        return <Loading />
    }


    return (
        <>
        <h1 className='topicTitle'>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
        <div className='backBtnContainer'>
        <Link to='/' >
        <button className='backBtn'>Back to all articles</button>
        </Link>
        </div>
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