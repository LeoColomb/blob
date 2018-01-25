import { Blob } from './blob.mjs'
import dat from '../vendor/dat/index.js'

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

    this.gui = new dat.GUI()
    this.gui.add(this, 'addBlob')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.blobs = []
    this.addBlob({
      size: 1.1,
      color: '#2169b3'
    })
    this.addBlob({
      size: 1.05,
      color: '#28b4d7',
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
    const blob = new Blob(this.ctx, blobOptions)
    const blobGui = this.gui.addFolder(`Blob ${this.blobs.length + 1}`)
    blobGui.add(blob.localOptions, 'size', 0, 2)
    blobGui.addColor(blob.localOptions, 'color')
    blobGui.add(blob.localOptions, 'shadowBlur', -30, 100)
    blobGui.add(blob.localOptions, 'waves', 1, 100)
    blobGui.add(blob.localOptions, 'thetaResolution', 0.001, 0.5)
    blob.attach(blobGui)
    this.blobs.push(blob)
  }

  deleteBlob (blobId) {
    const blob = this.blobs.splice(blobId, 1)[0]
    this.gui.removeFolder(blob.attached)
  }

  updateBlob (blobId, blobOptions = {}) {
    this.blobs[blobId].options(blobOptions)
  }
}

new App() // eslint-disable-line no-new
