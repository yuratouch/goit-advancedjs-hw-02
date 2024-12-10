import iziToast from 'izitoast';

function createPromiseNotification({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function promiseHandler(promiseInstance) {
  promiseInstance
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch(value => {
      iziToast.error({
        message: `❌ Rejected promise in ${value}ms`,
        position: 'topRight',
      });
    });
}

const formElement = document.querySelector('.js-form');
formElement.addEventListener('submit', event => {
  event.preventDefault();

  const formElements = event.target.elements;

  const promise = createPromiseNotification({
    delay: formElements.delay.value,
    state: formElements.state.value === 'fulfilled' ? true : false,
  });

  promiseHandler(promise);
});
