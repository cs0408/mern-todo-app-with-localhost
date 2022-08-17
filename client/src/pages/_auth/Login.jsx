import React, { useEffect, useState } from 'react'
import { Link as NavLink } from 'react-router-dom'
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
import { LockOutlined } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loginUser } from '../../redux/Actions/authAction'

const Login = () => {
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.auth)
  const alert = useAlert()

  const [user, setUser] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  // handle field
  const inputEvent = (event) => {
    const { name, value } = event.target
    setUser((previousVale) => {
      if (name === 'rememberMe') {
        return {
          ...previousVale,
          [name]: !user.rememberMe,
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
    const { email, password, rememberMe } = user
    dispatch(loginUser(email, password, rememberMe))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: 'clearErrors' })
    }
  }, [dispatch, error, alert])

  return (
    <Container>
      <SubContainer>
        <Header icon={<LockOutlined />} title='Sign In' />
        <Form>
          <FormField
            name='email'
            label='User Email'
            placeholder='e.g. abc@gmail.com'
            type='email'
            onChange={inputEvent}
            value={user.email}
          />
          <FormField
            name='password'
            label='Password'
            placeholder='e.g. 123456'
            type='password'
            onChange={inputEvent}
            value={user.password}
          />
          <CheckBoxControl
            name='rememberMe'
            onChange={inputEvent}
            value={user.rememberMe}
            label='Remember me'
          />
          <FormButton onClick={handleForm} label='Sign In' />
        </Form>
        <Links>
          <NavLink to='/forgot/password'>Forgot password ?</NavLink>
        </Links>
        <Links>
          Do you haven't an account ? <NavLink to='/register'>Sign Up</NavLink>
        </Links>
      </SubContainer>
    </Container>
  )
}

export default Login
