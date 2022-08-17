const ReminderEvents = require('../models/reminderModel')
const Users = require('../models/userModel')

// ================================ Add, Check, Delete reminder ============================
exports.addReminderEvent = async (req, res) => {
  try {
    const { subTitle, title, eventDate } = req.body

    // check date should not be less than today
    // reminder date time
    const reminderDateTime =
      new Date(eventDate).getFullYear() +
      '-' +
      (new Date(eventDate).getMonth() + 1) +
      '-' +
      new Date(eventDate).getDate() +
      ' ' +
      new Date(eventDate).getHours() +
      ':' +
      new Date(eventDate).getMinutes()

    // current date time
    const currentDateTime =
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate() +
      ' ' +
      new Date().getHours() +
      ':' +
      new Date().getMinutes()

    if (reminderDateTime <= currentDateTime) {
      return res.status(200).json({
        success: false,
        message: 'Reminder time should be greater than current time.',
      })
    }

    const reminderEventData = {
      subTitle,
      title,
      eventDate,
      owner: req.user._id,
    }

    const reminderEvent = await ReminderEvents.create(reminderEventData)

    const user = await Users.findById(req.user._id)

    user.upcomingReminderEvents.unshift(reminderEvent._id)

    await reminderEvent.save()
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Reminder added!!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// delete reminder
exports.deleteReminderEvent = async (req, res) => {
  try {
    const reminderEvent = await ReminderEvents.findById(req.params.id)

    if (!reminderEvent) {
      return res.status(200).json({
        success: false,
        message: 'Reminder not found..',
      })
    }

    // check reminder owner same as login user
    if (reminderEvent.owner.toString() !== req.user._id.toString()) {
      return res.status(200).json({
        success: false,
        message: 'UnAuthorized..',
      })
    }

    if (reminderEvent.completedAt) {
      return res.status(200).json({
        success: false,
        message: 'Reminder already completed.',
      })
    }

    if (reminderEvent.deletedAt) {
      return res.status(200).json({
        success: false,
        message: 'Reminder already deleted.',
      })
    }

    reminderEvent.deletedAt = new Date()

    const user = await Users.findById(req.user._id)
    user.deletedReminderEvents.unshift(reminderEvent._id)

    const index = await user.upcomingReminderEvents.indexOf(reminderEvent._id)
    user.upcomingReminderEvents.splice(index, 1)

    await reminderEvent.save()
    await user.save()

    res.status(200).json({
      success: true,
      message: 'You delete the reminder.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// =============================== Get upcoming, check, deleted reminder ================
exports.getUpcomingReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'upcomingReminderEvents'
    )

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized..',
      })
    }

    await user.upcomingReminderEvents.sort(function (a, b) {
      return new Date(a.eventDate) - new Date(b.eventDate)
    })

    res.status(200).json({
      success: true,
      upcomingReminderList: user.upcomingReminderEvents,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.changeUpComingReminderflag = async () => {
  try {
    let reminderEvents = await ReminderEvents.find({})
    let users = await Users.find({})

    for (let i = 0; i < users.length; i++) {
      const userFind = users[i]

      // temp - store previous reminder ID
      const tempIdStore = []

      // get upcoming reminders id
      for (let j = 0; j < userFind.upcomingReminderEvents.length; j++) {
        const userReminderFind = userFind.upcomingReminderEvents[j]

        tempIdStore.push(userReminderFind)
      }

      // update field value of Reminder Events
      for (let k = 0; k < tempIdStore.length; k++) {
        const reminderId = tempIdStore[k]

        for (let l = 0; l < reminderEvents.length; l++) {
          const reminderFind = reminderEvents[l]

          // check condition if reminder ID matched
          if (reminderFind._id.toString() === reminderId.toString()) {
            const event_date_time =
              new Date(reminderFind.eventDate).getFullYear() +
              '-' +
              (new Date(reminderFind.eventDate).getMonth() + 1) +
              '-' +
              new Date(reminderFind.eventDate).getDate() +
              ' ' +
              new Date(reminderFind.eventDate).getHours() +
              ':' +
              new Date(reminderFind.eventDate).getMinutes()

            // current date time
            const current_date_time =
              new Date().getFullYear() +
              '-' +
              (new Date().getMonth() + 1) +
              '-' +
              new Date().getDate() +
              ' ' +
              new Date().getHours() +
              ':' +
              new Date().getMinutes()

            // check if reminder is older and not deleted
            if (
              event_date_time < current_date_time &&
              reminderFind.deletedAt === null &&
              reminderFind.completedAt === null
            ) {
              // update reminder completed field
              reminderFind.completedAt = reminderFind.eventDate
              reminderFind.showReminder = false

              // add reminder ID into users - completedReminderEvents
              await userFind.completedReminderEvents.unshift(reminderFind._id)

              // deleet ID from user - upcomingReminderEvents
              const index = userFind.upcomingReminderEvents.indexOf(
                reminderFind._id
              )
              await userFind.upcomingReminderEvents.splice(index, 1)
            }

            if (event_date_time === current_date_time) {
              reminderFind.showReminder = true
            }
          }

          await reminderFind.save()
        }
      }

      await userFind.save()
    }
  } catch (error) {
    console.log(error)
  }
}

exports.getCurrentReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'upcomingReminderEvents'
    )

    // check user is authenticated or not
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized..',
      })
    }

    const currentReminders = []
    for (let i = 0; i < user.upcomingReminderEvents.length; i++) {
      if (user.upcomingReminderEvents[i].showReminder) {
        currentReminders.push(user.upcomingReminderEvents[i])
      }
    }

    res.status(200).json({
      success: true,
      currentReminders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getCompletedReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'completedReminderEvents'
    )

    // check user is authorized or not
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized..',
      })
    }

    await user.completedReminderEvents.sort(function (a, b) {
      return new Date(b.eventDate) - new Date(a.eventDate)
    })

    res.status(200).json({
      success: true,
      completeReminderList: user.completedReminderEvents,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// get all deleted reminders
exports.getDeletedReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'deletedReminderEvents'
    )

    // check user is authorized or not
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    await user.deletedReminderEvents.sort(function (a, b) {
      return new Date(b.eventDate) - new Date(a.eventDate)
    })

    res.status(200).json({
      success: true,
      deleteReminderList: user.deletedReminderEvents,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ====================== Delete upcoming, checked, deleted reminder =====================
exports.deleteUpcomingReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'upcomingReminderEvents'
    )

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    for (let i = 0; i < user.upcomingReminderEvents.length; i++) {
      const reminderFinded = user.upcomingReminderEvents[i]
      const reminderFindedOfReminderEvents = await ReminderEvents.findById(
        reminderFinded._id
      )

      // if task already deleted
      if (reminderFindedOfReminderEvents.deletedAt) {
        await user.deletedReminderEvents.unshift(reminderFinded._id)
      }

      // if task is not already deleted
      if (!reminderFindedOfReminderEvents.deletedAt) {
        // update deletedAt field
        reminderFindedOfReminderEvents.deletedAt = new Date()
        await reminderFindedOfReminderEvents.save()
        // add ID into user - deletedReminderEvents
        await user.deletedReminderEvents.unshift(reminderFinded._id)
      }
    }

    user.upcomingReminderEvents = []

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Upcoming Reminders delete!!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteCompletedReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    // delete from todoTasks
    for (let i = 0; i < user.completedReminderEvents.length; i++) {
      await ReminderEvents.findByIdAndDelete(user.completedReminderEvents[i])
    }

    user.completedReminderEvents = []

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Completed Reminders delete!!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteDeletedReminders = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    // delete from todoTasks
    for (let i = 0; i < user.deletedReminderEvents.length; i++) {
      await ReminderEvents.findByIdAndDelete(user.deletedReminderEvents[i])
    }

    user.deletedReminderEvents = []

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Deleted Reminders delete!!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
