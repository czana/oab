var Python = require('python-shell')

export default function(soundPath) {
  var options = { mode: 'text', args: [soundPath] }
  Python.run('src/play_sound.py', options, function(err) {})
}
