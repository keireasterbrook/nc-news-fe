import './Users.css'
import newsApi from '../utils/newsAPI'; 
import { useEffect, useState } from 'react';

const Users = () => {
const [users, setUsers] = useState([])

    useEffect(() => {
        newsApi.get('users')
        .then((response) => {
            const data = response.data.users
            setUsers(data)
        })
    }, [])

 return (
    <>
    <h1 className='usersTitle'>Users</h1>
    <div className='users'>
        {users.map((user, index) => {
            return(
            <div className='userCard' key={index} >
            <img src={user.avatar_url} alt="user avatar" className='userAvatar'/>
            <p className='usersName'>Name: {user.name}</p>
            <p className='usersUsername'>Username: {user.username}</p>
            </div>
        )
        })}
        
        
        </div></>
 )
}

export default Users;