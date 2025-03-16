export class User {
    token(arg0: string, token: any) {
      throw new Error('Method not implemented.');
    }
    constructor(
        public userId: number,
        public name: string,
        public email: string,
        public role: 'student' | 'teacher' | 'admin'
    ) { }

}
