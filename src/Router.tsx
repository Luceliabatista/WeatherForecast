import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConsultForecast } from "../../weather_forecast/src/pages/consultForecast";
import { CurrentWeather } from "../../weather_forecast/src/pages/currentWeather";
import { FutureClimate } from "../../weather_forecast/src/pages/futureClimate";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ConsultForecast />} />
      <Route path="/currentweather" element={<CurrentWeather />} />
      <Route path="/currentweather/futureclimate" element={<FutureClimate />} />
    </Routes>
  );
}
