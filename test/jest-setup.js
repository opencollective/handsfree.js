require('jest-canvas-mock')

// currentScript
const script = document.createElement('script')
script.setAttribute('src', '')
Object.defineProperty(document, 'currentScript', {
  value: script
})
