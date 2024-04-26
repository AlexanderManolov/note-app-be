import { NoteRequestBody } from '../types/notes'

const areAllFieldsPresent = (payload: Record<string, any>[]) =>
  payload.every(el => el.hasOwnProperty('title') && el.hasOwnProperty('description'))

export const validateSinglePayload = (payload: any): NoteRequestBody | undefined => {
  if (
    payload instanceof Object &&
    !(payload instanceof Array) &&
    Object.entries(payload).length === 1 &&
    areAllFieldsPresent([payload])
  ) {
    return payload
  }
}

export const validateMultiplePayload = (payload: unknown): NoteRequestBody[] => {
  if (payload instanceof Array && areAllFieldsPresent(payload)) {
    return payload
  }
  return []
}
