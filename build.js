const fs = require('fs')

console.log('\n\n\n\n')

fs.readFile('./dist/main.js', 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  
  const buildFileWrappedWithScriptTags = '<script>' + data + '</script>'

  fs.writeFile('./dist/test.html', buildFileWrappedWithScriptTags, err => {
    if (err) {
      console.log(err)
      return
    }
    console.log('Success!')
  })
})