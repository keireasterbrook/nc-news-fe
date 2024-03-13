import './Topics.css'
import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import newsApi from '../utils/newsAPI';
import { Link } from 'react-router-dom';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}


const Topics = () => {
    const params = useParams();
    const topic = params.topic

    const [allArticles, setAllArticles] = useState([])
    
    useEffect(() => {
        newsApi.get('/articles')
        .then((response) => {
            const data = response.data.article
            setAllArticles(data)
            
        })
    }, [])

    const topicArticles = []

    {allArticles.map((article) => {
        if(article.topic === topic){
        return (
            topicArticles.push(article)
        )
        }
    })}  

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