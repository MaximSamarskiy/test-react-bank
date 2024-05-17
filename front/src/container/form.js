export class Form {
  FIELD_NAME = {};
  FIELD_ERROR = {};

  value = {};
  error = {};

  change = (name, value) => {
    const error = validate(name, value);
    value[name] = value;

    if (error) {
      setError(name, error);
      error[name] = error;
    } else {
      setError(name, null);
      delete error[name];
    }
  };
  setError = (name, error) => {
    const span = document.querySelector(`.form__error[name="${name}"]`);
    const field = document.querySelector(`.validation[name="${name}"]`);
    if (span) {
      span.classList.toggle("form__error--active", Boolean(error));
      span.innerText = error || "";
    }
    if (field) {
      field.classList.toggle("validation--active", Boolean(error));
    }
  };

  setAlert = (status, text) => {
    const el = document.querySelector(`.alert`);

    if (status === "progress") {
      el.className = "alert alert--progress";
    } else if (status === "success") {
      el.className = "alert alert--success";
    } else if (status === "error") {
      el.className = "alert alert--error";
    } else {
      el.className = "alert alert--disabled";
    }

    if (text) el.innerText = text;
  };
}
