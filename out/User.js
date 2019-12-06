"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(response) {
        this.login = response.login;
        this.company = response.company;
        this.bio = response.company;
        this.public_repos = response.public_repos;
    }
    return User;
}());
exports.User = User;
