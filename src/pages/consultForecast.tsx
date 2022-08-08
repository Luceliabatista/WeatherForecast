import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ConsultForecast() {
  const navigate = useNavigate();
  const [searchedCity, setSearchedCity] = useState("");
  const [sugestionCity, setSugestionCity] = useState([]);
  const [isCelsiusSelected, setIsCelsiusSelected] = useState(true);
  const [lang, setLang] = useState("pt_br");

  var language = "";
  var search = "";
  var searchPlaceholder = "";
  var languageSelection = "";

  async function handleSubmit(event: any) {
    event.preventDefault();
    navigate("/currentweather", {
      state: { searchedCity, unit: isCelsiusSelected, lang },
    });
  }

  useEffect(() => {
    async function optionsList() {
      const options = await fetch(`http://localhost:3333/?q=${searchedCity}`);
      const list = await options.json();
      setSugestionCity(list);
    }
    optionsList();
  }, [searchedCity]);

  if (lang === "pt_br") {
    language = "Português";
    search = "Como está o tempo hoje?";
    searchPlaceholder = "Como está o tempo hoje?";
    languageSelection = "Idioma selecionado: ";
  } else if (lang === "es") {
    language = "Español";
    search = "Como está el tiempo hoy?";
    searchPlaceholder = "Como está el tiempo hoy?";
    languageSelection = "Idioma seleccionado: ";
  } else {
    language = "English";
    search = "How is the weather today?";
    searchPlaceholder = "How is the weather today?";
    languageSelection = "Selected language: ";
  }

  return (
    <div>
      <div className="grau">
        ºF{" "}
        <button onClick={() => setIsCelsiusSelected(!isCelsiusSelected)}>
          {isCelsiusSelected ? (
            <img src="../assets/Celsius.png" alt="" />
          ) : (
            <img src="../assets/Fahrenheit.png" alt="" />
          )}{" "}
        </button>
        ºC
      </div>
      <h1>{search}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className={sugestionCity.length > 0 ? "" : "noContent"}
          value={searchedCity}
          onChange={(event) => setSearchedCity(event.target.value)}
        />
        <div className="box">
          {sugestionCity.map((city) => (
            <div
              className="options"
              onClick={() => {
                setSearchedCity(city);
                setSugestionCity([]);
              }}
              key={city}
            >
              {city}
            </div>
          ))}
        </div>
      </form>

      <div className="language">
        <button onClick={() => setLang("pt_br")}>
          <img src="../assets/brasil.png" alt="Português" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setLang("en");
          }}
        >
          <img src="../assets/EUA.png" alt="English" />
        </button>
        <button onClick={() => setLang("es")}>
          <img src="../assets/spain.png" alt="Espanhol" />
        </button>
        <p>
          {languageSelection} {language}
        </p>
      </div>
    </div>
  );
}
