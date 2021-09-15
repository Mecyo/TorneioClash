<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <!-- <base-v-component
      heading="Simple Tables"
      link="components/simple-tables"
    />

    <base-material-card
      icon="mdi-clipboard-text"
      title="Simple Table"
      class="px-5 py-3"
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Name
            </th>
            <th class="primary--text">
              Country
            </th>
            <th class="primary--text">
              City
            </th>
            <th class="text-right primary--text">
              Salary
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" /> -->

    <base-material-card
      color="success"
      dark
      icon="mdi-clipboard-text"
      title="Veja quem já se inscreveu"
      class="px-5 py-3"
    >
      <v-data-table
      :headers="headers"
      :items="players"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:[`item.dataRegistro`]="{ item }">
        <span>{{ new Date(item.dataRegistro).toLocaleString() }}</span>
      </template>
      <template v-slot:[`item.clan`]="{ item }">
        <span>{{ getClanName(item.clan) }}</span>
      </template>
    </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import api from "@/api";

export default {
    data () {
      return {
        loading: true,
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Nickname', value: 'nickname' },
          { text: 'Nome', value: 'nome' },
          { text: 'Clã', value: 'clan' },
          { text: 'Nível', value: 'nivel' },
          { text: 'Data de registro', value: 'dataRegistro' },
        ],
        players: [],
        clans: [{id: 1, nome: "Insanos"}, {id: 2, nome: "Terroristas"}, {id: 3, nome: "Irmandade"}, {id: 4, nome: "Outros"}],
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      getClanName(item) {
        debugger
          if(item) {
            return this.clans.find( clan => clan.id === item).nome;
          }

          return 'Not Found';
      },
      getDataFromApi () {
        this.loading = true
        api.get("/players")
        .then((data) => {
          if(data) {
            this.players = data.data;
          }
          this.loading = false
        })
        .catch((error) => {
          console.log(error);
        });
      },
    },
  }
</script>
