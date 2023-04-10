import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <h1>Header user</h1>
        <main>
            <Outlet/>
        </main>

        <h1>
            Footer user
        </h1>
    </div>
  )
}

export default UserLayout