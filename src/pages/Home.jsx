import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0b1020', color:'#fff'}}>
      <div style={{textAlign:'center'}}>
        <h1>Dinex Menu</h1>
        <p>Your app home screen.</p>
        <Link to="/login" style={{color:'#7d5cff', textDecoration:'underline'}}>Go to Login</Link>
      </div>
    </div>
  )
}