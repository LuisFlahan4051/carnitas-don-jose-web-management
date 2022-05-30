import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'
import Home from './Home/Home'
import { Schema, model, connect, connection} from 'mongoose';


// 1. Create an interface representing a document in MongoDB.
interface IUser {
  username: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);


(async () => await connect('mongodb://1270.0.1:27017/test').then(err => console.log("Connected")))()

// async function run() {
//     // 4. Connect to MongoDB
//   await connect('mongodb://1270.0.1:27017/test');

//   const user = new User({
//     name: 'Luis'
//   });
//   await user.save();

//   console.log(user); // 'bill@initech.com'
// }




function Main() {




  
  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(false)

  /* -------------- GET LOGIN  --------------*/

  var listOfExistentUsers: string[] = ['Luis', 'Marco', 'Ana', 'Kriss', 'Carlos', 'Angel', 'Dany'] 
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })
  useEffect(() => { if (logUser.username) validateUserData() }, [logUser.username])
  function validateUserData() { 


    //run();

    
    
    console.log(logUser)
    setCurrentUser({id:1, username: logUser.username, password: logUser.password})
    // To Do
  }








  /* -------------- USER LOGED -------------- */
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    username: "",
    password: ""
  })
  
  /* -------------- RENDER --------------*/
  return (
    <div className="Main">
      
      <Home darkTheme={darkTheme}/>

      <div className={darkTheme ? 'display_login-dark':  'display_login'} style={currentUser.id ? { display: 'none'} : {}}>
        < Login
          setLogUser={setLogUser}
          listOfExistentUsers={listOfExistentUsers}
          darkTheme={darkTheme}
        />
      </div>

      

    </div>
  );
}

export default Main;
