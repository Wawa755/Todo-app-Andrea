import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todoList: []
  }),
  actions: {
    addTask(title, description, date) {
      const newTask = {
        title,
        description,
        date: new Date(date).toISOString(), //make date in easier format
        status: 'incomplete'
      };
      this.todoList.push(newTask);
    },

    toggleStatus(index) {
      let task = this.todoList[index];
    
      //save time when completed
      if (task.status === 'incomplete') {
        task.status = 'complete';
        task.completedAt = new Date().toISOString();
      } else {
        task.status = 'incomplete';
        task.completedAt = null;
      }
    }
    
  }
});
