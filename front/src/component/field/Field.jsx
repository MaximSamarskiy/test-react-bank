import "./index.scss"




const Field = ({ name, label, type, placeholder, action, value }) => {
  const handleInput = (event) => {
    
    action(event.target.value);
  };

  return (
    <div className="field">
      <label htmlFor={name} className="field_label">{label}</label>
      <input 
        onInput={handleInput}  
        type={type} 
        className="field_input" 
        name={name} 
        placeholder={placeholder} 
        value={value}  
      />
    </div>
  );
};

export default Field;
