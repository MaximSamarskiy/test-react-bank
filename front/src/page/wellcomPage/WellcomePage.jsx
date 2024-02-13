import "./index.scss"
import React from "react"
import { Link } from "react-router-dom";


 function WellcomePage () { return (
    <div className="page page--background">
        <div className="wellcome_section">
       
        <h1 className="page_title_wellcom">Hello!</h1>
        <h3 className="wellcom_description">Wellcom To Bank App</h3>
        
        </div>
       
        <Link to="/signup" className="button_one">
          Sign Up
        </Link>
        <Link to="/signin" className="button_two">
          Sign In
        </Link>
        
    </div>
 )}
   


export default WellcomePage