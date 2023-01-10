import { RowDataPacket } from "mysql2"

export interface Book extends RowDataPacket {
    id: number,
    name: string,
    author: string,
    year: number,
    pages: number,
    description: string,
    views: number,
    wanted: number,
    deleted: number
}

// import {readFileSync} from 'fs'
// import {pool} from './models/database'
// async function createDB() {
//     const bookstore = readFileSync('./sql/bookstore.sql').toString();
//     await pool.query('CREATE TABLE books (id INT PRIMARY KEY, name VARCHAR(255), author VARCHAR(255), year INT, pages INT, description VARCHAR(255), views INT, wanted INT, deleted INT)')
//     await pool.execute(bookstore);
// }
// createDB();


// const books: Book[] = [
//     {
//         id: 22,
//         name: "СИ++ И КОМПЬЮТЕРНАЯ ГРАФИКА",
//         author: "Андрей Богуславский",
//         year: 2003,
//         pages: 351,
//         description: 'Лекции и практикум по программированию на Си++'
//     },
//     {
//         id: 23,
//         name: "Программирование на языке Go!",
//         author: "Марк Саммерфильд",
//         year: 2010,
//         pages: 290,
//         description: 'Лекции и практикум по программированию на Go!'
//     },
//     {
//         id: 25,
//         name: "Толковый словарь сетевых терминов и аббревиатур",
//         author: "М. Вильямс",
//         year: 2007,
//         pages: 410,
//         description: 'Толковый словарь сетевых терминов и аббревиатур'
//     },
//     {
//         id: 26,
//         name: "Python for Data Analysis",
//         author: "Уэс Маккинни",
//         year: 2011,
//         pages: 327,
//         description: 'Python for Data Analysis and so on'
//     },
//     {
//         id: 27,
//         name: "Thinking in Java (4th Edition)",
//         author: "Брюс Эккель",
//         year: 2000,
//         pages: 378,
//         description: 'Лекции и практикум по программированию на Java'
//     },
//     {
//         id: 29,
//         name: "Introduction to Algorithms",
//         author: "Томас Кормен, Чарльз Лейзерсон, Рональд Ривест, Клиффорд Штайн",
//         year: 2005,
//         pages: 315,
//         description: 'Книга для развития алгоритмического мышления'
//     },
//     {
//         id: 31,
//         name: "JavaScript Pocket Reference",
//         author: "Дэвид Флэнаган",
//         year: 2012,
//         pages: 263,
//         description: 'Краткое руководство по JavaScript'
//     },
//     {
//         id: 32,
//         name: "Adaptive Code via C#: Class and Interface Design, Design Patterns, and SOLID Principles",
//         author: "Гэри Маклин Холл",
//         year: 2006,
//         pages: 336,
//         description: 'Лекции и практикум по программированию на С#'
//     },
//     {
//         id: 33,
//         name: "SQL: The Complete Reference",
//         author: "Джеймс Р. Грофф",
//         year: 2009,
//         pages: 348,
//         description: 'Полное руководство по SQL'
//     },
//     {
//         id: 34,
//         name: "PHP and MySQL Web Development",
//         author: "Люк Веллинг",
//         year: 2011,
//         pages: 405,
//         description: 'Разработка при помощи PHP и SQL'
//     },
//     {
//         id: 35,
//         name: "Статистический анализ и визуализация данных с помощью R",
//         author: "Сергей Мастицкий",
//         year: 2013,
//         pages: 338,
//         description: 'Статистический анализ и визуализация данных с помощью R (что бы это ни было)'
//     },
//     {
//         id: 36,
//         name: "Computer Coding for Kid",
//         author: "Джон Вудкок",
//         year: 2015,
//         pages: 235,
//         description: 'Программирование для детей'
//     },
//     {
//         id: 37,
//         name: "Exploring Arduino: Tools and Techniques for Engineering Wizardry",
//         author: "Джереми Блум",
//         year: 2017,
//         pages: 277,
//         description: 'Руководство по Arduino для начинающих'
//     },
//     {
//         id: 38,
//         name: "Программирование микроконтроллеров для начинающих и не только",
//         author: "А. Белов",
//         year: 2014,
//         pages: 364,
//         description: 'Руководство по программированию микроконтроллеров'
//     },
//     {
//         id: 39,
//         name: "The Internet of Things",
//         author: "Сэмюэл Грингард",
//         year: 2018,
//         pages: 249,
//         description: 'Что такое интернет и нафига он нужен'
//     },
//     {
//         id: 40,
//         name: "Sketching User Experiences: The Workbook",
//         author: "Сет Гринберг",
//         year: 2017,
//         pages: 268,
//         description: 'Вообще не понятно что это и для чего'
//     },
//     {
//         id: 41,
//         name: "InDesign CS6",
//         author: "Александр Сераков",
//         year: 2013,
//         pages: 208,
//         description: 'Руководство пользователя InDesign'
//     },
//     {
//         id: 42,
//         name: "Адаптивный дизайн. Делаем сайты для любых устройств",
//         author: "Тим Кедлек",
//         year: 2015,
//         pages: 293,
//         description: 'Настольная книга фронтэндщика'
//     },
//     {
//         id: 43,
//         name: "Android для разработчиков",
//         author: "Пол Дейтел, Харви Дейтел",
//         year: 2019,
//         pages: 315,
//         description: 'Разработка для устройств Android'
//     },
//     {
//         id: 44,
//         name: "Clean Code: A Handbook of Agile Software Craftsmanship",
//         author: "Роберт Мартин",
//         year: 2015,
//         pages: 339,
//         description: 'Как не писать говнокод'
//     },
//     {
//         id: 45,
//         name: "Swift Pocket Reference: Programming for iOS and OS X",
//         author: "Энтони Грей",
//         year: 2020,
//         pages: 377,
//         description: 'Разработка для устройств на базе iOS and OS X'
//     },
//     {
//         id: 46,
//         name: "NoSQL Distilled: A Brief Guide to the Emerging World of Polyglot Persistence",
//         author: "Мартин Фаулер, Прамодкумар Дж. Садаладж",
//         year: 2009,
//         pages: 375,
//         description: 'Видимо что-то по SQL'
//     },
//     {
//         id: 47,
//         name: "Head First Ruby",
//         author: "Джей Макгаврен",
//         year: 2019,
//         pages: 329,
//         description: 'Руководство по Ruby для чайников'
//     },
//     {
//         id: 48,
//         name: "Practical Vim",
//         author: "Дрю Нейл",
//         year: 2012,
//         pages: 267,
//         description: 'Вообще не понятно что это и для чего'
//     }
// ]

// export const books2 = books.concat(books);