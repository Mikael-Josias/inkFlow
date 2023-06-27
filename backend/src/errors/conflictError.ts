import { IApplicationError } from '@/common/types'


export function ConflictError(message: string): IApplicationError {
  return {
    name: 'ConflictError',
    message
  }
}