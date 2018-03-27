<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>OverFlow</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                  >
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <v-btn icon large href="https://codepen.io/johnjleider/pen/wyYVVj" target="_blank" slot="activator">
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="" v-model="username" label="Username" type="text"></v-text-field>
                  <v-text-field prepend-icon="" v-model="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click = 'login' >Login</v-btn>
                <v-btn color="primary" @click = 'toRegister' >Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
const url = `http://localhost:3000`
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  props: {
    source: String
  },
  methods: {
    login () {
      let obj = {
        username: this.username,
        password: this.password
      }
      axios.post(`${url}/users/signin`, obj)
        .then(response => {
          alert('login sukses')
          console.log('masuk', response.data.token)
          console.log('masuk', response.data._id)
          let token = response.data.token
          let role = response.data.role
          let username = response.data.username
          let id = response.data._id
          localStorage.setItem('token', token)
          localStorage.setItem('role', role)
          localStorage.setItem('username', username)
          localStorage.setItem('id', id)
          if (response.data.role === 'admin') {
            this.$router.push('QuestionList')
          } else {
            this.$router.push('QuestionList')
          }
        })
        .catch(err => {
          console.log('gagal masuk', err.message)
          alert('login gagal, jika belum punya id silahkan register')
        })
    },
    toRegister () {
      this.$router.push('Register')
    }
  }
}
</script>
