const listUser = [
  // {
  //   username: 'MarthZ',
  //   name: 'Math Will',
  //   password: '$2a$10$8U12niMpxG3wvOEKdicp7e5fWvt.ddSKpnus5S6swFa6K.65WCEji'
  // },
  {
    username: 'SnakeGood',
    name: 'Dalvin Molina',
    password: '$2a$10$tcjPrY43MTRcmreS5eBN3eY8VkFOBnT5sBb28y//tR5X8VMR9HQA6'
  }
]

const listBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
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

const exportUserForTest = {
  users: listUser,
  blogs: listBlogs
}

module.exports = exportUserForTest