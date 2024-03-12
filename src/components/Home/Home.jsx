import './Home.css'
import newsApi from '../utils/newsAPI';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Home = ({ articles, setArticles }) => {

    useEffect(() => {
        newsApi.get('/articles')
        .then((response) => {
            const data = response.data.article
            setArticles(data)
            
        })
    }, [])


    return (
        <>
        <h1 className='homeTitle'>Breaking News</h1>
        <div className='homeArticlesList'>
            {articles.map((article, index) => {
                const isMostRecent = index === 0;
                return (
                    <div key={article.article_id} className={`homeArticlesCard ${isMostRecent ? 'mostRecentArticle' : ''}`}>
                        <img src={article.article_img_url} alt="homeArticle image" className='homeArticlesImg'/>
                        <div className='homeArticlesDetails'>
                        <Link to={`/articles/${article.article_id}`} className='homeArticlesTitle'>{article.title}</Link>
                            <p className='homeArticlesTime'>{formatDate(article.created_at)}</p>
                        </div>
                    </div>
                )
            })}
            

        </div>
        </>
    )

}

export default Home;