require('dotenv').config()

export default theFunction => {
  if (process.env.RASPBERRY === '1') {
    theFunction()
  }
}
