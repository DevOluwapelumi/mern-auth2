import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../redux/slices/usersApiSlice'
import { setCredentials } from '../redux/slices/authSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
   <FormContainer>
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
  <h1 className="text-center mb-4">Sign In</h1>

  <Form onSubmit={submitHandler}>
    <Form.Group controlId='email'>
      <Form.Label>Email Address</Form.Label>
      <Form.Control
        type='email'
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId='password'>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Group>

    {isLoading && <Loader />}

    <Button type='submit' variant='primary' className='w-100 mt-3'>
      Sign In
    </Button>

    <Row className='py-3'>
      <Col className="text-center">
        New Customer? <Link to='/register'>Register</Link>
      </Col>
    </Row>
  </Form>
</div>  
</FormContainer>

  )
}

export default Login
