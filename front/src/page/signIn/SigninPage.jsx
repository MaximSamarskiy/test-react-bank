import "./index.scss"
import ArrowImg from "../../image/svg/arrow-back.svg";
import { Link } from "react-router-dom";




function SigninPage(){
 return (
    <div className="page page--signin">
        <header className="header">
            <Link to="/" className="arrow--back">
                <img src={ArrowImg} alt="arrow" />
            </Link>
        </header>

        <form className="page_section">
           <h1 className="page_title">Sign In</h1>
           <h3 className="page_description">Choose a registration method</h3>


            <div className="form">
                <div className="form_item">
                    Test
                    <span name="email" className="form_error">Error</span>
                </div>

                <button className="button" type="button">Continue</button>
                
            </div>

        </form>
       
    </div>
 )
}
export default SigninPage