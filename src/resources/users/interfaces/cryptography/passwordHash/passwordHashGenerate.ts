export interface PasswordHashGenerate {
    hash(password:string): Promise<string>
}