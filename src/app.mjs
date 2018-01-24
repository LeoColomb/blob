import { Blob } from './blob.mjs'

class App {
  constructor () {
    const canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.blobs = []
    this.blobs.push(new Blob(this.ctx, {
      fillColor: 'red',
      shadowColor: 'red'
    }))
    this.blobs.push(new Blob(this.ctx, {}))
    this.frameRequestId = this.frame()
  }

  destroyer () {
    window.cancelAnimationFrame(this.frameRequestId)
  }

  frame () {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    for (const blob of this.blobs) {
      blob.render()
    }
    return window.requestAnimationFrame(this.frame.bind(this))
  }

  getBlob (blobId) {
    return this.blobs[blobId].localOptions
  }

  addBlob (blobOptions = {}) {
    this.blobs.push(new Blob(this.ctx, blobOptions))
  }

  deleteBlob (blobId) {
    this.blobs.pop(blobId)
  }

  updateBlob (blobId, blobOptions = {}) {
    this.blobs[blobId].options(blobOptions)
  }
}

new App()
