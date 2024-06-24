import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationBG from './bg/translation.json';

// Language translation files
const resources = {
    en: {
        translation: translationEN
    },
    bg: {
        translation: translationBG
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'bg', // default language
        fallbackLng: 'bg',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
