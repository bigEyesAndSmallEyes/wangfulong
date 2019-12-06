import * as request from 'request';
import { User } from './User';
import { Repo } from './Repo';


const options = {
  headers: {
    'User-Agent': 'request'
  },
  json: true
}

export class GithubApiService {
  getUserInfo(userName: string, cb: (user: User) => any) {
    request.get('https://api.github.com/users/' + userName, options, (error: any, response: any, body: any) => {
      console.log(typeof body);
      //let user = new User(JSON.parse(body));
      let user: User = new User(body);
      //console.log(user);
      cb(user);
    })
  }

  getRepos(userName: string, cb: (repos: Repo[]) => any) {
    request.get('https://api.github.com/users/' + userName + "/repos", options, (error: any, response: any, body: any) => {
      let repos:Repo[] = body.map((repo: any) => new Repo(repo))
      cb(repos);
    })
  }
}