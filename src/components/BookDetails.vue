<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="titleInput">Title</label>
            <input class="u-full-width" type="text" v-model="book.title" />
          </div>
          <div class="six columns">
            <label for="authorInput">Author</label>
            <input class="u-full-width" type="text" v-model="book.author" />
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="publisherInput">Publisher</label>
            <input class="u-full-width" type="text" v-model="book.publisher" />
          </div>
          <div class="six columns">
            <label for="editionInput">Edition</label>
            <input class="u-full-width" type="text" v-model="book.edition" />
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="copyrightInput">Copyright</label>
            <input class="u-full-width" type="number" v-model="book.copyright" />
          </div>
          <div class="six columns">
            <label for="languageInput">Language</label>
            <input class="u-full-width" type="text" v-model="book.language" />
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/book">Back</router-link>
          <a v-if="edit" class="button button-primary" style="float: right" @click="updateBook(book._id)">Update</a>
          <a v-if="create" class="button button-primary" style="float: right" @click="createBook()">Create</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  name: "BookDetails",
  props: ['create', 'edit'],
  data() {
    return {
      title: "Book Data",
      book: {},
      url: "https://tarea42.netlify.app" // Base URL
    };
  },
  mounted() {
    const route = useRoute();
    if (route.params.id) {
      this.findBook(route.params.id);
    } else {
      this.book = {
        _id: Math.floor(Math.random() * 100000000),
        title: '',
        edition: '',
        copyright: 0,
        language: '',
        pages: 0,
        author: '',
        author_id: 0,
        publisher: '',
        publisher_id: 0
      };
    }
  },
  methods: {
    findBook(id) {
      fetch(`${this.url}/.netlify/functions/bookFind/`+ id, {
        headers: { Accept: 'application/json' }
      })
        .then(response => response.json())
        .then(items => {
          this.book = items[0] || {};
        })
        .catch(error => console.error("Error fetching book:", error));
    },
    updateBook(id) {
      fetch(`${this.url}/.netlify/functions/bookUpdate/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(this.book)
      })
        .then(() => this.$router.push('/book'))
        .catch(error => console.error("Error updating book:", error));
    },
    createBook() {
      fetch(`${this.url}/.netlify/functions/bookInsert`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(this.book)
      })
        .then(() => this.$router.push('/book'))
        .catch(error => console.error("Error creating book:", error));
    }
  }
};
</script>
