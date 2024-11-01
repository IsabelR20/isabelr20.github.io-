<template>
    <div class="row">
      <div class="eleven column" style="margin-top: 5%">
        <h2>{{ title }}</h2>
        <form>
          <div class="row">
            <div class="six columns">
              <label for="authorInput">Author</label>
              <input class="u-full-width" type="text" v-model="author.author">
            </div>
            <div class="six columns">
              <label for="nationalityInput">Nationality</label>
              <input class="u-full-width" type="text" v-model="author.nationality">
            </div>
          </div>
          <div class="row">
            <div class="six columns">
              <label for="birthYearInput">Birth Year</label>
              <input class="u-full-width" type="number" v-model="author.birth_year">
            </div>
            <div class="six columns">
              <label for="fieldsInput">Fields</label>
              <input class="u-full-width" type="text" v-model="author.fields">
            </div>
          </div>
          <div class="row">
            <router-link class="button button-primary" to="/author">Back</router-link>
            <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateAuthor(author.id)">Update</a>
            <a v-if='create' class="button button-primary" style="float: right" v-on:click="createAuthor()">Create</a>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  
  export default {
    name: "Author Details",
    props: ['create', 'edit'],
    data() {
      return {
        title: "Author Data",
        author: {} // Asegúrate de inicializar author como un objeto vacío
      }
    },
    mounted() {
      const route = useRoute();
      if (route.params.id != null) {
        this.findAuthor(route.params.id);
      } else {
        // Inicializa el objeto author con valores predeterminados
        this.author = {
          id: Math.floor(Math.random() * 100000000),
          author: '',
          nationality: '',
          birth_year: '',
          fields: ''
        };
      }
    },
    methods: {
      findAuthor(id) {
        fetch(this.url + '/.netlify/functions/authorFind/' + id, { headers: { 'Accept': 'application/json' } })
          .then((response) => response.json())
          .then((items) => {
            this.author = items[0]; // Asegúrate de que la respuesta tenga datos
          });
      },
      updateAuthor(id) {
        fetch(this.url + '/.netlify/functions/authorUpdate/' + id, {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify(this.author)
        })
        .then(() => {
          this.$router.push('/author');
        });
      },
      createAuthor() {
        fetch(this.url + '/.netlify/functions/authorInsert', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(this.author)
        })
        .then(() => {
          this.$router.push('/author');
        });
      }
    }
  };
  </script>
  