/**
 * Constructor creates Validator object which contains three methods to validate 
 * e-mails, passwords and phone numbers.
 */
function Validator() {

    /**
     * Method validates e-mail for not to have illegal symbols, length, etc.
     * @param {String} email - is an e-mail to validate
     * @returns true in case of correct e-mail, otherwise - false
     */
    this.validateEmail = function (email) {
        return email.match(/^[a-z][-.+a-z\d]{1,19}@[.!$%&’*+/=?^-\w]{1,15}\.[a-z]{1,5}$/i) !== null;
    }

    /**
     * Method validates phone number for not to have illegal symbols, length, etc.
     * @param {String} phoneNumber - is an phone number to validate
     * @returns true in case of correct phone number, otherwise - false
     */
    this.validatePhone = function (phoneNumber) {
        if (phoneNumber.length > 25) return false;
        return phoneNumber.match(/^-*\s*(\+-*\s*3-*\s*8)?-*\s*\(?(0-*\s*\d-*\s*\d)\)?(-*\s*\d){7}-*\s*$/) !== null;
    }

    /**
     * Method validates password for not to short, and have required characters: upper
     * and lower case and digits.
     * @param {String} password - is an password to validate
     * @returns true in case of correct password, otherwise - false
     */
    this.validatePassword = function (password) {
        return password.match(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/) !== null;
    }
}