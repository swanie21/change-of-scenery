'use strict';
import utils from '../utils';
import { name } from '../../../config';
import Vue from 'Vue';
// import HomePage from '../../app/src/components/HomePage';

describe('Launch', function () {
  beforeEach(utils.beforeEach);
  afterEach(utils.afterEach);

  it('shows the proper application title', function () {
    return this.app.client.getTitle()
    .then(title => {
      expect(title).to.equal('Change of Scenery');
    });
  });
});

describe('Launch', function () {
  it('should render correct message', function () {
    var vm = new Vue({
      template: '<div><test></test></div>',
      components: {
        'test': HomePage
      }
    }).$mount()
    expect(vm.$el.querySelector('submit-search-button').textContent).toBe('Get Image')
  });
});
