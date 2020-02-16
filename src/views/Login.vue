<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title class="grey lighten-4" primary-title>
        <h2>Login</h2>
      </v-card-title>
      <v-card-text v-if="loading">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </v-card-text>
      <v-card-text v-if="!loading">
        <v-form v-model="valid">
          <v-text-field v-model="username" :rules="usernameRules" label="Usuário" required></v-text-field>
          <v-text-field
            @click:append="showP = !showP"
            v-model="senha"
            :rules="senhaRules"
            label="Senha"
            required
            :type="showP ? 'text' : 'password'"
            :append-icon="showP ? 'visibility_off' : 'visibility'"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onLoginClick()" :disabled="!valid">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
  import store from '../store'
  import loginService from '../services/login'
  import auth from '../services/auth'
  import { g, showError } from '../utils'

  export default {
    name: 'Login',
    data () {
      return {
        store,
        loading: false,
        username: 'bond',
        senha: '',
        valid: true,
        showP: false,
        usernameRules: [
          v => !!v || 'Campo obrigatório'
        ],
        senhaRules: [v => !!v || 'Campo obrigatório']
      }
    },
    mounted () {

    },
    methods: {
      async onLoginClick () {
        try {
          this.loading = true
          const result = await loginService.tryLogin(this.username, this.senha)

          if (result === null)
            throw new Error('Usuário/Senha inválidos')

          // Se o login foi bem sucedido, realiza a acao de logar no sistema
          // que a princípio apenas guarda o token no store
          auth.login(result)

          // Analiza se o router deve ir para o Home ou  para outro lugar
          const redirect = g(this.$route, 'query.redirect') || '/'
          this.$router.push(redirect)
        } catch (error) {
          showError(error)
        } finally {
          this.loading = false
        }

        this.loading = false
      },
      onLogoutClick () {
        auth.logout()
      }
    }
  }
</script>
