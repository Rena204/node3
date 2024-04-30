const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Функция для сохранения данных счетчика в файл JSON
function saveCounter(counterData) {
    fs.writeFileSync('counter.json', JSON.stringify(counterData, null, 2));
}

// Функция для загрузки данных счетчика из файла JSON
function loadCounter() {
    try {
        const data = fs.readFileSync('counter.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // Если файл не найден или возникла ошибка при чтении, возвращаем пустой объект
        return {};
    }
}

// Обработчик для главной страницы
app.get('/', (req, res) => {
    // Загружаем данные счетчика из файла
    let counterData = loadCounter();

    // Увеличиваем значение счетчика для текущей страницы
    counterData['/'] = (counterData['/'] || 0) + 1;

    // Сохраняем обновленные данные счетчика в файл
    saveCounter(counterData);

    // Отправляем HTML с текущим значением счетчика
    res.send(`<h1>Главная страница</h1><p>Количество просмотров: ${counterData['/']}</p>`);
});

// Обработчик для страницы "О нас"
app.get('/about', (req, res) => {
    // Загружаем данные счетчика из файла
    let counterData = loadCounter();

    // Увеличиваем значение счетчика для текущей страницы
    counterData['/about'] = (counterData['/about'] || 0) + 1;

    // Сохраняем обновленные данные счетчика в файл
    saveCounter(counterData);

    // Отправляем HTML с текущим значением счетчика
    res.send(`<h1>О нас</h1><p>Количество просмотров: ${counterData['/about']}</p>`);
});

// Запускаем сервер
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
