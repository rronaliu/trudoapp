<template>
    <div class="d-flex flex-column">
        <span @click="registerNews" class="cursor-pointer btn btn-primary mr-auto mb-4"> Register News</span>
        <span v-if="isLoading">
            <b-spinner></b-spinner>
        </span>
        <div class=""  v-else>

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

        <b-table striped hover :items="news" :fields="fields" class="border" responsive :filter="filter">
            <template #cell(author)="row">
                <b-link :to="{ name: 'profile', params: { id: row.item.author.id } }">
                    {{ row.item.author.name }}
                </b-link>
            </template>
            <template #cell(team)="row">
                {{ row.item.team.name }}
            </template>
            <template #cell(publicationDate)="row">
                {{ formatDate(row.item.publicationDate) }}
            </template>
            <template #cell(tags)="row">
                <span v-for="(tag, kTag) in row.item.tags.slice(0,2)" :key="kTag" class="row-tag">
                    {{tag}}
                </span>
            </template>
            <template #cell(removable)="row">
                <b-form-checkbox
                    :disabled="true"
                    :id="'checkbox-' + row.item.id"
                    v-model="row.item.removable"
                    :name="'checkbox-' + row.item.id"
                    />
            </template>
            <template #cell(actions)="row">
                <b-dropdown variant="light">
                    <b-dropdown-item @click="editItem(row.item.id)">
                        Edit
                    </b-dropdown-item>
                    <b-dropdown-item @click="deleteItemById(row.item.id)" variant="danger" :disabled="!row.item.removable">
                        Delete
                    </b-dropdown-item>
                </b-dropdown>
            </template>
        </b-table>
        </div>

        <register-news :isAdd="isAdd"/>
        <delete-news :news-id="deleteNewsId"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import RegisterNews from '../components/RegisterNews.vue'
import DeleteNews from '../components/DeleteNewsModal.vue'
export default {
    components: {
        RegisterNews,
        DeleteNews
    },
    data(){ 
        return {
            deleteNewsId: null,
            isAdd: true,
            filter: '',
            fields: [
                { key: 'author', label: 'Author' },
                { key: 'title', label: 'Title' },
                { key: 'team', label: 'Team' },
                { key: 'tags', label: 'Tags' },
                { key: 'publicationDate', label: 'Date' },
                { key: 'description', label: 'Description' },
                { key: 'removable', label: 'Removable'},
                { key: 'actions', label: 'Actions'},
            ],
        }
    },
    async created() {
        await this.$store.dispatch('getNews')
  },
    computed: {
    ...mapState({
      news: store => store.news,
      isLoading: store => store.isLoading
      // news: (state) => state.news.news,
      // image: (state) => state.user.image,
      // name: (state) => state.user.name,
      // city: (state) => state.user.city,
    }),
  },
    methods: {
        async editItem(id) {
            this.isAdd = false
            await this.$store.dispatch("getNewsById", id);
            this.$bvModal.show('register-news')
        },
        deleteItemById(id) {
            this.deleteNewsId = id
            this.$bvModal.show('delete-modal')
        },
        formatDate(date) {
            const format = new Date(date)
            return format.toLocaleDateString()
        },
        registerNews() {
            this.isAdd = true
            this.$store.commit('INIT_REGISTERED_NEWS')
            this.$store.commit("SET_REGISTERED_NEWS_AUTHOR", {
                name:
                this.$store.state.loggedInUser.firstName +
                " " +
                this.$store.state.loggedInUser.lastName,
                id: this.$store.state.loggedInUser.id,
            });
            this.$bvModal.show('register-news')
        }
    }
}
</script>