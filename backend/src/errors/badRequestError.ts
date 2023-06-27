import { IApplicationError } from '@/common/types'

export function BadRequestError(message: string): IApplicationError {
    return {
        name: 'BadRequestError',
        message
    }
}