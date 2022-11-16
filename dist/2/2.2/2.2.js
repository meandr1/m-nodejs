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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const hostForIP = 'https://api.ipify.org/?format=json';
// 1
fetch(hostForIP)
    .then(response => response.json())
    .then(data => console.log(`My IP is (using fetch()): ${data.ip}`))
    .catch(e => console.log(e));
// 2
function getMyIP() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(hostForIP);
        return (yield response.json()).ip;
    });
}
getMyIP().then(item => console.log(`My IP is (using function()): ${item}`));
const hostForNames = 'https://random-data-api.com/api/name/random_name';
//3.1
function getNames(host) {
    return __awaiter(this, void 0, void 0, function* () {
        const response1 = yield fetch(host);
        const response2 = yield fetch(host);
        const response3 = yield fetch(host);
        return yield Promise.all([response1.json(), response2.json(), response3.json()]).then((values) => {
            return values.map(item => item.name);
        });
    });
}
getNames(hostForNames).then(item => { console.log('Getting names using async/await + Promise.all:'), item.map(item => console.log(item)); });
//3.2
function getNames2(host) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        for (let i = 0; i < 3; i++) {
            const response = yield (yield fetch(host)).json();
            result.push(response.name);
        }
        return result;
    });
}
getNames2(hostForNames).then(item => { console.log('Getting names using async/await without Promise.all:'), item.map(item => console.log(item)); });
//3.3
function getNames3(host) {
    return [host, host, host]
        .map(item => fetch(item))
        .map(item => item.then((item) => item.json()))
        .map(item => item.then(item => item.name));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    let res = [];
    try {
        for (var _b = __asyncValues(getNames3(hostForNames)), _c; _c = yield _b.next(), !_c.done;) {
            const name = _c.value;
            res.push(name);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log(`Getting names without using async/await and Promise.all: \n${res.join('\n')}`);
}))();
const hostForUsers = 'https://random-data-api.com/api/users/random_user';
//4.1
function getFemaleUser(host, requestCounter = 1) {
    fetch(host)
        .then(response => response.json())
        .then(user => {
        if (user.gender === 'Female') {
            console.log(`Task 4.1. requested ${requestCounter} times to get female user`);
            return user;
        }
        else
            getFemaleUser(host, ++requestCounter);
    });
}
getFemaleUser(hostForUsers);
//4.2
function getFemaleUser2(host) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(host);
        let user = yield response.json();
        let requestCounter = 1;
        while (user.gender !== 'Female') {
            response = yield fetch(host);
            user = yield response.json();
            requestCounter++;
        }
        console.log(`Task 4.2. requested ${requestCounter} times to get female user`);
        return user;
    });
}
getFemaleUser2(hostForUsers);
//5
// Не уверен, что я все правильно понял, что нужно сделать в этом задании
function firstTask5(callBack, ip) {
    callBack(ip);
}
function callBackTask5(ip) {
    console.log(`My IP is (Task 5): ${ip}`);
}
function twoTask5() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch(hostForIP).then(item => item.json()).then(item => firstTask5(callBackTask5, item.ip));
    });
}
twoTask5();
//6
function firstTask6() {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(hostForIP).then(item => item.json()).then(item => item.ip);
    });
}
function callBackTask6(ip) {
    console.log(`My IP is (Task 6): ${ip}`);
}
function twoTask6(callBack) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firstTask6().then(ip => callBack(ip));
    });
}
twoTask6(callBackTask6);
