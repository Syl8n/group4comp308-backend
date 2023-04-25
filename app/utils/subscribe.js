const resMap = {};

exports.subscribe = function (req, res) {
  if (!req.user || req.user.role !== 'NURSE') {
    throw new Error('You are not a nurse');
  }
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write(`data: ${JSON.stringify({message: 'connected'})}\n\n`)

  res.on('close', () => {
    console.log('sse conn closed by client')
    res.end()
  })
  resMap[req.user._id] = res
}

exports.push = function () {
  Object.keys(resMap).forEach(key => {
    resMap[key].write(`data: ${JSON.stringify({message: 'push'})}\n\n`)
  })
}