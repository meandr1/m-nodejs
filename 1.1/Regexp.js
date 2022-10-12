
function Validator() {

    this.validateEmail = function (email) {
        return email.match(/^[a-z][-.+a-z\d]{1,19}@[.!$%&’*+/=?^-\w]{1,15}\.[a-z]{1,5}$/i) !== null;
    }

    this.validatePhone = function (phoneNumber) {
        if (phoneNumber.length > 25) return false;
        return phoneNumber.match(/^-*\s*(\+-*\s*3-*\s*8)?-*\s*\(?(0-*\s*\d-*\s*\d)\)?(-*\s*\d){7}-*\s*$/) !== null;
    }

    this.validatePassword = function (password) {

    }

}
let e = new Validator();
console.log(e.validatePhone("+38 (099) 567 8901"));
