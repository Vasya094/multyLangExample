import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import cookies from "js-cookie";

const languages = [
  { code: "ar", name: "العربية", country_code: "sa", dir: "rtl" },
  { code: "en", name: "English", country_code: "gb" },
  { code: "ru", name: "Русский", country_code: "ru" },
];

function App() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lg) => lg.code === currentLanguageCode
  );

  const { t } = useTranslation();
  const releaseDate = new Date("2021-04-23");
  const timeDifference = new Date() - releaseDate;
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title")
  }, [currentLanguage, t]);
  return (
    <div className="container">
      <Dropdown className="d-flex justify-content-end mt-3">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu as="ul">
          <Dropdown.Item as='li'><span>{t("language")}</span></Dropdown.Item>
          {languages.map(({ code, name, country_code }) => (
            <Dropdown.Item
              as="button"
              key={country_code}
              onClick={() => i18n.changeLanguage( code )}
              disabled={code === currentLanguageCode}
            >
              <span
                className={`flag-icon flag-icon-${ country_code } mx-2`}
                style={{opacity: code === currentLanguageCode ? 0.5 : 1}}
              ></span>
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className="d-flex flex-column align-items-start">
        <h1 className="font-weight-normal mb-3">{t("welcome_message")}</h1>
        <p>{t("days_since_release", { number_of_days })}</p>
      </div>
    </div>
  );
}

export default App;
