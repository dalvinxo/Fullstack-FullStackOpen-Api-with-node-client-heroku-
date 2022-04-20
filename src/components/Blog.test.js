import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {

  let component

  const blog =  {
    author: 'Annie Njanja',
    title: 'Tech firms face higher levies as Kenya plans to double digital service tax',
    url: '"https://techcrunch.com/2022/04/13/tech-firms-face-higher-levies-as-kenya-plans-to-double-digital-service-tax/',
    likes: 7,
    user: {
      username: 'snake sky',
      name: 'Will Smith',
      id: '624a3947e75b1d4beea95155'
    },
    id: '624a4aff70791bda6de4fcaa'
  }

  const deleteBlog = jest.fn()
  const updateBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleDeleteBlog={deleteBlog}
        handleUpdateLike={updateBlog}
      />
    )
  })

  test('renders content author and title from blog 5.13', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)

    expect(component.container).not.toHaveTextContent(
      'https://reactpatterns.com/'
    )
  })

  test('show url and likes when click button 5.14', () => {

    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)

  })

  test('double click button licke 5.15', () => {

    const button = screen.getByText('view')
    fireEvent.click(button)

    const buttonLike = screen.getByText('likes')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(updateBlog.mock.calls).toHaveLength(2)

  })


})