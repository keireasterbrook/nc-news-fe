import './Articles.css'
import newsApi from '../utils/newsAPI';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

const Articles = ({ articles, setArticles }) => {

    useEffect(() => {
        newsApi.get('/articles')
        .then((response) => {
            const data = response.data.article
            setArticles(data)
            
        })
    }, [])


    return (
        <>
        <h1 className='title'>Articles</h1>
        <div className='articlesList'>
            {articles.map((article) => {
                return (
                    <div key={article.article_id} className='articlesCard'>
                        <img src={article.article_img_url} alt="article image" className='articlesImg'/>
                        <div className='articlesDetails'>
                        <Link to={`/articles/${article.article_id}`} className='articlesTitle'>{article.title}</Link>
                            <p className='articlesTime'>{formatDate(article.created_at)}</p>
                        </div>
                    </div>
                )
            })}
            

        </div>
        </>
    )

}

export default Articles;