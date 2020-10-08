export class Book {
    constructor(
        public name: string,
        public authors: string,
        public published: Date,
        public genres: string,
        public description: string,
        public image: string,
        public rating: number,
        public approved: boolean,
        public pdf: string
    ) { }
}
