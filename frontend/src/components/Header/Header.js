import logo from "../../images/logo-mesto.svg";

function Header({ loggedIn, location, email, onSignout }) {
  return (
    <>
      <header className="header">
        <a href="./">
          <img src={logo} className="logo" alt="Логотип Mesto Russia" />
        </a>
        <div className="navbar">
          {loggedIn && (
            <>
              <p className="navbar__user">{email}</p>
              <a className="navbar__link" href="#" onClick={onSignout}>
                Выйти
              </a>
            </>
          )}

          {location === "/signup" && (
            <>
              <a className="navbar__link" href="/signin">
                Войти
              </a>
            </>
          )}
          {location === "/signin" && (
            <>
              <a className="navbar__link" href="/signup">
                Регистрация
              </a>
            </>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
