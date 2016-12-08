const Application = require('spectron').Application;
const { BrowserWindow } = require('electron');
const expect = require('chai').expect;
const assert = require('chai').assert;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
let appPath = path.join(__dirname, '..', 'app');
const FileBin = require('file-bin');

let fileBin = new FileBin('/base-directory', ['.jpg']);

global.before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

describe('App starts and has correct title', () => {
  beforeEach(() => {
    app = new Application({ path: electronPath, args: [appPath]});
    return app.start();
  });

  afterEach(() => {
    return app.stop();
  });

  it('opens a window', () => {
    return app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1);
  });

  it('browser window is visible', () => {
    return app.browserWindow.isVisible().then((isVisible) => {
      assert.equal(isVisible, true);
    });
  });

  it('browser window dimensions', () => {
    return app.browserWindow.getBounds().then((app) => {
      assert.equal(app.height, 600);
      assert.equal(app.width, 800);
    });
  });

  it('tests the title', () => {
    return app.client.waitUntilWindowLoaded().then(() => {
      app.client.getTitle().should.eventually.equal('Change of Scenery');
    });
  });
});
