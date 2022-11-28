import { fireEvent, render, screen } from '@testing-library/react'

import App from '../App'

describe('App', () => {
  test('it renders the add todo input', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Create a new task...')
    expect(input).toBeInTheDocument()
  })
})

describe('App', () => {
  test('it adds a todo item to the list', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('Create a new task...')
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    const item = screen.getByDisplayValue('test')
    expect(item).toBeInTheDocument()
  })
})
