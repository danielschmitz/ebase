<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title class="grey lighten-4" primary-title>
        <h2>Logout</h2>
      </v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onLogoutClick()">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>

  import store from '../store'
  import auth from '../services/auth'

  export default {
    name: 'Logout',
    data () {
      return {
        store
      }
    },
    methods: {
      onLogoutClick () {
        auth.logout()
        this.$router.push('/login')
      }
    }
  }
</script>
