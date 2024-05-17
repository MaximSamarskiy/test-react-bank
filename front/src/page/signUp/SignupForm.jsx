
return (
    <div className="page page--background">
      <header>
        <BackButton />
      </header>

      <form className="page__section" onSubmit={handleSubmit}>
        <h1 className="page__title">Реєстрація</h1>

        <div className="form">
          <div className="form__item">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ваш e-mail"
              className="field"
            />
            {/* Додайте решту полів форми тут */}
          </div>
        </div>

        <button type="submit" className="button button--disabled">
          Зареєструватися
        </button>

        <span className="alert alert--disabled">Увага, помилка!</span>

        <span className="link__prefix">
          Маєте акаунт? <Link to="/recovery" className="link">Увійти</Link>
        </span>
      </form>
    </div>
  );
