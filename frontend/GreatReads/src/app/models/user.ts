export class User {
    constructor(
        public name: string,
        public surname: string,
        public username: string,
        public mail: string,
        public password: string,
        public role: number,
        public city: string,
        public country: string,
        public image: string,
        public birthday: Date,
        public active: boolean,
        public last_active: Date
    ) { }
}
