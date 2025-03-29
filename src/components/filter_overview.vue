<script>
export default {
  name: "Filter",
  data() {
    return {
      selectedFilter: 'all',
    };
  },
  methods: {
    //changing filters
    emitFilterChange() {
      this.$emit('filter-changed', this.selectedFilter);
    },
  },
};
</script>

<template>
  <div>
    <select v-model="selectedFilter" @change="emitFilterChange">
      <option value="all">All todos</option>
      <option value="completed">Completed todos</option>
      <option value="incomplete">Incomplete todos</option>
      <option value="overdue">Overdue todos</option>
      <option value="completed-on-time">Completed on time</option>
    </select>
  </div>
</template>


<style scoped>
select {
  padding: 8px;
  margin: 13px 0;
}
</style>
