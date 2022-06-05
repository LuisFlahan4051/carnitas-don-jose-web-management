import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'
import Home from './Home/Home'
import Loader from './Loader/Loader'
import { gql, useQuery } from '@apollo/client'

// TYPES needed for Apollo query
interface User {
  id: string
  name: string
  username: string
  password: string
}

interface UserData {
  users: User[]
}


//APOLLO QUERYS
const DB_USERS_LOGIN = gql`query users{users{id, username}}`




function Main(props: { URIGRAPHQL: string}) {
  
  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(true)

  /* -------------- GET LOGIN  --------------*/
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })

  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    password: ""
  })
  
  useEffect(() => { if (logUser.username) {
    let query = `{
      userByUsername(username: "${logUser.username}"){
        id,
        password, 
        username,
        name
      }
    }`
    fetch(props.URIGRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    }).then(response => response.json())
      .then(data => {
        if (data.data.userByUsername.username === logUser.username) {
          setCurrentUser({
            id: data.data.userByUsername.id,
            username: data.data.userByUsername.username,
            password: data.data.userByUsername.password
          })
          console.log("Usuario " + data.data.userByUsername.id + " verificado!")
          console.log(data.data.userByUsername.username)
        }  
      })
  }}, [logUser.username])

  var queryArrayUsers = useQuery<UserData>(DB_USERS_LOGIN)
 
  var listOfExistentUsers: string[] = []
  queryArrayUsers.data?.users.map((User: any) => {
    listOfExistentUsers.push(User.username)
  })


  /* -------------- Loader Functions -------------- */
  const [displayLoader, setDisplayLoader] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setDisplayLoader({ display: 'none' })
    }, 800)
  }, []);

  /* -------------- RENDER --------------*/
  return (
    <div className="Main">
      
      <Home 
      darkTheme={darkTheme}
      currentUser = {currentUser}
      />

      <div className={darkTheme ? 'display_login-dark':  'display_login'} style={currentUser.id ? { display: 'none'} : {}}>
        < Login
          setLogUser={setLogUser}
          listOfExistentUsers={listOfExistentUsers}
          darkTheme={darkTheme}
        />
      </div>


      <div style={displayLoader} className={darkTheme ? 'display_loader-dark' : 'display_loader'}>
        <Loader />
      </div>      

    </div>
  );
}

export default Main;
