import Vue from 'vue'
import HomePage from 'src/components/HomePage'

function getRenderedText (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el.textContent
}

describe('HomePage.vue', () => {
  it('should render a button', () => {
    const vm = new Vue({
      template: document.createElement('button'),
      render: h => h(HomePage)
    }).$mount()

    expect(vm.$el.querySelector('.submit-search-button').textContent).to.contain('Get Image')
  })

  it('should render a current background info button', () => {
    const vm = new Vue({
      template: document.createElement('button'),
      render: h => h(HomePage)
    }).$mount()

    expect(vm.$el.querySelector('.photo-info-button').textContent).to.contain('Current Background Info')
  })

  it('should render an input field', () => {
    const vm = new Vue({
      template: document.createElement('input'),
      render: h => h(HomePage)
    }).$mount()

    expect(vm.$el.querySelector('.search-input').textContent).to.contain('')
  })

  it('should render a spinner', () => {
    const vm = new Vue({
      template: document.createElement('article'),
      render: h => h(HomePage)
    }).$mount()

    expect(vm.$el.querySelector('.loader').textContent).to.contain('')
  })

  it('should render an error message', () => {
    const vm = new Vue({
      template: document.createElement('h1'),
      render: h => h(HomePage)
    }).$mount()

    expect(vm.$el.querySelector('.error-message').textContent).to.contain('')
  })

  xit('sets the correct default data', () => {
    expect(typeof HomePage.data).toBe('function')
    const defaultData = HomePage.data()
    expect(defaultData.search).toBe('')
  })

  xit('renders the correct props', () => {
    expect(getRenderedText(HomePage, {
      errorMessage: ''
    })).toBe('No images match that search, sorry.')
  })
})
