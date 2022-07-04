<template>
  <v-container
    id="black-list"
    fluid
    tag="section"
  >

<v-form ref="form" class="mx-2" lazy-validation>

</v-form>

    <v-btn
      color="success"
      default
      class="mr-0"
      @click="addDialog = true"
    >
      Adicionar
    </v-btn>

    <v-dialog
      v-model="addDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="add"
          >
            Salvar123
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <base-material-card
      color="success"
      dark
      icon="mdi-account-cancel"
      title="Relação de players que não devem ser aceitos no clã"
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
        addDialog: false,
        player: {},
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Nickname', value: 'nickname' },
          { text: 'IdUser', value: 'idUser' },
          { text: 'Data de banimento', value: 'dataBanimento' },
        ],
        players: [],
      }
    },
    mounted () {
      this.getDataFromApi()
    },
    methods: {
      add() {
        debugger

        if(this.$refs.form.validate()) {
          api.post("/players/ban", this.player)
          .then(() => {
            this.$toast.success("Banido com sucesso!", {
                dismissable: true,
                x: 'center',
                y: 'top',
                timeout: 4000,
              })
          })
          .catch((error) => {
            this.$toast.error("Falha ao efetuar o envio dos e-mail's: " + error.response.data.titulo, {
                dismissable: true,
                x: 'center',
                y: 'top',
                timeout: 4000,
              })
            console.log(error);
          });
        }
      },
      getDataFromApi () {
        this.loading = true
        debugger
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
