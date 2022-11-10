import User from '@/resources/users/userInterface'
declare global {
    namespace Express {
        export interface Request {
            user: Omit<User, 'password'>
        }
    }
}
