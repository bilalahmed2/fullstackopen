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

const mostLikes = (blog) => {
  return blog.reduce((firstElement, secondElement) => firstElement.likes > secondElement.likes ? { 'author': firstElement.author, 'likes': firstElement.likes } : { 'author': secondElement.author, 'likes': secondElement.likes } )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes
}
