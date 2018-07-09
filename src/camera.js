import PiCamera from 'pi-camera'

export const filePath = (id) => {
  return `./images/${id}.png`
}

export default id => {
  return new PiCamera({
    mode: 'photo',
    output: filePath(id),
    width: 1280,
    height: 720,
    nopreview: true,
    encoding: 'png'
  }).snap()
}
