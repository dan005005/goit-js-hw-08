import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
};
const STORAGE_KEY = 'feedback-form-state';
refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);
onLoadForm();

function onFormInput(e) {
  const email = refs.form.email.value;
  const message = refs.form.message.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
}

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
}

function onLoadForm() {
  const savedInfo = localStorage.getItem(STORAGE_KEY);
  if (savedInfo) {
    const parsedInfo = JSON.parse(savedInfo);
    refs.form.email.value = parsedInfo.email;
    refs.form.message.value = parsedInfo.message;
  }
}
