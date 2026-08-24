/** Chave usada para guardar a preferência de tema no navegador. */
export const THEME_STORAGE_KEY = 'nexallog-theme';

export type Theme = 'light' | 'dark';

/**
 * Script aplicado antes da primeira pintura. O tema claro é o padrão do site:
 * o escuro só entra quando o usuário escolhe e a preferência fica guardada.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;
