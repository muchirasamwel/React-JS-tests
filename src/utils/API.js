export const getuser = id => {
  return new Promise((resolve, reject) => {
    if (id) {
      setTimeout(
        () => resolve({ name: 'jane doe', age: '20', gender: 'f' }),
        2000
      )
    } else {
      reject('No id provided')
    }
  })
}
