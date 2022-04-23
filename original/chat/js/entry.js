;((doc, storage, location) => {
  const oUsername = doc.querySelector('#username')
  const oEnterBtn = doc.querySelector('#entry')

  const init = () => {
    bindEvent()
  }

  function bindEvent () {
    oEnterBtn.addEventListener('click', handleEntryBtnClick, false)
  }

  function handleEntryBtnClick () {
    const username = oUsername.value.trim()

    if (username.length < 6) {
      alert('用户名不小于6位')
      return
    }

    storage.setItem('username', username)
    location.href = 'index.html'

  }

  init()
})(document, localStorage, location)