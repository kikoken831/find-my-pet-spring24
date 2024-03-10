import { User } from '@prisma/client'
import jwt, { JwtPayload } from 'jsonwebtoken'

class JwtService {
  token: string
  decodedToken: JwtPayload | null
  isValid: boolean = false

  constructor(token: string) {
    this.token = token
    this.validate()
  }

  validate(): boolean {
    if (!this.token) return false

    const [bearer, token] = this.token.split(' ')
    if (bearer.toLowerCase() !== 'bearer') return false

    try {
      this.decodedToken = this.decode(token)
      this.isValid = true

      return !!this.decodedToken
    } catch (error) {
      return false
    }
  }

  isTokenValid(): boolean {
    return this.isValid
  }

  private decode(token: string): JwtPayload | null {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || 'super_duper_secret',
    ) as JwtPayload
  }

  static signToken(user: User): string {
    const payload = {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    const secretKey = process.env.JWT_SECRET || 'super_duper_secret'
    const token = jwt.sign(payload, secretKey)

    return token
  }
}

export default JwtService
