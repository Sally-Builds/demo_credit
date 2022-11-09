import Token from '@/utils/interfaces/token.interface'
import jwt from 'jsonwebtoken'
export interface JwtVerify {
    verify(token: string): Promise<Token | jwt.JsonWebTokenError>
}