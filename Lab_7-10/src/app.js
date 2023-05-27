// Массив пользователей
let defaultUsers = [
    {
        phone: "+79123456789",
        name: "Алексей",
        surname: "Иванов",
        age: "25",
        password: "qwe123!@"
    },
    {
        phone: "+74951234567",
        name: "Мария",
        surname: "Петрова",
        age: "32",
        password: "zxc456*%"
    },
    {
        phone: "+78005553535",
        name: "Владимир",
        surname: "Смирнов",
        age: "45",
        password: "asd789#^"
    },
    {
        phone: "+78122777666",
        name: "Елена",
        surname: "Соколова",
        age: "28",
        password: "fgh234&$"
    },
    {
        phone: "+79261234567",
        name: "Дмитрий",
        surname: "Новиков",
        age: "37",
        password: "jkl567(="
    },
    {
        phone: "+74959876543",
        name: "Анна",
        surname: "Морозова",
        age: "19",
        password: "tyu890)_"
    },
    {
        phone: "+78001002030",
        name: "Сергей",
        surname: "Попов",
        age: "52",
        password: "uio123+<"
    },
    {
        phone: "+78129876543",
        name: "Ирина",
        surname: "Лебедева",
        age: "23",
        password: "iop456->"
    },
    {
        phone: "+79269876543",
        name: "Андрей",
        surname: "Кузнецов",
        age: "41",
        password: "!@#789?/"
    },
    {
        phone: "+74952345678",
        name: "Ольга",
        surname: "Волкова",
        age: "34",
        password: "$%^234;:"
    },
    {
        phone: "+78002003040",
        name: "Николай",
        surname: "Медведев",
        age: "49",
        password: "&*()567|"
    },
    {
        phone: "+78122345678",
        name: "Татьяна",
        surname: "Егорова",
        age: "26",
        password: "{}[]890~"
    },
    {
        phone: "+79262345678",
        name: "Кирилл",
        surname: "Федоров",
        age: "39",
        password: "<>?123`"
    },
    {
        phone: "+74959876543",
        name: "Вера",
        surname: "Павлова",
        age: "21",
        password: ".,/456'"
    },
    {
        phone: "+78003004050",
        name: "Георгий",
        surname: "Сидоров",
        age: "56",
        password: "-_=789\\"
    },
    {
        phone: "+78129876543",
        name: "Наталья",
        surname: "Козлова",
        age: "29",
        password: "#%&234^"
    },
    {
        phone: "+79269876543",
        name: "Артем",
        surname: "Зайцев",
        age: "44",
        password: "$@!567*"
    },
    {
        phone: "+74952345678",
        name: "Людмила",
        surname: "Орлова",
        age: "36",
        password: "+_&890%"
    },
    {
        phone: "+78004005060",
        name: "Роман",
        surname: "Григорьев",
        age: "48",
        password: "-^=123$"
    },
    {
        phone: "+78122345678",
        name: "Екатерина",
        surname: "Михайлова",
        age: "24",
        password: "#@!456&"
    }
]

// Хранилище пользователей
class UserStorage {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || defaultUsers;
        if (!this.findUser(defaultUsers[0]))
        {
            for (let user of defaultUsers)
            {
                this.addUser(user);
            }
        }
    }

    addUser(user) {
        let exists = this.users.some(u => u.phone === user.phone);
        if (exists) {
            return false;
        }
        this.users.push(user);
        localStorage.setItem("users", JSON.stringify(this.users));
        return true;
    }

    rewriteUser(user) {
        let index = this.users.findIndex(u => u.phone === user.phone);
        if (index === -1) {
            return false;
        }
        this.users[index] = user;
        localStorage.setItem("users", JSON.stringify(this.users));
        return true;
    }

    findUser(phone) {
        let user = this.users.find(u => u.phone === phone);
        return user || null;
    }

    getAll() {
        return this.users;
    }
}

// Парные чаты
class ChatStorage {
    constructor() {
        this.chats = JSON.parse(localStorage.getItem("chats")) || [];
    }

    addChat(chat) {
        let exists = this.chats.some(u => u.phone1 === chat.phone1 && u.phone2 === chat.phone2);
        if (exists) {
            return false;
        } else {
            this.chats.push(chat);
            localStorage.setItem("chats", JSON.stringify(this.chats));
        }
    }

    addMessage(chat, message) {
        let addTo = this.findChat(chat.phone1, chat.phone2)
        if (addTo) {
            let index = this.chats.indexOf(addTo);
            addTo.messages.push(message);

            this.chats[index] = addTo;
            localStorage.setItem("chats", JSON.stringify(this.chats));
        }
    }

