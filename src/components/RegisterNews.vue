<template>
  <b-modal id="register-news"
           title="Register News"
           ok-title="Submit"
           @ok="submit"
           @hide="clearForm">
    <div v-if="isLoading">
      <b-spinner></b-spinner>
    </div>
    <div v-else>

      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsTitle">Title</label>
        </b-col>
        <b-col sm="12">
          <b-form-input id="newsTitle"
                        type="text"
                        v-model="newsTitle"></b-form-input>
                        <span v-if="errors.title"
              class="text-danger">Title {{errors.title}}</span>
                        
        </b-col>
      </b-row>
      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsTeam">Team</label>
        </b-col>
        <b-col sm="12">
          <b-form-select id="newsTeam"
                        :disabled="!isAdd"
                         v-model="newsTeam"
                         :options="teamOptions"
                         size="sm"
                         class=""></b-form-select>
                         <span v-if="errors.team"
              class="text-danger">Team {{errors.team}}</span>
        </b-col>
      </b-row>
      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsTags">Tags</label>
        </b-col>
        <b-col sm="12">
          <b-form-tags input-id="newsTags"
                       v-model="newsTags"
                       remove-on-delete></b-form-tags>
                       <span v-if="errors.tags"
              class="text-danger">Tags {{errors.tags}}</span>
        </b-col>
      </b-row>
      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsAuthor">Author</label>
        </b-col>
        <b-col sm="12">
          <b-form-input id="newsAuthor"
                        type="text"
                        disabled
                        v-model="newsAuthor"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsDescription">Description</label>
        </b-col>
        <b-col sm="12">
          <b-form-input id="newsDescription"
                        type="text"
                        v-model="newsDescription"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsRemovable">Removable</label>
        </b-col>
        <b-col sm="12">
          <b-form-checkbox id="newsRemovable"
                           v-model="newsRemovable"
                           name="newsRemovable" />
        </b-col>
      </b-row>
      <b-row class="my-1 flex-column">
        <b-col sm="3">
          <label for="newsRemovable">News Content</label>
        </b-col>
        <b-col sm="12">
          <b-form-textarea id="newsRemovable"
                           type="text"
                           v-model="newsContent"
                           name="newsRemovable" />
        </b-col>
      </b-row>
    </div>

  </b-modal>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import News from "@/models/News";
export default {
  props: {
    isAdd: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      errors: {
        title: '',
        team: '',
        tags: '',
      }
    };
  },
  computed: {
    ...mapGetters(["teamOptions"]),
    ...mapState({
      isLoading: (store) => store.isLoadingRegister,
    }),
    newsTeam: {
      get() {
        return this.$store.state.registerNews.team.name;
      },
      set(value) {
        this.$store.commit("SET_REGISTERED_NEWS_TEAM", value);
      },
    },
    newsTitle: {
      get() {
        return this.$store.state.registerNews.title;
      },
      set(value) {
        this.$store.commit("SET_REGISTERED_NEWS_TITLE", value);
      },
    },
    newsTags: {
      get() {
        return this.$store.state.registerNews.tags;
      },
      set(value) {
        this.$store.commit("SET_REGISTERED_NEWS_TAGS", value);
      },
    },
    newsAuthor: {
      get() {
        return this.$store.state.registerNews.author.name;
      },
      // set(value) {
      //   this.$store.commit("SET_REGISTERED_NEWS_AUTHOR", value);
      // },
    },
    newsRemovable: {
      get() {
        return this.$store.state.registerNews.removable;
      },
      set(value) {
        this.$store.commit("SET_REGISTERED_NEWS_REMOVABLE", value);
      },
    },
    newsDescription: {
      get() {
        return this.$store.state.registerNews.description;
      },
      set(value) {
        this.$store.commit("SET_REGISTERED_NEWS_DESCRIPTION", value);
      },
    },
    newsContent: {
      get() {
        return this.$store.state.registerNews.content;
      },
      set(value) {
        this.$store.commit("SET_REGISTERED_NEWS_CONTENT", value);
      },
    },
  },
  async created() {
    await this.$store.dispatch("getTeamsDropdownItems");
  },
  methods: {
    clearForm() {
      this.$store.commit("INIT_REGISTERED_NEWS");
    },
    async submit(e) {
      e.preventDefault()

      this.newsTitle.length ? this.errors.title = '' : this.errors.title = 'is required'
      this.newsTeam.length ? this.errors.team = '' : this.errors.team = 'is required'
      this.newsTags.length ? this.errors.tags = '' : this.errors.tags = ' is required'

      if(!this.newsTitle.length || !this.newsTeam.length || !this.newsTags.length) {
        return;
      }

      this.$store.commit('SET_IS_LOADING_REGISTER', true)
      if(this.isAdd) {
        const registerNews = new News();
        registerNews.fromData(this.$store.state.registerNews);
        await this.$store.dispatch("postNews", registerNews);
      } else {
        await this.$store.dispatch("putNews", this.$store.state.registerNews);
      }
        this.$bvModal.hide('register-news')
        await this.$store.dispatch('getNews')
    },
  },
};
</script>

<style>
</style>