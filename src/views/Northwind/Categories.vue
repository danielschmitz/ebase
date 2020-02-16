<template>
  <v-container fluid>
    <v-card class="card--flex-toolbar">
      <v-card-title class="grey lighten-4" primary-title>
        <h2>Northwind > Categories</h2>
      </v-card-title>
      <v-card-text>
        <div class="text-xs-center">
          <e-data-table
            ref="dataTable"
            :headers="headers"
            :items="categories"
            :total="total"
            :total-itens-per-page="5"
            @refresh="refreshData"
            hideSearch
            hide-edit
            hide-delete
          ></e-data-table>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="onRefreshButtonClick()">Refresh</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import { showDialog } from '../../utils'
  import northwindService from '../../services/northwind'
  import EDataTable from '../../components/EDataTable/EDataTable'

  export default {
    name: 'northwind-categories',
    components: { EDataTable },
    data () {
      return {
        categories: [],
        total: 0,
        headers: [
          { text: 'ID', value: 'id', sortable: false },
          { text: 'Name', value: 'name', sortable: false, align: 'start' },
          { text: 'Description', value: 'description', sortable: false, align: 'start' }
        ]
      }
    },
    mounted () {
      this.refreshData(1)
    }
    ,
    methods: {
      onRefreshButtonClick () {
        showDialog('Você clicou no botão refresh')
      }
      ,
      async refreshData (page) {
        const { data, headers } = await northwindService.getCategories(page)
        this.total = parseInt(headers['x-total-count'])
        this.categories = data
      }
    }
  }
</script>

<style scoped>

</style>
