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
fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
    .then(data => console.log(data.ip))
    .catch(e => console.log(e));
function getMyIP() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('https://api.ipify.org/?format=json');
        const data = yield response.json();
        return data.ip;
    });
}
getMyIP().then(ip => console.log(ip));
