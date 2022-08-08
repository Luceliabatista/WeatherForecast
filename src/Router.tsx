import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConsultForecast } from "./pages/consultForecast";
import { CurrentWeather } from "./pages/currentWeather";
import { FutureClimate } from "./pages/futureClimate";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ConsultForecast />} />
      <Route path="/currentweather" element={<CurrentWeather />} />
      <Route path="/currentweather/futureclimate" element={<FutureClimate />} />
    </Routes>
  );
}
