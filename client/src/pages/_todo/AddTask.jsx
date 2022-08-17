import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { addTask, getRemainingTasks } from '../../redux/Actions/todoTaskAction'
import {
  Container,
  DateTimeInputPicker,
  FormContainer,
  InputField,
  SubmitButton,
} from './components'
import RemainingList from './RemainingList'

const AddTask = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const [taskTitle, setTaskTitle] = useState('')
  const [inputError, setInputError] = useState('')
  const [value, setValue] = useState(new Date())

  const { loading, remainingTaskList } = useSelector(
    (state) => state.getTodoTasks
  )

  useSelector((state) => console.log('State = ', state))

  const handleInput = async (e) => {
    e.target.value.length < 6
      ? setInputError("Task atleast have 6 character's.")
      : e.target.value.length > 50
      ? setInputError('Task should not be more than 50 characters..')
      : setInputError('')

    setTaskTitle(e.target.value)
  }

  //handle submit
  const submitForm = async (e) => {
    e.preventDefault()
    await dispatch(addTask({ taskTitle, taskDate: value }))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearErrors' })
    }

    if (message) {
      alert.success(message)
      dispatch({ type: 'clearMessage' })
      setTaskTitle('')
      setValue(new Date())
    }

    dispatch(getRemainingTasks())
  }, [])

  return (
    <Container>
      <FormContainer
        formTitle='Add your daily routine task....!!'
        submitForm={submitForm}
      >
        <InputField
          label='write your task here..'
          taskTitle={taskTitle}
          handleInput={handleInput}
          inputError={inputError}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DateTimeInputPicker
            // minTime={new Date()}
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            helperText='Check am or pm'
          />
          <SubmitButton
            title='ADD TASK'
            type='submit'
            variant='contained'
            color='primary'
          />
        </div>
      </FormContainer>

      <RemainingList loading={loading} remainingTaskList={remainingTaskList} />
    </Container>
  )
}

export default AddTask
