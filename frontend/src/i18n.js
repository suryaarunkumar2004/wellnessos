import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "home": "Home",
      "services": "Services",
      "doctors": "Doctors",
      "health_tracker": "Health Tracker",
      "blog": "Blog",
      "contact": "Contact",
      "profile": "Profile",
      "settings": "Settings",
      "login": "Login",
      "signup": "Sign Up",
      "welcome": "Welcome to WellnessOS",
      // Add more keys as needed
    }
  },
  es: {
    translation: {
      "home": "Inicio",
      "services": "Servicios",
      "doctors": "Doctores",
      "health_tracker": "Seguimiento de Salud",
      "blog": "Blog",
      "contact": "Contacto",
      "profile": "Perfil",
      "settings": "Configuración",
      "login": "Iniciar Sesión",
      "signup": "Registrarse",
      "welcome": "Bienvenido a WellnessOS",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nLang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
