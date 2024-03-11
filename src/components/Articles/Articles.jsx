import './Articles.css'
import newsApi from '../utils/newsAPI';
import { useEffect } from 'react';

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
                    <div key={article.article_id} className='articleCard'>
                        <img src={article.article_img_url} alt="article image" className='articleImg'/>
                        <div className='articleDetails'>
                            <h2 className='articleTitle'>{article.title}</h2>
                            <p className='articleTime'>{formatDate(article.created_at)}</p>
                        </div>
                    </div>
                )
            })}
            

        </div>
        </>
    )

}

export default Articles;