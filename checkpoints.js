// Copyright (c) 2019, Brandon Lehmann, The TurtleCoin Developers
// Copyright (c) 2019, The Plenteum Developers
//
// Please see the included LICENSE file for more information.

const fs = require('fs')
const http = require('https')

console.log('Downloading latest checkpoints file...')

/* Delete the old checkpoints file, if present */
fs.unlink('checkpoints.csv', (err) => {
  if (err) {
    console.log('Old checkpoints file not present, skipping delete...')
  } else {
    console.log('Deleting old checkpoints file...')
  }

  /* Download the new checkpoints file */
  download('https://raw.githubusercontent.com/plenteum/checkpoints/master/checkpoints.csv', 'checkpoints.csv', (err) => {
    if (err) {
      throw err
    }

    console.log('Downloaded latest checkpoints to checkpoints.csv...')
  })
})

function download (url, destination, callback) {
  const file = fs.createWriteStream(destination)

  http.get(url, function (response) {
    response.pipe(file)
    file.on('finish', function () {
      file.close(callback)
    })
  })
}
