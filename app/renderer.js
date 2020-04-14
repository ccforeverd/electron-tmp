// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  const replaceLoading = (selector, onEnd) => {
    const element = document.getElementById(selector)
    const count = parseInt(element.innerText)
    if (isNaN(count)) return
    setTimeout(() => {
      if (count - 1 < 0) return onEnd()
      element.innerHTML = count - 1
      replaceLoading(selector, onEnd)
    }, 999)
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  for (const type of ['vue', 'vuex', 'vue-router']) {
    replaceText(`${type}-version`, require(type).version)
  }

  replaceLoading('loading-number', () => {
    const { remote } = require('electron')
    remote.app.createMainWindow()
    remote.app.setLoading(false)
    window.close()
  })
})
