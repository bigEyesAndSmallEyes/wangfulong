import { Repo } from './Repo';
export class User {
    login: string;
    company: string;
    bio: string;
    public_repos: number;
    repos: Repo[] = [];
    constructor(response: any) {
        this.login = response.login;
        this.company = response.company;
        this.bio = response.company;
        this.public_repos = response.public_repos;
    }
}