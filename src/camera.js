import { Raspistill } from 'node-raspistill'

export const fileDir = () => {
  return './images'
}

export default id => {
  return new Raspistill({
    mode: 'photo',
    outputDir: fileDir(),
    fileName: id,
    width: 1280,
    height: 720,
    encoding: 'png',
    time: 1000,
    shutterspeed: 35000
  }).takePhoto()
}
