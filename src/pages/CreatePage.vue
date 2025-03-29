<script>
import { useTodoStore } from '../TodoStore';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: { VueDatePicker },
  data() {
    return {
      taskTitle: '',
      taskDescription: '',
      taskDate: null
    };
  },
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  methods: {
    submitTask() {
    if (!this.taskTitle.trim()) {
      alert("Todo title can't be empty!");
      return; 
    }
    
    this.todoStore.addTask(this.taskTitle, this.taskDescription, this.taskDate);
      //reset inputs
      this.taskTitle = '';
      this.taskDescription = '';
      this.taskDate = null;
    }
  }
};

</script>

<template>
  <h1>Create todo</h1>

  <div class="Create_content">
    <section>
      <input v-model="taskTitle" class="input_title" type="text" placeholder="Write todo title..." />
    </section>
  
    <section>
      <textarea 
        v-model="taskDescription" 
        class="input_desc" 
        placeholder="Write todo description..."
      ></textarea>
    </section>

    <section class="DateBlock">
      <VueDatePicker v-model="taskDate"></VueDatePicker>
    </section>

    <section class="AddButton">
      <button @click="submitTask">Add</button>
    </section>
  </div>
</template>

<style>

.dp__range_end, .dp__range_start, .dp__active_date{
	background-color: #8c00ff;
  border:#8c00ff;
}
.dp__action_buttons .dp__action_select{
  background-color: #8c00ff;
}
.dp__today{
  border: 1px solid #8c00ff;
}

.Create_content section {
  margin-top: 10px;
  margin-bottom: 10px;
}

.input_title, input {
  background-color: white;
  border-radius: 20px;
  padding: 6px;
  width: 30%;
}

.input_desc {
  height: 50px;
  width: 80%;
  border-radius: 10px;
  padding: 8px;
  resize: vertical;
  font-size: 16px;
  background-color: white;
}

.DateBlock {
  width: 10px;
}

.AddButton button {
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
</style>
