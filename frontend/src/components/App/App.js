import React from "react";
import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  withRouter,
  useHistory,
  Redirect,
} from "react-router-dom";

import {
  CurrentUserContext
} from "../../contexts/CurrentUserContext";



import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "./../Header/Header";

import Footer from "./../Footer/Footer";
import Main from "./../Main/Main";


import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup";
import ImagePopup from "../ImagePopup/ImagePopup";
import api from "../../utils/api";
import * as auth from "../../utils/auth";

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);


  const [currentUser, setCurrentUser] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
  });

  const [infotooltipMessage, setInfotooltipMessage] = useState("");
  const [infotooltipStatus, setInfotooltipStatus] = useState("");
  const [isInfotooltipOpened, setIsInfotooltipOpened] = useState(false);

  const history = useHistory();

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsCardPopupOpen(false);

  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (item) => {
    setIsCardPopupOpen(true);
    setSelectedCard(item);
  };

  const handleUpdateUser = (userData) => {
    api
      .updateUserInfo(userData.name, userData.about)
      .then(() => {
        closeAllPopups();
        getUser();
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .createNewPlace(name, link)
      .then((newCard) => {

        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const likeMethod = `${isLiked ? "DELETE" : "PUT"}`;

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .likeCard(card._id, likeMethod)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));

        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteMyPlace(card._id)
      .then(() => {


        const newCards = cards.filter((i) => {

          return i._id !== card._id;
        });
        setCards(newCards);
      })
      .catch((err) => {
        alert("Error: " + err);
      });
  }

  function getUser() {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        alert("Error:" + err);
      });
  }

  function checkToken() {
    return new Promise((resolve) => {
      if (localStorage.getItem("jwt")) {
        let jwt = localStorage.getItem("jwt");
        auth.getContent(jwt).then((res) => {
          if (res.email) {
            setLoggedIn(true);
            setUserData({
              email: res.email,
            });
            resolve('Все ок');
          }
        });
      }
    })
  }

  function handleInfotooltipClose() {
    if (infotooltipStatus) {
      setIsInfotooltipOpened(false);
      history.push("/signin");
    }
    setIsInfotooltipOpened(false);
  }

  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then((res) => {
        if (!res || res.status === 400 || res.status === 500 || res.status === 409) {

          setInfotooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
          setInfotooltipStatus(false);
          setIsInfotooltipOpened(true);
          throw new Error("Что-то пошло не так!");
        }
        if (res.ok) {
          setInfotooltipMessage("Вы успешно зарегистрировались!");
          setInfotooltipStatus(true);
          setIsInfotooltipOpened(true);
        }
      })

      .catch((err) => {

        return Promise.reject(err);
      });
  }

  function handleLogin(email, password) {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.status === 400 || res.status === 401) {

          setInfotooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
          setInfotooltipStatus(false);
          setIsInfotooltipOpened(true);
          throw new Error("Ошибка авторизации");
        }

        return res.json();
      })
      .then((res) => {

        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        checkToken().then(() => {
          history.push("/" );
        })

      })
      .catch(() => {
        return Promise.reject("ошибка");
      });
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);

    history.push("/signin");
  }

  useEffect(() => {
    function getCards() {
      api
        .getCards()
        .then((data) => {
          const cards = data.map((item) => {
            return item;
          });
          setCards(cards);
        })
        .catch((err) => {
          alert("Error:" + err);
        });
    }

    //

    checkToken().then(() => {
      getUser();
      getCards();
              }
    );

  }, []);



  useEffect(() => {
    if (loggedIn) {
      checkToken().then(() => {
        history.push("/");
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          location={history.location.pathname}
          linkUrl="signup"
          linkName="Регистрация"
          email={userData.email}
          onSignout={handleSignout}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route exact path="/signup">
            <Register
              onRegister={handleRegister}
              infotooltipMessage={infotooltipMessage}
              infotooltipStatus={infotooltipStatus}
              isInfotooltipOpened={isInfotooltipOpened}
              onInfotooltipClose={handleInfotooltipClose}
            />
          </Route>
          <Route exact path="/signin">
            <Login
              onLogin={handleLogin}
              infotooltipMessage={infotooltipMessage}
              infotooltipStatus={infotooltipStatus}
              isInfotooltipOpened={isInfotooltipOpened}
              onInfotooltipClose={handleInfotooltipClose}
            />
          </Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          <Footer />
        </Switch>

        <ImagePopup
          popupName={"js-popup-place"}
          onClose={closeAllPopups}
          isOpen={isCardPopupOpen}
          card={selectedCard}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);
