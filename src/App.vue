<template>
  <!--
  v-app é um componente espcial do Vuetify que engloba toda a aplicação.
  Com ele o width e height dos componentes ficam com 100% de largura
  -->
  <v-app>
    <!--
      v-navigation-drawer é o menu da direita
    -->
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
      :class="corMenu"
    >
      <!-- Este v-list monta o usuário logado -->
      <v-list two-line v-if="auth.isLogged()">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon large>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="store.nome"></v-list-tile-title>
            <v-list-tile-sub-title v-html="store.usuario"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <!-- Este v-list monta os itens do menu -->
      <v-list>
        <span v-for="(item, i) in getItems" :key="i">
          <template v-if="item.children===undefined">
            <v-list-tile value="true" :to="item.to">
              <v-list-tile-action>
                <v-icon v-html="item.icon"></v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-else>
            <v-list-group :prepend-icon="item.icon">
              <v-list-tile slot="activator">
                <v-list-tile-title v-text="item.title"></v-list-tile-title>
              </v-list-tile>

              <v-list-tile
                v-for="(subitem, i) in item.children"
                :key="i"
                :to="subitem.to"
                class="v-list__group__header--active"
              >
                <v-list-tile-action>&nbsp;</v-list-tile-action>

                <v-list-tile-title v-text="subitem.title"></v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </template>
        </span>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app :clipped-left="clipped" :class="corBarra" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!--
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content class="content">
      <!-- O router view é onde os componentes carregados do router são adicionados -->
      <router-view/>
    </v-content>

    <v-dialog v-model="dialog.show" max-width="600">
      <v-card>
        <v-card-title v-if="dialog.title" class="title">{{dialog.title}}</v-card-title>
        <v-card-text>{{dialog.text}}</v-card-text>
        <v-card-text v-if="dialog.text2!==''" v-html="dialog.text2"></v-card-text>
        <v-card-text style="padding-bottom:1px">
          <p class="text-xs-right">
            <v-btn flat :color="dialog.color" @click="dialog.show=false">Ok</v-btn>
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirm.show" persistent max-width="290">
      <v-card class="mx-auto" max-width="400">
        <v-card-title class="title font-weight-light">Confirmação
          <v-spacer></v-spacer>
          <v-icon>help_outline</v-icon>
        </v-card-title>
        <v-card-text>{{confirm.text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="error" @click="confirm.choice(false)">Não</v-btn>
          <v-btn flat color="primary" @click="confirm.choice(true)">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="toast.show" :color="toast.color" :timeout="toast.timeout">
      {{ toast.text }}
      <v-btn dark flat @click="toast.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import store from './store'
  import auth from './services/auth'
  import menu from './menu'

  import { alert } from './utils'

  export default {
    name: 'App',
    mounted: function () {
      // TODO Melhorar a implementação de exibição do menu (uso do v-for sem v-if)
    },
    data () {
      return {
        store,
        auth,
        corMenu: 'blue-grey lighten-5',
        corBarra: 'light-blue darken-3',
        dialog: alert.config.dialog,
        confirm: alert.config.confirm,
        toast: alert.config.snackbar,
        items: menu,
        miniVariant: false, // Exibe somente o menu sem o texto
        clipped: false, // Exibe o menu por baixo da toolbar
        drawer: false, // Exibe ou nao o menu da direita ao carregar a app
        title: 'eBase - App base com vue e vetify'
      }
    },
    computed: {
      getItems: function () {
        return this.items.filter(item => {
          if (item.auth === undefined || item.auth === auth.isLogged())
            return item
        })
      }
    }
  }
</script>

<style>
  .container h3 {
    margin-left: -20px;
  }

  .content {
    margin: 10px;
  }

  .v-list__group__header--active {
    background: #fafafa;
  }

  dd {
    padding-bottom: 10px;
  }
</style>
