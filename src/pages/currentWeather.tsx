import { useState, useEffect } from "react";
import { IPrevision } from "../types/IPrevision";
import { IWeatherState } from "../types/IWeatherState";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function CurrentWeather() {
  const location = useLocation();
  const navigate = useNavigate();

  const [prevision, setPrevision] = useState<IPrevision>({} as IPrevision);
  const [isCelsiusSelected, setIsCelsiusSelected] = useState(true);
  const [city, setCity] = useState("");
  const [lang, setLang] = useState("pt_br");

  var language = "";
  var idioma = "";
  var previsionDays = "";

  const IconsCurrentWeatherTable: any = {
    "scattered clouds": (
      <img src="../assets/nuvem_leve.png" alt="Nuvens dispersas"></img>
    ),
    "nuvens dispersas": (
      <img src="../assets/nuvem_leve.png" alt="Nuvens dispersas"></img>
    ),
    "nubes dispersas": (
      <img src="../assets/nuvem_leve.png" alt="Nuvens dispersas"></img>
    ),
    "broken clouds": (
      <img src="../assets/nuvem_leve.png" alt="Nuvens quebradas"></img>
    ),
    "nuvens quebradas": (
      <img src="../assets/nuvem_leve.png" alt="Nuvens quebradas"></img>
    ),
    "nubes rotas": (
      <img src="../assets/nuvem_leve.png" alt="Nuvens quebradas"></img>
    ),
    "few clouds": (
      <img src="../assets/nuvem_leve.png" alt="Poucas nuvens"></img>
    ),
    "algumas nuvens": (
      <img src="../assets/nuvem_leve.png" alt="Poucas nuvens"></img>
    ),
    "algo de nubes": (
      <img src="../assets/nuvem_leve.png" alt="Poucas nuvens"></img>
    ),
    "overcast clouds": (
      <img src="../assets/nublado.png" alt="Nuvens nubladas"></img>
    ),
    "nuvens nubladas": (
      <img src="../assets/nublado.png" alt="Nuvens nubladas"></img>
    ),
    "nubes nubladas": (
      <img src="../assets/nublado.png" alt="Nuvens nubladas"></img>
    ),
    "clear sky": <img src="../assets/sol.png" alt="Céu limpo"></img>,
    "céu limpo": <img src="../assets/sol.png" alt="Céu limpo"></img>,
    "cielo limpio": <img src="../assets/sol.png" alt="Céu limpo"></img>,
    "light rain": <img src="../assets/nuvem_leve.png" alt="Chuva leve"></img>,
    "chuva leve": <img src="../assets/nuvem_leve.png" alt="Chuva leve"></img>,
    "lluvia ligera": (
      <img src="../assets/nuvem_leve.png" alt="Chuva leve"></img>
    ),
    "heavy rain": (
      <img src="../assets/nuvem_pesada.png" alt="Chuva pesada"></img>
    ),
    "chuva pesada": (
      <img src="../assets/nuvem_pesada.png" alt="Chuva pesada"></img>
    ),
    "lluvia Pesada": (
      <img src="../assets/nuvem_pesada.png" alt="Chuva pesada"></img>
    ),
    mist: <img src="../assets/nublado.png" alt="Névoa"></img>,
    névoa: <img src="../assets/nublado.png" alt="Névoa"></img>,
    neblina: <img src="../assets/nublado.png" alt="Névoa"></img>,
  };

  useEffect(() => {
    const { searchedCity, unit, lang } = location.state as IWeatherState;
    setCity(searchedCity);
    setIsCelsiusSelected(unit);
    setLang(lang);
  }, [location]);

  useEffect(() => {
    async function WeatherCity() {
      const unit = isCelsiusSelected ? "metric" : "imperial";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=2d5fd2f87dc1242c93cb872e9b6a6930&units=${unit}&q=${encodeURI(
          city
        )}&lang=${lang}`
      );
      const data = await response.json();
      setPrevision(data);
      if (!data?.coord) {
        navigate("/");
      }
    }

    if (city) {
      WeatherCity();
    }
  }, [isCelsiusSelected, city, navigate, lang]);

  if (lang === "pt_br") {
    language = "Português";
    previsionDays = "Ver a previsão para os proximos 5 dias";

    idioma = "Idioma selecionado: ";
  } else if (lang === "es") {
    language = "Español";
    idioma = "Idioma seleccionado: ";
    previsionDays = "Ver el pronóstico para los próximos 5 días";
  } else {
    language = "English";
    idioma = "Selected language: ";
    previsionDays = "See the forecast for the next 5 days";
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

      {prevision?.main && (
        <>
          <Link to={"/"}>
            <img
              className="vector"
              src="../assets/Vector.png"
              alt="Voltar"
            ></img>
          </Link>
          <h1 className="uppercase">{prevision.name}</h1>
          <p className="text-center">
            {prevision.weather?.length > 0
              ? prevision.weather[0]?.description
              : " (Tradução ainda não foi cadastrada)"}
          </p>
          <div>
            {prevision.weather?.length > 0 ? (
              <p className="temper">
                {Math.floor(prevision.main?.temp)}º{" "}
                {IconsCurrentWeatherTable[prevision.weather[0]?.description]}
              </p>
            ) : (
              prevision.weather[0]?.description + " "
            )}
          </div>
          <div className="variacao">
            <strong>MAX:</strong> {Math.floor(prevision.main?.temp_max)}º{" "}
            <strong>MIN:</strong> {Math.floor(prevision.main?.temp_min)}º
          </div>
          <Link
            to="/currentweather/futureClimate"
            state={{ prevision, unit: isCelsiusSelected, lang }}
          >
            {previsionDays}
          </Link>
        </>
      )}
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
          {idioma} {language}
        </p>
      </div>
    </div>
  );
}
