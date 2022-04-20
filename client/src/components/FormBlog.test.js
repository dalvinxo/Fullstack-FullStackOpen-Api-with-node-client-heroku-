import { render, screen, fireEvent } from '@testing-library/react'
import FormBlog from './FormBlog'
import '@testing-library/jest-dom/extend-expect'


describe('<FormBlog />', () => {

  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <FormBlog createBlog={createBlog}/>
    )
  })

  test('check data from new blog, 5.16', () => {

    const newBlog = {
      title: 'Twitter bots helped build the cult of Elon Musk and Tesla. But who\'s creating them?',
      author: 'Russ Mitchell',
      url: 'https://techxplore.com/news/2022-04-twitter-bots-cult-elon-musk.html'
    }


    const title = screen.getByTestId('title')
    const author = screen.getByTestId('author')
    const url = screen.getByTestId('url')

    fireEvent.change(title, {
      target : {
        name: 'title',
        value: newBlog.title
      }
    })

    fireEvent.change(author, {
      target : {
        name: 'author',
        value: newBlog.author
      }
    })

    fireEvent.change(url, {
      target : {
        name: 'url',
        value: newBlog.url
      }
    })


    const form = component.container.querySelector('form')

    fireEvent.submit(form)

    const blogSend = createBlog.mock.calls[0][0]

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(blogSend.title).toBe(newBlog.title)
    expect(blogSend.author).toBe(newBlog.author)
    expect(blogSend.url).toBe(newBlog.url)

  })

})