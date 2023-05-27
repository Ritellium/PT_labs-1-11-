// router.js
// Создаем объект для хранения маршрутов и функций для их отображения
const routes = {};

// Функция для регистрации нового маршрута
const registerRoute = (path, view) => {
routes[path] = view;
};

// Функция для получения текущего маршрута из хеша местоположения
const getRoute = () => {
return location.hash.slice(1) || "home";
};

// Функция для отображения активного маршрута в контейнере #app
const renderRoute = () => {
const route = getRoute();
const view = routes[route];
if (view) {
const app = document.getElementById("app");
app.innerHTML = view();
}
};

// Добавляем обработчик события hashchange для обновления представления при изменении хеша
window.addEventListener("hashchange", renderRoute);

// Отображаем начальный маршрут при загрузке страницы
window.addEventListener("load", renderRoute);