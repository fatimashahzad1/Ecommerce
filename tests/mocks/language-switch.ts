// Extract UI texts from i18n files
import en from '../../public/locales/en/common.json';
import fr from '../../public/locales/fr/common.json';
import { Language } from '@/types';
export const EN_LOGIN_PAGE = {
  heading: en.login.page.title,
  subtitle: en.login.page.subtitle,
  button: en.login.form.button,
  selector: 'English' as Language,
};
export const FR_LOGIN_PAGE = {
  heading: fr.login.page.title,
  subtitle: fr.login.page.subtitle,
  button: fr.login.form.button,
  selector: 'Français' as Language,
};
