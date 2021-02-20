import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function AuthForm({title, children}) {

    return (
<>
        <section>
        <h2 className="form__title form__title_theme_page">{title}</h2>
        <form className="form form_theme_page">
    {children}
        </form>
    </section>
</>
    );

}

export default AuthForm;
