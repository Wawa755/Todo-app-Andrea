<script>
import { useTodoStore } from '../TodoStore';
import { ref, computed } from 'vue';
import Filter from '../components/filter_overview.vue';

export default {
  components: { Filter },
  setup() {
    const todoStore = useTodoStore();
    const selectedFilter = ref('all');

    const sortedTasks = computed(() => 
      todoStore.todoList.sort((a, b) => new Date(a.date) - new Date(b.date))
    );

    //date
    const formatDate = (isoDate) => {
      return new Date(isoDate).toLocaleDateString(); 
    };

    //overdue
    const isOverdue = (taskDate) => {
      const today = new Date().setHours(0, 0, 0, 0);
      return new Date(taskDate).getTime() < today;
    };

    //on time
    const wasCompletedOnTime = (task) => {
      return task.status === 'complete' && new Date(task.date) >= new Date(task.completedAt);
    };

    //filterr
    const filteredTasks = computed(() => {
      switch (selectedFilter.value) {
        case 'completed':
          return sortedTasks.value.filter(task => task.status === 'complete');
        case 'incomplete':
          return sortedTasks.value.filter(task => task.status !== 'complete');
        case 'overdue':
          return sortedTasks.value.filter(task => isOverdue(task.date) && task.status !== 'complete');
        case 'completed-on-time':
          return sortedTasks.value.filter(task => wasCompletedOnTime(task));
        default:
          return sortedTasks.value;
      }
    });
    const handleFilterChange = (newFilter) => {
      selectedFilter.value = newFilter;
    };
    return { todoStore, filteredTasks, formatDate, isOverdue, wasCompletedOnTime, handleFilterChange };
  },
};
</script>

<template>
  <div>
    <h1>Overview</h1>

    <div class="top_buttons">
      <router-link to="/Create">
        <button>Create new todo</button>
      </router-link>
      <Filter @filter-changed="handleFilterChange" />
    </div>

    <table>
      <tr class="table_top">
        <th>Status</th>
        <th>Title</th>
        <th>Description</th>
        <th>Deadline</th>
      </tr>
      <tr v-for="(task, index) in filteredTasks" :key="index">
        <td>
          <input 
            type="checkbox" 
            :checked="task.status === 'complete'" 
            @change="todoStore.toggleStatus(index)" 
          />
        </td>
        <td :class="{ completed: task.status === 'complete' }">
          <router-link :to="'/task/' + index">
            {{ task.title }}
          </router-link>
        </td>
        <td :class="{ completed: task.status === 'complete' }">{{ task.description }}</td>
        <td 
          :class="{ 
            completed: task.status === 'complete', 
            overdue: isOverdue(task.date) && task.status !== 'complete' 
          }">
          {{ formatDate(task.date) }}
        </td>
      </tr>
    </table>
  </div>
</template>


<style>

h1{
  margin-bottom: 7px;
}

body{
  background-color: antiquewhite;
  margin-left: 3%;
}

.top_buttons{
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

select{
  border-radius: 10px;
  background-color: #090909;
  color: white;
}

table {
  border-collapse: collapse;
  width: 100%;
  background-color:rgb(251, 249, 246);
  border-radius: 20px;
  overflow: hidden
  
}
.table_top{
  background-color: #d7a6ff;
  border-radius: 20px;
}
td, th {
  padding: 8px;
  border-radius: 20px;
  text-align: center;
}
.completed {
  text-decoration: line-through;
  color: gray;
}

.completed a {
  color: gray;
}

.top_buttons button {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #8c00ff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 20px;
  box-shadow: 0px 8px 15px -3px rgba(0,0,0,0.21);
}

input[type="checkbox"] { 
accent-color: #8c00ff;
}

a{
  color:black; 
  text-decoration: none; 
}
a:hover {
  color: #8c00ff; 
  font-weight: bold;
}

.overdue {
  color: red;
  font-weight: bold;
}

</style>
