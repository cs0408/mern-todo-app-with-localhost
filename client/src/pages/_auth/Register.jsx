import React, { useEffect, useState } from 'react'
import { Link as NavLink, useNavigate } from 'react-router-dom'
import {
  CheckBoxControl,
  Container,
  Form,
  FormButton,
  FormField,
  Header,
  Links,
  SubContainer,
} from './components'
import { ExitToApp } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { registerUser } from '../../redux/Actions/authAction'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, message } = useSelector((state) => state.auth)
  const alert = useAlert()

  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termCondition: false,
  })

  const inputEvent = (event) => {
    const { name, value } = event.target
    setUser((previousVale) => {
      if (name === 'termCondition') {
        return {
          ...previousVale,
          [name]: !user.termCondition,
        }
      } else {
        return {
          ...previousVale,
          [name]: value,
        }
      }
    })
  }

  const handleForm = (e) => {
    e.preventDefault()
    const { fullName, email, password, confirmPassword, termCondition } = user

    dispatch(
      registerUser(fullName, email, password, confirmPassword, termCondition)
    )
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearErrors' })
    }
    if (message) {
      alert.success(message)
      setUser({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termCondition: false,
      })
      dispatch({ type: 'clearMessage' })
      navigate('/')
    }
  }, [dispatch, error, alert, message])

  return (
    <Container>
      <SubContainer>
        <Header icon={<ExitToApp />} title='Sign Up' />
        <Form>
          <FormField
            name='fullName'
            label='Full Name'
            placeholder='e.g. Arun kumar'
            type='text'
            onChange={inputEvent}
            value={user.fullName}
          />
          <FormField
            name='email'
            label='Email'
            placeholder='e.g. abc@gmail.com'
            type='email'
            onChange={inputEvent}
            value={user.email}
          />
          <FormField
            name='password'
            label='Password'
            placeholder='*******'
            type='password'
            onChange={inputEvent}
            value={user.password}
          />
          <FormField
            name='confirmPassword'
            label='Confirm Password'
            placeholder='*******'
            type='password'
            onChange={inputEvent}
            value={user.confirmPassword}
          />
          <CheckBoxControl
            name='termCondition'
            onChange={inputEvent}
            value={user.termCondition}
            label='Accepts Terms &amp; Conditions.'
          />
          <FormButton onClick={handleForm} label='Sign Up' />
        </Form>
        <Links>
          Do you have an account ? <NavLink to='/'>Sign In</NavLink>
        </Links>
      </SubContainer>
    </Container>
  )
}

export default Register
