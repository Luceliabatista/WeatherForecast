import { useState, useEffect } from "react";
import { IPrevision } from "../types/IPrevision";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import { IWeatherState } from "../types/IWeatherState";
import { ITranslate } from "../types/ITranslate";

const translates: ITranslate = {
  pt_br: {
    linguagem: "Português",
    idioma: "Idioma selecionado: ",
    five: "Previsão para 5 dias",
  },
  en: {
    linguagem: "English",
    idioma: "Selected language: ",
    five: "Forecast for 5 days",
  },
  es: {
    linguagem: "Español",
    idioma: "Idioma seleccionado: ",
    five: "Pronóstico para 5 días",
  },
};

export function FutureClimate() {
  const [prevision, setPrevision] = useState<IPrevision>({} as IPrevision);
  const [forecasts, setForecasts] = useState<IPrevision[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [isCelsiusSelected, setIsCelsiusSelected] = useState(true);
  const [lang, setLang] = useState("pt_br");

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
      <img src="../assets/nublado.png" alt="Nuvens quebradas"></img>
    ),
    "muy nuboso": (
      <img src="../assets/nublado.png" alt="Nuvens quebradas"></img>
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
    nublado: <img src="../assets/nublado.png" alt="Nuvens nubladas"></img>,
    nubes: <img src="../assets/nublado.png" alt="nubes"></img>,
    "clear sky": <img src="../assets/sol.png" alt="clear sky"></img>,
    "cielo claro": <img src="../assets/sol.png" alt="cielo claro"></img>,
    "céu limpo": <img src="../assets/sol.png" alt="Céu limpo"></img>,
    "cielo limpio": <img src="../assets/sol.png" alt="Céu limpo"></img>,
    "light rain": <img src="../assets/nuvem_leve.png" alt="light rain"></img>,
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
    const { prevision: data, unit, lang } = location.state as IWeatherState;
    setIsCelsiusSelected(unit);
    setLang(lang);
    setPrevision(data);

    if (!data?.coord) {
      navigate("/");
    }
  }, [location, navigate]);

  useEffect(() => {
    async function forecastDay(lat: number, lon: number) {
      const unit = isCelsiusSelected ? "metric" : "imperial";
      const coordenada = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2d5fd2f87dc1242c93cb872e9b6a6930&lang=${lang}&units=${unit}`
      );

      const data = await coordenada.json();

      setForecasts(
        data.list.filter((day: IPrevision) => day.dt_txt.includes("12:00:00"))
      );
    }

    if (prevision.coord) forecastDay(prevision.coord.lat, prevision.coord.lon);
  }, [prevision, isCelsiusSelected, lang]);

  function formatByLang(date: string) {
    let locale;

    if (lang === "pt_br") {
      locale = ptBR;
    } else if (lang === "es") {
      locale = es;
    } else {
      locale = enUS;
    }

    const weekDay = format(new Date(date), "EEE", {
      locale,
    }).substring(0, 3);
    const dateFormated = format(new Date(date), " dd MMM", {
      locale,
    });
    return [weekDay, dateFormated].join(", ");
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
      <Link to={"/"}>
        <img className="vector" src="../assets/Vector.png" alt="voltar"></img>
      </Link>
      <h1 className="uppercase box3">{prevision.name}</h1>
      <p className="five">{translates[lang]?.five}</p>

      <div>
        {forecasts.map((dayForecast) => {
          return (
            <div className="box2">
              {dayForecast.weather?.length > 0 ? (
                <p className="letter">
                  <b>{formatByLang(dayForecast.dt_txt)}</b>
                  {
                    IconsCurrentWeatherTable[
                      dayForecast.weather[0]?.description
                    ]
                  }
                  {Math.floor(dayForecast.main.temp_min)}º
                  <img src="../assets/Line.png" alt="Line" />
                  {Math.floor(dayForecast.main.temp_max)}º{" "}
                  <span>
                    {dayForecast.weather?.length > 0
                      ? dayForecast.weather[0]?.description
                      : " (Tradução ainda não foi cadastrada)"}
                  </span>
                </p>
              ) : (
                dayForecast.weather[0]?.description + " "
              )}
            </div>
          );
        })}
      </div>

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
          {translates[lang]?.idioma} {translates[lang]?.linguagem}
        </p>
      </div>
    </div>
  );
}
