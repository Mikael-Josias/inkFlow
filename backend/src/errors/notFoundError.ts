import { IApplicationError } from '@/common/types'

export function NotFoundError(message: string): IApplicationError {
  return {
    name: 'NotFoundError',
    message
  }
}