<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Publisher</th>
            <th>Country</th>
            <th>Founded</th>
            <th>Genre</th>
            <th class="text-center">Books</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishers" :key="publisher.id">
            <td>{{ publisher.publisher }}</td>
            <td>{{ publisher.country }}</td>
            <td>{{ publisher.founded }}</td>
            <td>{{ publisher.genre }}</td>
            <td>
              <ul>
                <li v-for="book in publisher.books" :key="book.book_id">{{ book.title }}</li>
              </ul>
            </td>
            <td>
              <router-link class="button" :to="'/publisher/show/' + publisher.id">Show</router-link>
              &nbsp;
              <router-link class="button" :to="'/publisher/edit/' + publisher.id">Edit</router-link>
              &nbsp;
              <a class="button" v-on:click="deletePublisher(publisher.id)">Erase</a>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/publisher/create">New</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublisherIndex",
  data() {
    return {
      title: 'Publisher List',
      publishers: [] // Almacena la lista de editores
    };
  },
  mounted() {
    this.allPublishers(); // Cargar la lista de editores al montar el componente
  },
  methods: {
    allPublishers() {
      fetch(this.url + '/.netlify/functions/publisherFindAll', {
        headers: { 'Accept': 'application/json' }
      })
        .then((response) => response.json())
        .then((items) => {
          this.publishers = items; // Almacena la lista de editores
        })
        .catch(error => console.error("Error al obtener los editores:", error));
    },
    deletePublisher(id) {
  fetch(this.url + '/.netlify/functions/publisherDelete/' + id, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      this.allPublishers(); // Refresca la lista de editores después de eliminar
    })
    .catch(error => console.error("Error al eliminar el editor:", error));
}
  }
};
</script>

<style scoped>
.button {
  margin: 5px;
}
</style>

  