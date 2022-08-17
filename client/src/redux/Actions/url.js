const api_host =
  process.env.REACT_APP_ENV === 'development'
    ? process.env.REACT_APP_DEVELOPMENT_HOST
    : process.env.REACT_APP_PRODUCTION_HOST

const api_port =
  process.env.REACT_APP_ENV === 'development'
    ? process.env.REACT_APP_DEVELOPMENT_PORT
    : process.env.REACT_APP_PRODUCTION_PORT

export const call_api = api_host + api_port
