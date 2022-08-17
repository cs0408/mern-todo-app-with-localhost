import React, { useState } from 'react'
import { Link as NavLink } from 'react-router-dom'
import {
  Container,
  Form,
  FormButton,
  FormField,
  Header,
  Links,
  SubContainer,
} from './components'
import { LockOpen } from '@material-ui/icons'

const ForgotPassword = () => {
  // field state
  const [user, setUser] = useState({
    email: '',
  })

  // handle field
  const inputEvent = (event) => {
    const { name, value } = event.target
    setUser((previousVale) => {
      return {
        ...previousVale,
        [name]: value,
      }
    })
  }

  // handle submit form
  const handleForm = (e) => {
    e.preventDefault()
  }

  return (
    <Container>
      <SubContainer>
        <Header
          icon={<LockOpen />}
          title='Forgot Your Password?'
          subTitle='You can reset your password here.'
        />
        <Form>
          <FormField
            name='email'
            label='Email'
            placeholder='e.g. abc@gmail.com'
            type='email'
            onChange={inputEvent}
            value={user.email}
          />
          <FormButton onClick={handleForm} label='send verification code' />
        </Form>
        <Links>
          Go back to? <NavLink to='/'>Sign In</NavLink>
        </Links>
      </SubContainer>
    </Container>
  )
}

export default ForgotPassword
