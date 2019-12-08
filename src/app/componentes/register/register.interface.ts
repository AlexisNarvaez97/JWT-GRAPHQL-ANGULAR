import { User } from '../../components/users/user.interface';
export interface RegisterData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface RegisterResult {
    status: boolean;
    message: string;
    user?: User;
}