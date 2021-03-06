import React from 'react'
import ReactDOM from 'react-dom'
import { BoardMemberProfile } from '../BoardMemberProfile'

const member = {
  id: 'test',
  fname: 'hello',
  lname: 'world',
  positionType: 'ECC',
  positionPriority: 1,
}

describe('render', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<BoardMemberProfile member={member} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
