export class CommentModel {
    constructor(
        public book: string,
        public bookAuthors: string,
        public author: string,
        public description: string,
        public rating: number
    ) { }
}