    findChat(phone1, phone2) {
        let chat = this.chats.find(
            (c) => c.phone1 === phone1 && c.phone2 === phone2 || c.phone2 === phone1 && c.phone1 === phone2);
        return chat || null;
    }

    getAllByPhone(phone) {
        let chats = this.chats.filter(
            (c) => c.phone1 === phone || c.phone2 === phone);
        return chats || [];
    }
}

// Групповые чаты
class GroupChatStorage {
    constructor() {
        this.groupChats = JSON.parse(localStorage.getItem("groopchats")) || [];
    }

    addGroupChat(groupChat) {
        this.groupChats.push(groupChat);
        localStorage.setItem("groopchats", JSON.stringify(this.groupChats));
    }

    addMessage(groupChat, message) { // переписать доступ по элементу
        let index = this.groupChats.findIndex(c => c.name === groupChat.name);
        if (index) {
            if(this.groupChats[index].messages) {
                this.groupChats[index].messages.push(message);
            }
            else {
                this.groupChats[index].messages = [message];
            }
            localStorage.setItem("groopchats", JSON.stringify(this.groupChats));
        }
    }

    findChat(name) {
        return this.groupChats.find(c => c.name === name);
    }

    getAllByPhone(phone) {
        return this.groupChats.filter(c => c.phones.includes(phone));
    }
}

// ---------- Классы всё ----------
let userStorage = null;
let chatStorage = null;
let groupChatStorage = null;

let currentUser = null;
let currentChat = null;

function currentUseSave() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("currentChat", JSON.stringify(currentChat));
}

function currentUseLoad() {
    currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    currentChat = JSON.parse(localStorage.getItem("currentChat")) || null;
}

function loadDataBase() {
    userStorage = new UserStorage();
    chatStorage = new ChatStorage();
    groupChatStorage = new GroupChatStorage();
}

// Вид окна входа
function loginView(view) {
    let phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.placeholder = "Введите телефон";

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Введите пароль";

    let divButtons = document.createElement("div")
    divButtons.classList.add("logButtons")

    let loginButton = document.createElement("button");
    loginButton.textContent = "Войти";

    let regLink = document.createElement("a");
    regLink.href = "#reg";
    regLink.textContent = "Зарегистрироваться";

    loginButton.addEventListener("click", function () {
        let phone = phoneInput.value.trim();
        let password = passwordInput.value.trim();

        if (!phone || !password) {
            alert("Заполните все поля");
            return;
        }

        let user = userStorage.findUser(phone);
        if (!user || user.password !== password) {
            alert("Неверный телефон или пароль");
            return;
        }

        currentUser = user;
        window.location.hash = "#main";
        currentUseSave();
    });

    view.appendChild(phoneInput);
    view.appendChild(passwordInput);

    divButtons.appendChild(loginButton);
    divButtons.appendChild(regLink);
    view.appendChild(divButtons);
}

// Вид окна регистрации
function registerView(view) {
    let phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.placeholder = "Введите телефон";

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Введите пароль";

    let confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.type = "password";
    confirmPasswordInput.placeholder = "Подтвердите пароль";

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Введите имя";

    let surnameInput = document.createElement("input");
    surnameInput.type = "text";
    surnameInput.placeholder = "Введите фамилию";

    let ageInput = document.createElement("input");
    ageInput.type = "number";
    ageInput.placeholder = "Введите возраст";

    let regButton = document.createElement("button");
    regButton.textContent = "Зарегистрироваться";

    let loginLink = document.createElement("a");
    loginLink.href = "#login";
    loginLink.textContent = "Вернуться к входу";

    // добавляем обработчик события клика на кнопку регистрации
    regButton.addEventListener("click", function () {
        let phone = phoneInput.value.trim();
        let password = passwordInput.value.trim();
        let confirmPassword = confirmPasswordInput.value.trim();
        let name = nameInput.value.trim();
        let surname = surnameInput.value.trim();
        let age = ageInput.value.trim();

        if (!phone || !password || !confirmPassword || !name || !surname || !age) {
            alert("Заполните все поля");
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }

        if (userStorage.findUser(phone)) {
            alert("Такой телефон уже зарегистрирован");
            return;
        }

        let user = {
            phone: phone,
            password: password,
            name: name,
            surname: surname,
            age: age
        };

        userStorage.addUser(user);

        currentUser = user;
        window.location.hash = "#login";
    });

    // добавляем созданные элементы в элемент вида
    view.appendChild(phoneInput);
    view.appendChild(passwordInput);
    view.appendChild(confirmPasswordInput);
    view.appendChild(nameInput);
    view.appendChild(surnameInput);
    view.appendChild(ageInput);
    view.appendChild(regButton);
    view.appendChild(loginLink);
}

