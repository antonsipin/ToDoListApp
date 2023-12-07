import { VerifyErrors, VerifyOptions } from 'jsonwebtoken'
import { Request, Response, NextFunction }from 'express'

export type CustomError = VerifyErrors | null

interface Decoded {}

export interface DecodedType extends VerifyOptions {
  email: string
}

export { VerifyErrors }

export type VerifyCallback = (
  err: VerifyErrors,
  decoded: DecodedType,
) => void

export interface RequestType extends Request {
  session: {
    user: {
      name: string,
      email: string
    }
  }
}

export { Request, Response, NextFunction }