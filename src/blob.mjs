/**
 * Blob for Graphism.fr
 * Copyright (c) 2016 Geoffrey Dorne SAS. All Rights Reserved.
 *
 * @author 2013 Dionysis Zindros (www.dionyziz.com)
 * @author 2016-2018 Léo Colombaro (colombaro.fr)
 */
export class Blob {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param options
   */
  constructor (context, options = {}) {
    this.time = new Date() | 0
    this.options(options)

    this.context = context
    this.radius = window.innerWidth / 800
    this.generateWaves()
  }

  options (options = {}) {
    this.localOptions = Object.assign({
      size: 1.0,
      color: '#ffffff',
      shadowBlur: 30,
      waves: 7,
      thetaResolution: 0.05
    }, options)
  }

  attach (injected) {
    this.attached = injected
  }

  generateWaves () {
    this.waves = []
    for (let i = 0; i < this.localOptions.waves; ++i) {
      this.waves[i] = new Wave()
    }
  }

  polarFunction (theta) {
    let r = this.radius
    for (const wave of this.waves) {
      r += wave.alpha * Math.sin(wave.omega * theta + wave.phi)
    }
    return r * 2
  }

  drawFrame () {
    this.context.shadowColor = this.localOptions.color
    this.context.shadowBlur = this.localOptions.shadowBlur * this.radius
    this.context.fillStyle = this.localOptions.color
    this.context.beginPath()
    for (let theta = 0; theta < 2 * Math.PI; theta += this.localOptions.thetaResolution) {
      const r = 65 * this.polarFunction(theta) * this.localOptions.size
      this.context.lineTo(
        window.innerWidth / 2 + r * Math.cos(theta),
        window.innerHeight / 2 + r * Math.sin(theta)
      )
    }
    this.context.fill()
  }

  integrate (dt) {
    for (const wave of this.waves) {
      const nextLife = wave.life + dt
      if (nextLife > wave.lifeTime) {
        wave.init()
      } else {
        wave.phi += dt * wave.deltaPhi
        wave.alpha = wave.maxAlpha * Math.sin(Math.PI * wave.life / wave.lifeTime)
        wave.life = nextLife
      }
    }
  }

  render () {
    this.integrate((new Date() | 0) - this.time)
    this.time = new Date() | 0
    this.drawFrame()
  }
}

class Wave {
  constructor () {
    this.init()
  }

  init () {
    this.maxAlpha = Math.random() / 20
    this.alpha = 0
    this.omega = Math.floor(Math.random() * 10)
    this.phi = Math.random() * 2 * Math.PI
    this.deltaPhi = (0.5 - Math.random()) / 50
    this.life = 0
    this.lifeTime = 1000 + Math.random() * 1000
  }
}
