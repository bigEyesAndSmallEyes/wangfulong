"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var svc = new GithubApiService_1.GithubApiService();
console.log(process.argv);
if (process.argv.length < 3) {
    console.log("请输入用户名");
}
else {
    svc.getUserInfo(process.argv[2], function (user) {
        //console.log("name:: ", user.login);
        svc.getRepos(user.login, function (repos) {
            user.repos = repos;
            console.log("user:: ", user);
        });
    });
}
