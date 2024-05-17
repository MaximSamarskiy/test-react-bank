import BackButton from "../../component/back_button/back_button";
import FieldPassword from "../../component/field-password/FieldPassword";
import Field from "../../component/field/Field";
import "./index.scss";
import React, { useState } from 'react';




function SigninPage() {

  const validate = (name,value) => {
    return true
  }
  const submit=()=>{
    console.log(this.value)
  }

  const change =(name,value) =>{
    console.log(this.value)
    if(this.validate(name,value)) this.value[name] = value
  }

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
   
      
      <div className="page">
        <header><BackButton/></header>
        
        <form className="page_section">
          <h1 className="page_title">Sign In</h1>
           <div className="page_description">Select login method</div>
          <div className="form">
            <div className="form_item">
            <Field
              className="form_error"
              name="email"
              label="Email"
              type="text"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
              <FieldPassword 
              className="form_error"
              name="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(newPassword) => setFormData({ ...formData, password: newPassword })}
            />

              <span className="form_error">Помилка</span>
            </div>
          </div>

          <button className="button button-disabled " type="sybmit">Continue</button>

         
        </form>
      </div>
    
  );
}

export default SigninPage;
