<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title class="grey lighten-4" primary-title>
        <h2>Bem vindo(a) {{store.nome}}</h2>
      </v-card-title>
      <v-card-text>
        <div class="text-xs-center">
          <img src="../assets/ebase.png" class="imgresponsive"/>
        </div>
      </v-card-text>
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
    data () {
      return {
        store,
        testReportButtonDisabled: false
      }
    },
    async mounted () {
    },
    methods: {
      onLogoutClick () {
        auth.logout()
        this.$router.push('/login')
      }
    }
  }
</script>
<style>
  .imgresponsive {
    max-width: 300px;
    width: 100%;
    height: auto;
  }
</style>
