export class EventModel {
    constructor(
        public name: string,
        public author: string,
        public start: Date,
        public end: Date,
        public description: string,
        public isPrivate: boolean,
        public active: boolean
    ) { }
}
