import { Logout } from "../Logout"
import { Quiz } from "../Quiz"


export const Welcome = () => {

    return(
        <div className="quiz-bg">
            <div className="container">
                <Logout/>
                <Quiz/>
            </div>
        </div>
    )
}