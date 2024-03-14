import './Home.css'
import newsApi from '../utils/newsAPI';
import { useEffect,useMemo,useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import globe from '../assets/GlobeEarthArt.gif'

function formatDate(createdAtDate) {
    const date = new Date(createdAtDate);
    return date.toLocaleDateString('en-GB');
}

function newArticles(articles) {
    const newTopics = [];

    articles.forEach(article => {
        if (!newTopics.includes(article.topic)) {
            newTopics.push(article.topic);
        }
    });


    return newTopics;
}


const Home = () => {

    const [articles, setArticles] = useState([])
    let [searchParams, setSearchParams] = useSearchParams('sort_by=created_at&order=DESC');
    const allTopics = useMemo(() => newArticles(articles), [articles])

    useEffect(() => {
        newsApi.get(`articles?${searchParams}`)
        .then((response) => {
            const data = response.data.article
            setArticles(data)
            
        })
    }, [searchParams])

    const handleSortChange = (event) => {
        event.preventDefault()
        setSearchParams(`sort_by=${event.target.value}`);
    };

    return (
        <>
        <div className='homeTitle'>
        <h1 ><img src={globe} alt="spinning red globe" className='globe'/>Breaking News</h1>
        </div>
        <div className='homeTopicContainer'>
        {allTopics.map((topic) => {
                return (
                    <Link to={`/topics/${topic}`}>
                    <button className='homeTopicBtn' key={topic} >{topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </button>
                    </Link>
                )
            })}
            </div>
            <div className='sortByContainer'>
                <select className='sortBy' onChange={handleSortChange}>
                <option value="created_at&order=DESC">Latest</option>
                <option value="created_at&order=ASC">Oldest</option>
                <option value="comment_count&order=DESC">Highest Comment Count</option>
                <option value="comment_count&order=ASC">Lowest Comment Count</option>
                <option value="votes&order=DESC">Most Votes</option>
                <option value="votes&order=ASC">Least Votes</option>
            </select>
            </div>
           
        <div className='homeArticlesList'>
            {articles.map((article, index) => {
    
                return (
                    <div key={index} className={`homeArticlesCard`}>
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