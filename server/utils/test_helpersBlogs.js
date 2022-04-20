const InitialBlogs = [
  {
    author: 'Sarah Min',
    title: 'Stock futures bounce as investors assess start of new quarter, bond market recession indicator - CNBC',
    url: 'https://www.cnbc.com/2022/03/31/stock-market-futures-open-to-close-news.html',
    likes: 0
  },
  {
    author: 'Sarah E. Needleman',
    title: 'Four U.S. Senators Cite Microsoft-Activision Deal Concern in FTC Letter - The Wall Street Journal',
    url: 'https://www.wsj.com/articles/u-s-senators-pressure-ftc-to-review-microsoft-activision-merger-11648741204',
    likes: 10
  },
  {
    author: 'Patti Domm',
    title: '2-year Treasury yield tops 10-year rate, a \'yield curve\' inversion that could signal a recession - CNBC',
    url: 'https://www.cnbc.com/2022/03/31/2-year-treasury-yield-tops-10-year-rate-a-yield-curve-inversion-that-could-signal-a-recession.html',
    likes: 15
  }
]

const newBlog = () => {
  return  {
    author: 'Pablo Molina',
    title: 'Inversion that could signal a recession - CNBC',
    url: 'https://www.cnbc.com/2022/03/31/2-year-treasury-yield-tops-10-year-rate-a-yield-curve-inversion-that-could-signal-a-recession.html',
    likes: 2
  }
}

const newBloglikeDefault = () => {
  return  {
    author: 'Pablo Molina',
    title: 'Inversion that could signal a recession - CNBC',
    url: 'https://www.cnbc.com/2022/03/31/2-year-treasury-yield-tops-10-year-rate-a-yield-curve-inversion-that-could-signal-a-recession.html'
  }
}

const newBlogMissingTitleAndUrl = () => {
  return {
    author: 'Theresa Mays',
    likes: 15
  }
}

const contentBlogUpdate = () => {
  return {
    author: 'James P. Pinkerton',
    title: 'Pinkerton: Green First, America Second — Biden\'s Green Actions Speak Louder Than His Words',
    url: 'https://www.breitbart.com/environment/2022/04/02/pinkerton-green-first-america-second-bidens-green-actions-speak-louder-than-his-words/',
  }
}


const baseUrl = '/api/blogs'


const apiHelper = {
  blogs: InitialBlogs,
  url: baseUrl,
  newBlog,
  newBloglikeDefault,
  newBlogMissingTitleAndUrl,
  contentBlogUpdate
}

module.exports = apiHelper
