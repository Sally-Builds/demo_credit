export interface PasswordHashVerify {
    verify(password:string, userPassword: string): Promise<boolean>
}