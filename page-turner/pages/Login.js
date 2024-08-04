/*import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

function Login(props) {
  const [errors, setErrors] = useState({})
  const [name, setName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setErrors({ name: 'Name cannot be empty' })
    } else {
      // Proceed with the login logic
      console.log(`Welcome, ${name}!`)
      // Simulate login and redirect
      props.history.push('/dashboard') // Adjust this path based on your app's structure
    }
  }

  return (
    <div className='form-container'>
      <Form onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>
        <Form.Input
          label="Name"
          placeholder="Enter your name.."
          name="name"
          type="text"
          value={name}
          error={errors.name ? true : false}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) {
              setErrors({})
            }
          }}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Login
*/