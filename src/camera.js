import { Raspistill } from 'node-raspistill'

export const filePath = (id) => {
  return `./images/${id}.png`
}

export default id => {
  return new Raspistill({
    mode: 'photo',
    outputDir: './images',
    fileName: `${id}.png`,
    width: 1280,
    height: 720,
    encoding: 'png',
    time: 1000,
    shutterspeed: 10000
  }).takePhoto()
}
