import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todoList: []
  }),
  actions: {
    addTask(title, description, date) {
      if (!title.trim()) {
        alert("Task title can't be empty!");
        return;
      }
      const taskDescription = description.trim() ? description : '/';

      const newTask = {
        title,
        description: taskDescription,
        date: new Date(date).toISOString(), //make date in an easier format
        status: 'incomplete'
      };

      this.todoList.push(newTask);
    },

    toggleTaskStatus(index) {
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
