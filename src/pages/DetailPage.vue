<script>
import { useRoute } from 'vue-router';
import { useTodoStore } from '../TodoStore';
import { computed } from 'vue';

export default {
  props: ['id'],  // declare 'id' as a prop
  setup(props) {
    const todoStore = useTodoStore();
    
    const taskIndex = computed(() => Number(props.id)); //convert prop to number
    const task = computed(() => todoStore.todoList[taskIndex.value] || null);

    //date
    const formatDate = (isoDate) => {
      if (!isoDate) return "No date provided";
      return new Date(isoDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return { task, formatDate };
  }
};

</script>

<template>
  <div class="Detail_page">
    <div v-if="task">
      <div class="Header">
        <h1>Todo Details</h1>
      </div>
    
      <p><strong>Title:</strong> {{ task.title }}</p>
      <p><strong>Description:</strong> {{ task.description }}</p>
      <p><strong>Status:</strong> {{ task.status }}</p>
      <p><strong>Deadline:</strong> {{ formatDate(task.date) }}</p>
    </div>
    
    <div v-else>
      <p>Todo not found.</p>
    </div>
  </div>
</template>

<style>
.Header, strong {
  color: #8c00ff;
}

.Detail_page {
  background-color: rgb(251, 249, 246);
  border-radius: 20px;
  padding: 3%;
  padding-top: 7px;
  width: 50%;
}
</style>
