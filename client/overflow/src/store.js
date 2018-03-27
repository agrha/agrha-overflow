import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  questions: [{title: 'makan banyak makan rejeki'},
    {title: 'makan banyak makan rejeki'},
    {title: 'makan banyak makan rejeki'}
  ]
}

const getters = {
  questions () {
    return this.state.questions
  }

}

const actions = {

}

const mutations = {

}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
