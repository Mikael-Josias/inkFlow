import { IApplicationError } from '@/common/types'

export function InternalError(message: string): IApplicationError {
  return {
    name: 'InternalError',
    message
  }
}