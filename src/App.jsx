import './App.css'
import './mediaqueries.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Article from './components/Article/Article'
import Comments from './components/Comments/Comments'
import Topics from './components/Topics/Topics'
import Error from './components/Error/Error'
import Users from './components/Users/Users'
import { UserContext } from './components/Users/Users';
import { useState } from 'react'


function App() {
  const [currUser, setCurrUser] = useState('grumpy19'); 


  return (
    <UserContext.Provider value={{ currUser }}> 
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles/:article_id' element={<Article />} />
          <Route path='/articles/:article_id/comments' element={<Comments />} />
          <Route path='/topics/:topic' element={<Topics />} />
          <Route path="/*" element={<Error />} />
          <Route path="/users" element={<Users setCurrUser={setCurrUser}/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
