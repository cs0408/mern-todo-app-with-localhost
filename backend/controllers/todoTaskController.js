const TodoTasks = require('../models/todoTaskModel')
const Users = require('../models/userModel')

// ================================= Add, Check, Delete reminder ============================
exports.addTodoTask = async (req, res) => {
  try {
    const { taskTitle, taskDate } = req.body

    // validation date, date should not be less than today's
    if (new Date(taskDate).toDateString() < new Date().toDateString()) {
      return res.status(401).json({
        success: false,
        message: "Date should not be older than today's.",
      })
    }

    const newTaskData = {
      taskTitle,
      taskDate,
      owner: req.user._id,
    }

    // add into TodoTasks
    const newTask = await TodoTasks.create(newTaskData)

    // // find user by ID and add task id into user - remainingTodoTasks
    const user = await Users.findById(req.user._id)
    user.remainingTodoTasks.unshift(newTask._id)

    await newTask.save()
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Task added!!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.checkTodoTask = async (req, res) => {
  try {
    let taskFinded = await TodoTasks.findById(req.params.id)

    // check task available or not
    if (!taskFinded) {
      return res.status(200).json({
        success: false,
        message: 'Task not found.',
      })
    }

    // check task owner same as login user
    if (taskFinded.owner.toString() !== req.user._id.toString()) {
      return res.status(200).json({
        success: false,
        message: 'UnAuthorized.',
      })
    }

    // check, those task we tick as completed is now date or not
    if (
      new Date(taskFinded.taskDate).toDateString() < new Date().toDateString()
    ) {
      return res.status(200).json({
        success: false,
        message: 'You could not be able to check previous task.',
      })
    }

    // check, those task we tick as completed is now date or not
    if (
      new Date(taskFinded.taskDate).toDateString() > new Date().toDateString()
    ) {
      return res.status(200).json({
        success: false,
        message: "You can't check the future task, only you can delete it.",
      })
    }

    // check task already deleted or not
    if (taskFinded.deletedAt) {
      return res.status(200).json({
        success: false,
        message: 'Task already deleted.',
      })
    }

    // check task already mark or not
    if (taskFinded.completedAt) {
      return res.status(200).json({
        success: false,
        message: 'Task already marked.',
      })
    }

    // save task completedAt date
    taskFinded.completedAt = new Date()

    // find user
    let user = await Users.findById(req.user._id)
    // add task ID into user - completedTodoTasks
    user.completedTodoTasks.unshift(taskFinded._id)
    // delete task ID from user - remainingTodoTasks
    let index = await user.remainingTodoTasks.indexOf(taskFinded._id)
    user.remainingTodoTasks.splice(index, 1)

    await taskFinded.save()
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Great!! you did it.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteTodoTask = async (req, res) => {
  try {
    const taskFinded = await TodoTasks.findById(req.params.id)

    // check task is available or not
    if (!taskFinded) {
      return res.status(200).json({
        success: false,
        message: 'Task not found.',
      })
    }

    // check task owner is same as login user
    if (taskFinded.owner.toString() !== req.user._id.toString()) {
      return res.status(200).json({
        success: false,
        message: 'UnAuthorized.',
      })
    }

    // check task already completed or not
    if (taskFinded.completedAt) {
      return res.status(200).json({
        success: false,
        message: 'Task already completed.',
      })
    }

    // check task already deleted or not
    if (taskFinded.deletedAt) {
      return res.status(200).json({
        success: false,
        message: 'Task already deleted.',
      })
    }

    // not delete previous task
    if (
      new Date(taskFinded.taskDate).toDateString() < new Date().toDateString()
    ) {
      return res.status(200).json({
        success: false,
        message: 'You could not be able to delete previous task.',
      })
    }

    // update date of task
    taskFinded.deletedAt = new Date()

    // find user of task
    const user = await Users.findById(req.user._id)
    // add task ID into user - deletedTodoTasks
    user.deletedTodoTasks.unshift(taskFinded._id)
    // delete user ID from user - remainingTodoTasks
    const index = await user.remainingTodoTasks.indexOf(taskFinded._id)
    user.remainingTodoTasks.splice(index, 1)

    await taskFinded.save()
    await user.save()

    res.status(200).json({
      success: true,
      message: 'Ohh!! You delete the task.',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// =========================================== Get remaining, checked, deleted tasks =========
exports.getRemainingTodoTasks = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'remainingTodoTasks'
    )

    // find user id same as login user
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized..',
      })
    }

    // sort by date
    await user.remainingTodoTasks.sort(function (a, b) {
      return new Date(a.taskDate) - new Date(b.taskDate)
    })

    res.status(200).json({
      success: true,
      todoTaskList: user.remainingTodoTasks,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getCompletedTodoTasks = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'completedTodoTasks'
    )

    // // check task user is same as login user
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized..',
      })
    }

    // sort by completed date
    await user.completedTodoTasks.sort(function (a, b) {
      return new Date(b.completedAt) - new Date(a.completedAt)
    })

    res.status(200).json({
      success: true,
      todoCompleteTaskList: user.completedTodoTasks,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getDeletedTodoTasks = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate('deletedTodoTasks')

    // check task user is same as login user
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    // sort by deleted date
    await user.deletedTodoTasks.sort(function (a, b) {
      return new Date(b.deletedAt) - new Date(a.deletedAt)
    })

    res.status(200).json({
      success: true,
      todoDeleteTaskList: user.deletedTodoTasks,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ============================== Delete all remaining, checked, deleted tasks =============
exports.deleteRemainingTodoTasks = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id).populate(
      'remainingTodoTasks'
    )

    // check user is found or not
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized.',
      })
    }

    // delete from todoTasks
    for (let i = 0; i < user.remainingTodoTasks.length; i++) {
      const taskFinded = user.remainingTodoTasks[i]
      const taskFindedOFTodoTasks = await TodoTasks.findById(taskFinded._id)

      // if task already deleted
      if (taskFindedOFTodoTasks.deletedAt) {
        await user.deletedTodoTasks.unshift(taskFinded._id)
      }

      // if task is not already deleted
      if (!taskFindedOFTodoTasks.deletedAt) {
        // update deletedAt field
        taskFindedOFTodoTasks.deletedAt = new Date()
        await taskFindedOFTodoTasks.save()
        // add ID into user - deletedTodoTasks
        await user.deletedTodoTasks.unshift(taskFinded._id)
      }
    }

    user.remainingTodoTasks = []

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Delete all uncompleted tasks!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteRemainingPreviousTodoTasks = async () => {
  try {
    let tasks = await TodoTasks.find({})
    let users = await Users.find({})

    for (let i = 0; i < users.length; i++) {
      const userFind = users[i]

      // temp - store remaining task ID
      const tempIdStore = []

      for (let j = 0; j < userFind.remainingTodoTasks.length; j++) {
        const userRemainingTaskFind = userFind.remainingTodoTasks[j]

        tempIdStore.push(userRemainingTaskFind)
      }

      // update field value of TodoTasks
      for (let k = 0; k < tempIdStore.length; k++) {
        const taskId = tempIdStore[k]

        for (let l = 0; l < tasks.length; l++) {
          const taskFind = tasks[l]

          if (taskId.toString() === taskFind._id.toString()) {
            // check if task is not complete, delete and previous date
            if (
              taskFind.deletedAt === null &&
              taskFind.completedAt === null &&
              new Date(taskFind.taskDate).toDateString() <
                new Date().toDateString()
            ) {
              // update task deleetd date
              taskFind.deletedAt = new Date()
              // add task ID into users - deletedTodoTasks
              await userFind.deletedTodoTasks.unshift(taskFind._id)
              // deleet ID from user - remainingTodoTasks
              const index = userFind.remainingTodoTasks.indexOf(taskFind._id)
              await userFind.remainingTodoTasks.splice(index, 1)
            }
          }

          await taskFind.save()
        }
      }

      await userFind.save()
    }
  } catch (error) {
    console.log(error)
  }
}

exports.deleteCompletedTodoTasks = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    // delete from todoTasks
    for (let i = 0; i < user.completedTodoTasks.length; i++) {
      await TodoTasks.findByIdAndDelete(user.completedTodoTasks[i])
    }

    user.completedTodoTasks = []

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Delete all completed tasks!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.deleteDeletedTodoTasks = async (req, res) => {
  try {
    const user = await Users.findById(req.user._id)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized or User not found..',
      })
    }

    // delete from todoTasks
    for (let i = 0; i < user.deletedTodoTasks.length; i++) {
      await TodoTasks.findByIdAndDelete(user.deletedTodoTasks[i])
    }

    user.deletedTodoTasks = []

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Delete all deleted tasks!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
