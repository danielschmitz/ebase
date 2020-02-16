<template>
  <div>
    <v-text-field label="Pesquisar" v-show="!hideSearch" v-on:input="debounceInput"></v-text-field>
    <v-data-table
      :headers="fullHeaders"
      :items="items"
      :pagination.sync="pagination"
      :total-items="total"
      :loading="loading"
      class="elevation-0"
      hide-actions
    >
      <template v-slot:items="row">
        <tr>
          <td v-for="header in headers" :key="header.value" v-html="plot(row,header)"/>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="$emit('edit',row.item)">edit</v-icon>
            <v-icon small @click="$emit('delete',row.item)">delete</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination flat v-model="pagination.page" :length="pages" :total-visible="7"></v-pagination>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'

  export default {
    name: 'e-data-table',
    props: {
      headers: {
        type: Array
      },
      items: {
        type: Array
      },
      total: {
        type: Number
      },
      hideSearch: {
        type: Boolean, default: false
      }
    },
    data () {
      return {
        pagination: {},
        search: '',
        fullHeaders: [],
        loading: false,
        totalItensPerPage: 10
      }
    },
    mounted () {
      this.fullHeaders = this.headers.concat({ text: 'Ações', sortable: false })
    },
    computed: {
      pages () {
        if (this.total === 0) return 0
        return Math.ceil(this.total / this.totalItensPerPage)
      }
    },
    watch: {
      pagination: {
        handler () {
          this.refresh()
        },
        deep: true
      },
      items: {
        handler () {
          this.loading = false
        }
      }
    },
    methods: {
      plot (row, header) {
        if (header.filter) return this.$options.filters[header.filter](row.item[header.value])
        return row.item[header.value]
      },
      refresh () {
        const { page } = this.pagination
        if (page === undefined) return
        this.loading = true
        this.$emit('refresh', page, this.search)
      },
      debounceInput: _.debounce(function (e) {
        this.search = e
        this.refresh()
      }, 500)
    }
  }
</script>
