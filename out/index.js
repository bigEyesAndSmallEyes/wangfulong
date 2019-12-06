"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var svc = new GithubApiService_1.GithubApiService();
svc.getUserInfo('hfpp2012', function (user) {
    console.log("name:: ", user.login);
});
svc.getRepos('hfpp2012', function (repos) {
    console.log("repos:: ", repos);
});
