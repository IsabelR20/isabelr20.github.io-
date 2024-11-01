<template>
    <div class="row">
      <div style="margin-top: 5%">
        <h2>{{ title }}</h2>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Nationality</th>
              <th>Birth Year</th>
              <th>Fields</th>
              <th class="text-center">Books</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="author in authors" :key="author.id">
              <td>{{ author.author }}</td>
              <td>{{ author.nationality }}</td>
              <td>{{ author.birth_year }}</td>
              <td>{{ author.fields }}</td>
              <td>
                <ul>
                  <li v-for="book in author.books" :key="book.book_id">{{ book.title }}</li>
                </ul>
              </td>
              <td>
                <router-link class="button" :to="'/author/show/' + author.id">Show</router-link>
                &nbsp;
                <router-link class="button" :to="'/author/edit/' + author.id">Edit</router-link>
                &nbsp;
                <a class="button" v-on:click="deleteAuthor(author.id)">Erase</a>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="button button-primary" to="/author/create">New</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AuthorIndex",
    data() {
      return {
        title: 'Author List',
        authors: [] // Almacena la lista de autores
      };
    },
    mounted() {
      this.allAuthors(); // Cargar la lista de autores al montar el componente
    },
    methods: {
      allAuthors() {
        fetch(this.url + '/.netlify/functions/authorFindAll', {
          headers: { 'Accept': 'application/json' }
        })
        .then((response) => response.json())
        .then((items) => {
          this.authors = items; // Almacena la lista de autores
        });
      },
      deleteAuthor(id) {
        fetch(this.url + '/.netlify/functions/authorDelete/' + id, {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE'
        })
        .then(() => {
          this.allAuthors(); // Refresca la lista de autores después de eliminar
        });
      }
    }
  };
  </script>
  