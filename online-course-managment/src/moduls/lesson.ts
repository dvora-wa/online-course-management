export class Lesson {
    lessonId: any;
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public courseId: number,
    ) { }
}
