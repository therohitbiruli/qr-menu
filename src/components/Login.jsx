import React, {useState} from 'react'
import './Login.css'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    // placeholder - replace with real auth
    alert('Logged in (demo): ' + email)
  }

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="logo">DINEX</div>
        <h2>Welcome back</h2>
        <p className="sub">Sign in to continue</p>

        <label className="field">
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
          <span>Email</span>
        </label>

        <label className="field">
          <input type={show ? 'text' : 'password'} value={password} onChange={e=>setPassword(e.target.value)} required />
          <span>Password</span>
          <button type="button" className="show-btn" onClick={()=>setShow(s=>!s)}>{show? 'Hide' : 'Show'}</button>
        </label>

        <button className="signin-btn" type="submit">Sign In</button>

        <div className="alt">
          <a href="#">Forgot password?</a>
          <a href="#">Create account</a>
        </div>

        <div className="neon-lines">
          <div></div><div></div><div></div>
        </div>
      </form>
    </div>
  )
}