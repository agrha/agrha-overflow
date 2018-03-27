<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
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
                  <v-text-field prepend-icon="" v-model="password" label="Password"  type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="toLogin">Login</v-btn>
                <v-btn color="primary" @click="createAdmin">Register As Admin</v-btn>
                <v-btn color="primary" @click="createUser">Register As User</v-btn>
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
  methods: {
    toLogin () {
      this.$router.push('/')
    },
    createAdmin () {
      let obj = {
        username: this.username,
        password: this.password
      }
      axios.post(`${url}/users/admin`, obj)
        .then(data => {
          alert('create admin success')
          this.toLogin()
        })
        .catch(err => {
          alert('create admin failed')
          console.log('error create admin', err)
        })
    },
    createUser () {
      let obj = {
        username: this.username,
        password: this.password
      }
      axios.post(`${url}/users/signup`, obj)
        .then(data => {
          alert('create user success')
          console.log(data)
          this.toLogin()
        })
        .catch(err => {
          alert('create user failed')
          console.log('create user fail', err.message)
        })
    }
  }
}
</script>
