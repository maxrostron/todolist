import { mainRender, sideRender } from './modules/DOM/mainPage'

let render = (function () {
    mainRender();
    sideRender();
})();

