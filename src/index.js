import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import HttpApi from 'i18next-http-backend';
import App from './App';
import LanguageDetector from "i18next-browser-languagedetector";

import 'bootstrap/dist/js/bootstrap.js';
import 'flag-icon-css/css/flag-icon.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import i18n from "i18next";
import {  initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // passes i18n down to react-i18next
  .use(HttpApi) 
  .init( {
    supportedLngs: ["en", "ru", "ar"],
    fallbackLng: "ru",
    detection: {
      order: [
        "htmlTag",
        "cookie",
        "localStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie"]
    },
    backend: {
      loadPath: '/locations/{{lng}}/translation.json'
    },
    react: {useSuspense: false}
  } );
  
const LoadingMarkUp = () => (
  <div className="py-4 text-center">
    <h2>Loadng...</h2>
    </div>
  )


ReactDOM.render(
  <Suspense fallback={LoadingMarkUp} >
  <React.StrictMode>
    <App />
    </React.StrictMode>
    </Suspense>,
  document.getElementById("root")
);
