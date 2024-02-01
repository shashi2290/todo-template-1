import React from 'react'

function Thanks() {
  return (
    <>
      <div>Thanks for using our app</div>
      <br />
      <h2> Wish to login again </h2>
      <br>
      </br>
      <button onClick={() => window.location.href = '/'} >Login</button>
    </>
  )
}

export default Thanks