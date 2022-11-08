export interface JwtVerify {
    verify(token: string): Promise<string | null>
}