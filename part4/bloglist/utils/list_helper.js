const dummy = (blog) => {
  return 1
}

const totalLikes = (blog) => {
  return blog.reduce((sum, likes) => {
    return sum + likes.likes
  }, 0)
}

const favoriteBlog = (blog) => {
  return blog.reduce((firstElement, secondElement) =>
    firstElement.likes > secondElement.likes ? firstElement : secondElement
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
