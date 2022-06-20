import LoginForm from "../../components/Login/Login"
import "./Login.scss"

export default function Login(props:{ 
        setLogUser: Function, 
        listOfExistentUsers: React.ReactNode[], 
        darkTheme: boolean,
        //displayHandler: boolean
    }) {

    return(
        <div 
        className={props.darkTheme ? 'display_login-dark setMainFrame centerOnDisplay' : 'display_login setMainFrame centerOnDisplay'} 
        //style={props.displayHandler ? { display: 'none' } : {}}>
        >

            <LoginForm
                setLogUser={props.setLogUser}
                listOfExistentUsers={props.listOfExistentUsers}
                darkTheme={props.darkTheme}
            />

        </div>
    )
}