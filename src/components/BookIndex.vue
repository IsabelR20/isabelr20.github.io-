<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Edition</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publisher }}</td>
            <td>{{ book.edition }}</td>
            <td>
              <router-link class="button" :to="'/book/show/' + book.id">Show</router-link>
              &nbsp;
              <router-link class="button" :to="'/book/edit/' + book.id">Edit</router-link>
              &nbsp;
              <a class="button" v-on:click="deleteBook(book.id)">Erase</a>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/book/create">New</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookIndex",
  data() {
    return {
      title: 'Book List',
      books: [] // Almacena la lista de libros
    };
  },
  mounted() {
    this.allBooks(); // Cargar la lista de libros al montar el componente
  },
  methods: {
    allBooks() {
      fetch(this.url + '/.netlify/functions/bookFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then(response => response.json())
        .then(items => {
          this.books = items; // Almacena la lista de libros
        })
        .catch(error => console.error("Error al obtener los libros:", error));
    },
    deleteBook(id) {
      fetch(this.url + '/.netlify/functions/bookDelete/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
      })
        .then(() => {
          this.allBooks(); // Refresca la lista de libros después de eliminar
        })
        .catch(error => console.error("Error al eliminar el libro:", error));
    }
  }
};
</script>
