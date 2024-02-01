import React, {useState} from 'react'
import axios from 'axios';

function Login() {
  const [login, setLogin] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    username: '',
    errors: []
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    const {email, password, username} = formState;
    if(!email || !password){
      setFormState(prevState => {
        return {
          ...formState,
          errors: prevState.errors.push('Email & Password are required')
        }
      })
      return
    }
    if(!username){
      setFormState({
        ...formState,
        username: 'Guest'
      })
    }
    try{
      const res = await axios.post(`http://localhost:8000/auth/${!login ? 'register' : 'login'}`, formState);
      const {token} = res.data;
      localStorage.setItem('token', token);
      window.location.href = '/todo-page';
      console.log(res);
    } catch(err) {
      console.error("login error:", err);
    }

  }

  return (
    <>
      <h1><span onClick={() => setLogin(true)} style={{color: 'Orange', cursor: "pointer"}}>SignIn</span>  or <span onClick={() => setLogin(false)} style={{color: 'blue', cursor: 'pointer'}}>SignUp</span> to continue</h1>
      <form>
        Email: <input type="text" value={formState.email} name="email" onChange={handleChange} />
        <br />
        Password: <input type="text" value={formState.password} name="password" onChange={handleChange} />
        <br />
        Username: <input type="text" value={formState.username} name="username" onChange={handleChange} />
        <br />
        <button type="button" onClick={handleSubmit} >{!login ? 'Register' : 'Login'}</button>
      </form>
    </>
  )
}

export default Login