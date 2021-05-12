import { pageRender, sideRender } from './modules/DOM/mainPage'

let render = (function () {
    pageRender();
    sideRender();
})();

