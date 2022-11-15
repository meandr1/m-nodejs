"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 1
fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => console.log(data.ip))
    .catch(e => console.log(e));
// 2
function getMyIP() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://api.ipify.org/?format=json');
        return (yield response.json()).ip;
    });
}
getMyIP().then(ip => console.log(ip));
//3.1
function getNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const host = 'https://random-data-api.com/api/name/random_name';
        const response1 = yield fetch(host);
        const response2 = yield fetch(host);
        const response3 = yield fetch(host);
        return yield Promise.all([response1.json(), response2.json(), response3.json()]).then((values) => {
            return values.map(item => item.name);
        });
    });
}
getNames().then(item => item.map(item => console.log(item)));
//3.2
function getNames2() {
    return __awaiter(this, void 0, void 0, function* () {
        const host = 'https://random-data-api.com/api/name/random_name';
        const response1 = yield (yield fetch(host)).json();
        const response2 = yield (yield fetch(host)).json();
        const response3 = yield (yield fetch(host)).json();
        return [response1.name, response2.name, response3.name];
    });
}
getNames2().then(item => item.map(item => console.log(item)));
//3.3
// const host: string = 'https://random-data-api.com/api/name/random_name'
// const responses = [fetch(host),fetch(host),fetch(host)].map(item => item.then((item)=>console.log(item)))
// const responses = [host,host,host].map(item => fetch(item))
