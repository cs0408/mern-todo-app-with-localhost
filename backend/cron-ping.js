const cron = require('node-cron')
const request = require('request')

const call_api_host =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPEMENT_SERVER_HOST
    : process.env.PRODUCTION_SERVER_HOST

const call_api_port =
  process.env.NODE_ENV === 'development'
    ? process.env.DEVELOPEMENT_SERVER_PORT
    : process.env.PRODUCTION_SERVER_PORT

cron.schedule('* * * * *', async () => {
  console.log(
    'Change Reminder flag every minute -- ',
    new Date().toLocaleString()
  )

  request(
    `${call_api_host}${call_api_port}/api/v1/reminders/upcoming/changeFlag`
  )
})

cron.schedule('0 0 23 * *', async () => {
  console.log(
    'Delete unCheck or UnDeleetd task every 24 hour -- ',
    new Date().toLocaleString()
  )

  request(
    `${call_api_host}${call_api_port}/api/v1/todo/delete/remaining/previous-dates-tasks`
  )
})
