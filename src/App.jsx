import './App.css'
import { BrowserRouter, Routes, Route }  from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Articles from './components/Articles/Articles'
import Article from './components/Article/Article'
import { useState } from 'react'

function App() {
  const [articles, setArticles] = useState([])


  return (
    <>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/articles' element={<Articles articles={articles} setArticles={setArticles}/>}></Route>
          <Route path='/articles/:article_id' element={<Article />}></Route>

        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
