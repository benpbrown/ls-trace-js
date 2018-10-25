'use strict'

const EventEmitter = require('events')
const info = require('./info')
const id = require('./id')
const now = require('./now')
const env = require('./env')
const service = require('./service')
const request = require('./request')
const msgpack = require('./msgpack')

const emitter = new EventEmitter()

const platform = {
  _config: {},
  name: () => 'nodejs',
  version: () => process.version,
  engine: () => process.jsEngine || 'v8',
  configure (config) {
    this._config = config
  },
  info,
  id,
  now,
  env,
  service,
  request,
  msgpack,
  on: emitter.on.bind(emitter),
  once: emitter.once.bind(emitter),
  off: emitter.removeListener.bind(emitter)
}

process.once('beforeExit', () => emitter.emit('exit'))

module.exports = platform
