import {GithubApiService} from './GithubApiService';
import { User } from './User';
import { Repo } from './Repo';
import _ from 'lodash';

let svc: GithubApiService = new GithubApiService();
console.log(process.argv);
if(process.argv.length < 3) {
    console.log("请输入用户名");
} else {
    svc.getUserInfo(process.argv[2], (user: User) => {
        //console.log("name:: ", user.login);
        svc.getRepos(user.login, (repos: Repo[]) => {
            user.repos = repos;
            console.log("user:: ", user);
        });
    });
}


