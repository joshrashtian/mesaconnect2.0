import React, { Component } from 'react'
import Viewposts from './viewposts'

export interface AdminPanel {
  name: string
  displayname: string
  permissions: string[]
  component: any
}
const AdminIndex: AdminPanel[] = [
  {
    name: 'Home',
    displayname: 'Dashboard',
    permissions: ['admin'],
    component: () => (
      <main>
        <h1>Dashboard Home </h1>
      </main>
    )
  },
  {
    name: 'posts',
    displayname: 'View Posts',
    permissions: ['admin'],
    component: () => <Viewposts />
  }
]

export default AdminIndex
