import { Blob } from './blob.mjs'

/**
 * Blobs
 * Copyright (c) 2018 Léo Colombaro
 *
 * @author 2018 Léo Colombaro (colombaro.fr)
 */
class App {
  constructor () {
    const canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.blobs = []
    this.addBlob({
      size: 1.1,
      fillColor: '#2169b3',
      shadowColor: '#2169b3'
    })
    this.addBlob({
      size: 1.05,
      fillColor: '#28b4d7',
      shadowColor: '#28b4d7',
      waves: 12
    })
    this.addBlob()
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
