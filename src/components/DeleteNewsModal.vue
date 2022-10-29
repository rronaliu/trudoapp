<template>
  <b-modal
    id="delete-modal"
    ref="delete-modal"
    title="Delete News"
    @ok="deleteNews"
    ok-variant="danger"
    ok-title="Delete"
  >
Are you sure you want to delete these news? This actions cannot be undone.
  </b-modal>
</template>

<script>
export default {
    props: {
        newsId: {
            type: Number,
            default: 0,
        }
    },
    methods: {
        async deleteNews() {
            await this.$store.dispatch('deleteNews', this.newsId)
            this.$bvModal.hide('delete-modal')
        },
    }
}
</script>

<style>

</style>