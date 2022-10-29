<template>
  <span v-if="isLoading">
    <b-spinner></b-spinner>
  </span>
  <div class="card" v-else>
    <div class="card-body">

    <h4 class="card-title">Username: {{user.userName}}</h4>
    <div class="card-title">
      <h5>Name: {{user.firstName}} {{user.lastName}}</h5>
    </div>
    <div class="">
      email: {{user.email}}
    </div>
    <div class="">
      total news created: {{getUserNews.length}}
    </div>
    <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0 ml-auto w-50"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
     <b-table striped hover :items="getUserNews" :fields="fields" class="border mt-3" responsive :filter="filter">
        <template #cell(team)="row">
          {{ row.item.team.name }}
        </template>
        <template #cell(tags)="row">
          <span v-for="(tag, kTag) in row.item.tags" :key="kTag" class="row-tag">
              {{tag}}
          </span>
        </template>
        <template #cell(removable)="row">
          <b-form-checkbox
              :id="'checkbox-' + row.item.id"
              v-model="row.item.removable"
              :name="'checkbox-' + row.item.id"
              />
        </template>
     </b-table>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      filter: '',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'team', label: 'Team' },
        { key: 'tags', label: 'Tags' },
        { key: 'publicationDate', label: 'Date' },
        { key: 'description', label: 'Description' },
        { key: 'removable', label: 'Removable'},
      ],
    }
  },
  async created() {
    await this.$store.dispatch('getUser', this.$route.params.id)
    if(!this.$store.state.news.length) {
      await this.$store.dispatch('getNews', this.$route.params.id)
    }
  },
  computed: {
    ...mapState({
      user: store => store.user,
      isLoading: store => store.isLoading
    }),
    ...mapGetters({
      getUserNews: 'getUserNews'
    }),
  },
};
</script>

<style>
.avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  padding: 1px;
  border: 1px solid #ddd;
}
</style>
