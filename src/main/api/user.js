const API_URL = 'http://localhost:8080/api/'
function login(data) {
  return new Promise((resolve, reject) => {
    fetch(API_URL + 'user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        // 登录太快会一闪而过, 这里加个延时
        setTimeout(() => {
          resolve(data)
        }, 800)
      })
      .catch((error) => {
        setTimeout(() => {
          reject({
            code: 0,
            data: null,
            msg: error.message,
            time: Math.floor(Date.now() / 1000)
          })
        }, 800)
      })
  })
}

export { login }
