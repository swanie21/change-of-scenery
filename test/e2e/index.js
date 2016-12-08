'use strict'
require('babel-register')({
  ignore: /node_modules/
})

const { expect, should, assert } = require('chai')
global.expect = expect
global.should = should
global.assert = assert

require('require-dir')('./specs')
