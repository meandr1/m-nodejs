import {User} from "../mongo";

require("pidcrypt/seedrandom")
const pidCrypt = require("pidcrypt")
require("pidcrypt/aes_cbc")
const crypto = new pidCrypt.AES.CBC()

export function encrypt(user: User): string {
    return crypto.encryptText(user.pass, user.login, {nBits: 256})
}

export function decrypt(user: User): string {
    return crypto.decryptText(user.pass, user.login, {nBits: 256})
}