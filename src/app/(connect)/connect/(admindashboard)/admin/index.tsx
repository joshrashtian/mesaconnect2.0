import React, { Component } from 'react'
import Viewposts from './viewposts'
import ViewUsers from './ViewUsers'

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
  },
  {
    name: 'users',
    displayname: 'View Users',
    permissions: ['admin'],
    component: () => <ViewUsers />
  }
]

export default AdminIndex
