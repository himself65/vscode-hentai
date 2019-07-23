const app = require('./')
const port = process.env.PORT || 3000

app.listen(port, () => {
  if (process.env.NODE_ENV !== 'test') { console.log('mock server loaded') }
})
