const loc = window.location
export const ORIGIN = loc.port === '5173' ? 'http://localhost' : loc.origin

export const loginUri = 'auth/login'
export const emailCheckUri = 'recovery/email'
export const passwordCheckUri = 'recovery/confirm'
export const passwordSaveUri = 'recovery/savepswd'
export const registerUri = 'register/save'
export const confirmUri = 'register/confirm'

export const getTranslateUri = '/gettranslate'