function mainView(view) {
    let naviPanel = document.createElement("nav");
    naviPanel.className = "naviPanel";
    naviPanel.innerHTML =
        "<button id='createChat' class='naviElem'>Создать чат</button> " +
        "<button id='createGroupChat' class='naviElem'>Создать групповой чат</button>" +
        "<button id='settings' class='naviElem'>Настройки</button> " +
        "<a href='#login' class='naviElem'>Выйти</a> ";
    view.appendChild(naviPanel);

    let createChatButton = document.getElementById("createChat");

    createChatButton.addEventListener("click", function () {
        let nameH1 = document.createElement("h1");
        nameH1.textContent = "Нажмите на пользователя для создания чата";

        let users = userStorage.getAll();
        let usersDiv = document.getElementById("chat");
        usersDiv.innerHTML = "";
        if (users) {
            let usersList = document.createElement("div");
            usersList.className = "userSelect";

            for (let user of users) {
                if (!chatStorage.findChat(user.phone, currentUser.phone)) {
                    let userItem = document.createElement("div");
                    let possibleContact = user.phone;

                    userItem.dataset.id = possibleContact;

                    userItem.addEventListener("click", function () {

                        let id = this.dataset.id;

                        let chat = {
                            phone1: currentUser.phone,
                            phone2: id,
                            messages: []
                        }
                        chatStorage.addChat(chat);
                        currentChat = chat;
                        showView();
                        updateChat();
                        updateMessages();
                    });
                    let contact = userStorage.findUser(possibleContact);
                    let nameSpan = document.createElement("h1");
                    nameSpan.textContent = contact.name + " " + contact.surname;
                    let ageSpan = document.createElement("h1");
                    ageSpan.textContent = "Возраст " + contact.age;
                    userItem.appendChild(nameSpan);
                    userItem.appendChild(ageSpan)

                    usersList.appendChild(userItem);
                }
            }
            usersDiv.appendChild(usersList);
        } else {
            alert("Сбой базы данных")
        }
        let cancelButton = document.createElement("button");
        cancelButton.addEventListener("click", showView);
        cancelButton.textContent = "Отменить";
        usersDiv.appendChild(cancelButton);
    })

    let chatsDiv = document.createElement("div");
    chatsDiv.id = "chats";

    let chatDiv = document.createElement("div");
    chatDiv.id = "chat";

    let headerDiv = document.createElement("div");
    headerDiv.id = "header";

    let messagesDiv = document.createElement("div");
    messagesDiv.id = "messages";

    let footerDiv = document.createElement("div");
    footerDiv.id = "footer";

    let messageInput = document.createElement("input");
    messageInput.type = "text";
    messageInput.placeholder = "Введите сообщение";

    let sendButton = document.createElement("button");
    sendButton.textContent = "Отправить";

    sendButton.addEventListener("click", function () {
        let message = messageInput.value.trim();

        if (!message) {
            alert("Введите сообщение");
            return;
        }

        if (!currentChat) {
            alert("Выберите чат");
            return;
        }

        let msg = {
            from: currentUser.phone,
            text: message,
            time: new Date().toLocaleString()
        };

        if (currentChat.type === "user") {
            chatStorage.addMessage(currentChat, msg);
        } else if (currentChat.type === "group") {
            groupChatStorage.addMessage(currentChat, msg);
        }

        messageInput.value = "";
        updateMessages();
    });

    footerDiv.appendChild(messageInput);
    footerDiv.appendChild(sendButton);

    chatDiv.appendChild(headerDiv);
    chatDiv.appendChild(messagesDiv);
    chatDiv.appendChild(footerDiv);

    let messengerDiv = document.createElement("div");
    messengerDiv.className = "messengerDiv";
    messengerDiv.appendChild(chatsDiv);
    messengerDiv.appendChild(chatDiv)

    view.appendChild(messengerDiv);

    updateChats();
    updateChat();
    updateMessages();
}

// Смена вида страницы
function showView() {
    let hash = window.location.hash;
    if (!hash) {
        window.location.hash = "#login";
        return;
    }
    let view = document.getElementById("view");
    view.innerHTML = "";

    view.className = "";

    if (hash === "#login") {
        view.classList.add("login");
    } else if (hash === "#reg") {
        view.classList.add("reg");
    } else if (hash === "#main") {
        view.classList.add("main");
    }

    switch (hash) {
        case "#login":
            loginView(view)
            break;

        case "#reg":
            registerView(view)
            break;

        case "#main":
            mainView(view)
            break;

        default:
            alert("Неверный адрес");
            window.location.hash = "#login";
            return;
    }
}

