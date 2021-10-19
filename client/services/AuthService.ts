import $api from '../http';



export default class AuthService {
    static async login (email: string,password: string) {
        return $api.post('/login', {email, password});
    }

    static async registration (email: string, password: string) {
        return $api.post('/registration', {email, password});
    }
}