module.exports = class Validator {
    static isNumber (string) {
        return !!Number(string)
    }
}