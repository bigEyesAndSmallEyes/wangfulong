export class Repo {
    name: string;
    url: string;
    constructor(repo: any) {
        this.name = repo.name;
        this.url = repo.url;
    }
}