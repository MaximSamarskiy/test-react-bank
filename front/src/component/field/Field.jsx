import "./index.scss"



const Field = ({ name, label, type, placeholder, onChange, value }) => {
  const handleInput = (event) => {
    onChange(event); 
  };

  return (
    <div className="field ">
      <label htmlFor={name} className="field_label ">{label}</label>
      <input 
        onInput={handleInput}  
        type={type} 
        className="field_input validation-active" 
        name={name} 
        placeholder={placeholder} 
        value={value}  
      />
    </div>
  );
};

export default Field;




