import polyglotI18nProvider from 'ra-i18n-polyglot';
import ua from 'ra-language-ukrainian';
// import he  from 'ra-language-hebrew-il';

export const i18nProvider = polyglotI18nProvider(() => ua,'ua')
// export const i18nProvider = polyglotI18nProvider(() => he,'he')