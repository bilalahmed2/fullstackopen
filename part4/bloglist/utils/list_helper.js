const dummy = (blog) => {
  return 1
}

const totalLikes = (blog) => {
  return blog.reduce((sum, likes) => {return sum + likes.likes}, 0 )
}

module.exports = {
  dummy,
  totalLikes
}