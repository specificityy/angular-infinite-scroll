var faces = require('cool-ascii-faces').faces;

module.exports = function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  res.write(typeof faces === 'object' && faces.length.toString() || '100');
  res.end();
};