// Обновление чатов
function updateChats() {
    if (!currentUser)
    { return; }
    let chatsDiv = document.getElementById("chats");
    chatsDiv.innerHTML = "";
    let chats = chatStorage.getAllByPhone(currentUser.phone);

    if (chats && chats.length > 0) {
        let chatsList = document.createElement("ul");
        let nameH1 = document.createElement("h1");
        nameH1.textContent = "Личные чаты: ";
        chatsDiv.appendChild(nameH1);

        for (let chat of chats) {
            let chatItem = document.createElement("li");

            let phoneOfContact = chat.phone1;
            if (phoneOfContact === currentUser.phone) {
                phoneOfContact = chat.phone2;
            }

            chatItem.dataset.id = phoneOfContact;
            chatItem.dataset.type = "user";

            chatItem.addEventListener("click", function () {

                let id = this.dataset.id;
                let type = this.dataset.type;

                let chat = {
                    phone1: currentUser.phone,
                    phone2: id,
                    type: type,
                    name: userStorage.findUser(phoneOfContact).name + " " + userStorage.findUser(phoneOfContact).surname
                };
                currentChat = chat;
                updateChat();
                updateMessages();

                currentUseSave();
            });

            let nameSpan = document.createElement("span");
            let contact = userStorage.findUser(phoneOfContact);
            nameSpan.textContent = contact.name + " " + contact.surname;

            chatItem.appendChild(nameSpan);
            chatsList.appendChild(chatItem);
            chatsDiv.appendChild(chatsList);
        }
    } else {
        let nameH1 = document.createElement("h1");
        nameH1.textContent = "Добавьте чаты";

        chatsDiv.appendChild(nameH1);
    }
    let groupChats = groupChatStorage.getAllByPhone(currentUser.phone);

    if (groupChats && groupChats.length > 0) {
        let chatsList = document.createElement("ul");
        let nameH2 = document.createElement("h1");
        nameH2.textContent = "Групповые чаты: ";
        chatsDiv.appendChild(nameH2);

        for (let groupChat of groupChats) {
            let chatItem = document.createElement("li");

            chatItem.dataset.type = "group";
            chatItem.addEventListener("click", function () {

                let type = this.dataset.type;

                let chat = {
                    type: type,
                    name: groupChat.name
                };

                currentChat = chat;
                showView();
            });

            let nameSpan = document.createElement("span");
            nameSpan.textContent = groupChat.name;

            chatItem.appendChild(nameSpan);
            chatsList.appendChild(chatItem);
            chatsDiv.appendChild(chatsList);
        }
    } else {
        let nameH2 = document.createElement("h1");
        nameH2.textContent = "Добавьте групповые чаты";

        chatsDiv.appendChild(nameH2);
    }
}

function updateChat() {
    let headerDiv = document.getElementById("header");
    headerDiv.innerHTML = "";

    if (currentChat) {
        let nameH1 = document.createElement("h1");
        nameH1.textContent = "Текущий чат: " + currentChat.name;

        headerDiv.appendChild(nameH1);
    }
}

function updateMessages() {
    let messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";

    if (currentChat) {
        let messagesList = document.createElement("div");

        let messages = [];
        if (currentChat.type === "user") {
            messages = chatStorage.findChat(currentUser.phone, currentChat.phone2).messages;
        } else if (currentChat.type === "group") {
            messages = groupChatStorage.findChat(currentChat.name).messages;
        }

        if (messages && messages.length > 0) {
            for (let message of messages) {
                let messageItem = document.createElement("div");

                if (message.from === currentUser.phone) {
                    messageItem.className = "me";
                } else {
                    messageItem.className = "other";
                }

                let textSpan = document.createElement("p");
                textSpan.textContent = message.text + " [" + message.time +"]";

                messageItem.appendChild(textSpan);

                messagesList.appendChild(messageItem);

            }
            messagesDiv.appendChild(messagesList);
        }
        else {
            let nameH2 = document.createElement("h1");
            nameH2.textContent = "Нет сообщений";

            messagesDiv.appendChild(nameH2);
        }
    } else {
        let nameH1 = document.createElement("h1");
        nameH1.textContent = "Не выбран чат";

        messagesDiv.appendChild(nameH1);
    }
}

window.addEventListener("hashchange", showView);
window.addEventListener("load", loadDataBase);
window.addEventListener("load", currentUseLoad);
window.addEventListener("load", showView);