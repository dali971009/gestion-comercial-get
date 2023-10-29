import { defineStore } from 'pinia';
import { type SnackbarProps } from '@/stores/global-snackbar/snackbar-props';
import { ref } from 'vue';

export default defineStore('snackbar', () => {
  const messages = ref([] as SnackbarProps[]);
  function removeMessage(message: SnackbarProps) {
    const index = messages.value.findIndex(msg => {
      return msg.title === message.title && msg.text === message.text;
    });
    if (index !== -1) {
      messages.value.splice(index, 1);
    }
  }
  function push(message: SnackbarProps) {
    message.show = true;
    if (!message.timeout) {
      message.timeout = 4000;
    }
    if (message.closable === undefined) {
      message.closable = true;
    }
    messages.value.unshift(message);
    setTimeout(removeMessage, message.timeout, message);
    if (messages.value.length > 5) {
      messages.value.pop();
    }
  }

  return { messages, push };
});
