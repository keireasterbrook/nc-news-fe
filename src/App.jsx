import './App.css'
import { BrowserRouter, Routes, Route }  from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Article from './components/Article/Article'
import Comments from './components/Comments/Comments'
import Topics from './components/Topics/Topics'


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/articles/:article_id' element={<Article />}></Route>
          <Route path='/articles/:article_id/comments' element={<Comments />}></Route>
          <Route path='/topics/:topic' element={<Topics />}></Route>

        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
