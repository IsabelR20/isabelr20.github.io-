<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="publisherInput">Publisher</label>
            <input class="u-full-width" type="text" v-model="publisher.publisher" />
          </div>
          <div class="six columns">
            <label for="countryInput">Country</label>
            <input class="u-full-width" type="text" v-model="publisher.country" />
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="foundedInput">Founded</label>
            <input class="u-full-width" type="number" v-model="publisher.founded" />
          </div>
          <div class="six columns">
            <label for="genreInput">Genere</label>
            <input class="u-full-width" type="text" v-model="publisher.genere" />
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/publisher">Back</router-link>
          <a v-if="edit" class="button button-primary" style="float: right" @click="updatePublisher(publisher._id)">Update</a>
          <a v-if="create" class="button button-primary" style="float: right" @click="createPublisher()">Create</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: "PublisherDetails",
  props: ['create', 'edit'],
  data() {
    return {
      title: "Publisher Data",
      publisher: {
        _id: null,
        id: null,
        publisher: '',
        country: '',
        founded: null,
        genre: '', // Asegúrate de usar el nombre correcto de la propiedad
      },
      url: "https://tarea42.netlify.app", // Base URL
    };
  },
  mounted() {
    const route = useRoute();
    if (route.params.id) {
      this.findPublisher(route.params.id);
    } else {
      this.publisher.id = Math.floor(Math.random() * 100000000); // ID aleatorio si es creación
    }
  },
  methods: {
    findPublisher(id) {
      fetch(this.url + '/.netlify/functions/publisherFind/' + id, {
        headers: { Accept: 'application/json' },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Fetched data:", data);
          if (data.length > 0) {
            this.publisher = data[0]; // Asigna el primer elemento del array
            console.log("Publisher after fetching:", this.publisher);
          }
        })
        .catch(error => console.error("Error fetching publisher:", error));
    },
    updatePublisher(id) {
      fetch(this.url + '/.netlify/functions/publisherUpdate/' + id, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(this.publisher),
      })
        .then(() => this.$router.push('/publisher'))
        .catch(error => console.error("Error updating publisher:", error));
    },
    createPublisher() {
      fetch(this.url + '/.netlify/functions/publisherInsert', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(this.publisher),
      })
        .then(() => this.$router.push('/publisher'))
        .catch(error => console.error("Error creating publisher:", error));
    },
  },
};
</script>

<style scoped>
.button {
  margin: 5px;
}
</style>

