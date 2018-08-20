'use strict'

const Plenteumd = require('./')
const util = require('util')

var daemon = new Plenteumd({
  // Load additional daemon parameters here
})

function log (message) {
  console.log(util.format('%s: %s', (new Date()).toUTCString(), message))
}

daemon.on('start', (args) => {
  log(util.format('Plenteumd has started... %s', args))
})

daemon.on('started', () => {
  log('Plenteumd is attempting to synchronize with the network...')
})

daemon.on('syncing', (info) => {
  log(util.format('Plenteumd has syncronized %s out of %s blocks [%s%]', info.height, info.network_height, info.percent))
})

daemon.on('synced', () => {
  log('Plenteumd is synchronized with the network...')
})

daemon.on('ready', (info) => {
  log(util.format('Plenteumd is waiting for connections at %s @ %s - %s H/s', info.height, info.difficulty, info.globalHashRate))
})

daemon.on('desync', (daemon, network, deviance) => {
  log(util.format('Plenteumd is currently off the blockchain by %s blocks. Network: %s  Daemon: %s', deviance, network, daemon))
})

daemon.on('down', () => {
  log('Plenteumd is not responding... stopping process...')
  daemon.stop()
})

daemon.on('stopped', (exitcode) => {
  log(util.format('Plenteumd has closed (exitcode: %s)... restarting process...', exitcode))
  daemon.start()
})

daemon.on('info', (info) => {
  log(info)
})

daemon.on('error', (err) => {
  log(err)
})

daemon.start()
