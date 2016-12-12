const Application = require('spectron').Application
const assert = require('chai').assert
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
const appPath = path.join(__dirname, '..', 'app')
const FileBin = require('file-bin')
const fileBinPath = path.join(__dirname, 'test-files')
const fileBin = new FileBin(fileBinPath, ['.jpg'])

global.before(() => {
  chai.should()
  chai.use(chaiAsPromised)
})

describe('App starts and renders correctly', () => {
  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]})
    return app.start()
  })

  afterEach(() => {
    return app.stop()
  })

  it('opens a window', () => {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
  })

  it('browser window is visible', () => {
    return app.browserWindow.isVisible().then((isVisible) => {
      assert.equal(isVisible, true)
    })
  })

  it('browser window dimensions', () => {
    return app.browserWindow.getBounds().then((app) => {
      assert.equal(app.height, 600)
      assert.equal(app.width, 800)
    })
  })

  it('tests the title', () => {
    return app.client.waitUntilWindowLoaded().then(() => {
      app.client.getTitle().should.eventually.equal('Change of Scenery')
    })
  })

  it('submit button exists', () => {
    return app.client.getText('.submit-search-button')
      .then(buttonText => assert(buttonText === 'Get Image'))
  })
})

describe('App saves a .jpg file', () => {
  it('writes a .jpg file with FileBin', () => {
    return fileBin.write('background1.jpg', 'base64ImageEncoder.jpg').then(file => {
      console.log(file)
    })
  })

  xit('finds a .jpg file with FileBin', () => {
    return fileBin.find('background.jpg').then(file => {
      console.log(file)
    })
  })

  it('get directory for .jpg file', () => {
    const fileBin = new FileBin('/test/test-files')
    console.log(fileBin.getBaseDirectory())
  })
})
