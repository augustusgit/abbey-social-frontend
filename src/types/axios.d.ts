import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Skip attaching Bearer token (e.g. login, refresh). */
    skipAuth?: boolean
    /** Internal: avoid infinite refresh loops. */
    _retry?: boolean
  }
}
