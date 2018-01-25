import { Blob } from './blob.mjs'
import { GUI } from '../vendor/dat.gui.min.js'

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

    this.gui = new GUI()

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
      shadowColor: '#28b4d7'
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
    const blobId = this.blobs.length
    const blob = new Blob(this.ctx, blobOptions)
    const blobGui = this.gui.addFolder(`Blob ${id}`)
    blobGui.add(blob.localOptions.size, 'Size').min(0)
    blobGui.add(blob.localOptions.fillColor, 'Color')
    blobGui.add(blob.localOptions.shadowColor, 'Shadow Color')
    blobGui.add(blob.localOptions.shadowBlur, 'Blur')
    blobGui.add(blob.localOptions.waves, 'Waves').min(1)
    blobGui.add(blob.localOptions.thetaResolution, 'Theta')
    this.blobs.push(blob)
  }

  deleteBlob (blobId) {
    this.blobs.pop(blobId)
  }

  updateBlob (blobId, blobOptions = {}) {
    this.blobs[blobId].options(blobOptions)
  }
}

new App()
