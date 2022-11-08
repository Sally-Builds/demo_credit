export interface JwtGenerate {
    sign(payload: string): Promise<string>
}