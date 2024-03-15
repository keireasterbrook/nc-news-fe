import './Users.css'
import newsApi from '../utils/newsAPI'; 
import { useEffect, useState, createContext } from 'react';
import Loading from '../Loading/Loading';

export const UserContext = createContext()

const Users = ({setCurrUser}) => {
const [users, setUsers] = useState([])
const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        newsApi.get('users')
        .then((response) => {
            const data = response.data.users
            setUsers(data)
            setIsLoading(false)
        })
    }, [])


 if(isLoading){
        return <Loading />
    }
    
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
            <button className='userBtn' onClick={() => {setCurrUser(user.username) } }>Select User</button>
            </div>
        )
        })}
        </div>

        
        </>
 )
}


export default Users;