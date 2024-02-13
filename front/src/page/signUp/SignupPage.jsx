import "./index.scss"
import "./index"
import axios from "axios"
import ArrowImg from "../../image/svg/arrow-back.svg";
import { Link } from "react-router-dom";
import Danger from "../../image/svg/danger.svg"
import { useState,useContext } from 'react';
import Field from "../../component/field/Field";
import ParentComponent from "../../component/field-password/ParentComponent"
import { AuthContext } from '../../context/AuthContext';




function SignupPage() {

  const { dispatch } = useContext(AuthContext);

  const handleSignUp = async () => {
    try {
      // Здесь вы выполняете вашу логику регистрации, например, отправляете запрос на сервер
      // Предположим, что сервер возвращает токен и данные пользователя
      const response = await axios.post('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(/* Ваши данные для регистрации */),
      });

      if (response.ok) {
        const { token, user } = await response.json();

        // Диспетчеризация действия LOGIN для обновления состояния аутентификации
        dispatch({ type: 'LOGIN', payload: { token, user } });

        // Теперь вы вошли в систему и можете перейти на другую страницу или выполнить другие действия
      } else {
        // Обработка ошибок при регистрации
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };










  const [value, setValue] = useState({});

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    
  };

  const handleInputChange = (value) => { console.log(`${value}`);
   }


  return (
    <div className="page page--signup">
      <header className="header">
        <Link to="/" className="arrow--back">
          <img src={ArrowImg} alt="arrow" />
        </Link>
      </header>

      <form className="page_section" onSubmit={handleSubmit}>
        <h1 className="page_title">Sign Up</h1>
        <h3 className="page_description">Choose a registration method</h3>


        <div className="form">
           <div className="form_item">
            <Field 
                name="username" 
                label="Email" 
                type="text" 
                placeholder="Enter username" 
                action={handleInputChange}   
            />
            <div>

                <ParentComponent/>
        
    </div>

    
    <div className="wrapper_signup">
        <span>Already have an account? </span> <Link to="/signin">Sign In</Link>
      </div>
         


        <span name="email" className="form_error">
             Error
         </span>
</div>


          <input
          type="text"
          name="username"
          value={value.username || ''}
          onChange={handleChange}
           />

          <button onClick={handleSignUp} type="submit" className="button button-disabled">
            Continue
          </button>
       

          <span className="alert alert-disabled">
            <img src={Danger} alt="danger" />
            A user with the same name already exists
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
