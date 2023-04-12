const showErrorModal = (title, buttonText) => `
  <section class="error app-modal">
    <div class="error__inner">
      <h2 class="error__title">${title}</h2>
      <button type="button" class="error__button app-modal__button">${buttonText}</button>
    </div>
  </section>
`;

const showSuccessModal = (title, buttonText) => `
  <section class="success app-modal">
    <div class="success__inner">
      <h2 class="success__title">${title}</h2>
      <button type="button" class="success__button app-modal__button">${buttonText}</button>
    </div>
  </section>
`;

const closeAppModalByClickHandler = ({ target }) => {
  if (target.classList.contains('app-modal') || target.classList.contains('app-modal__button')) {
    document.querySelector('section.app-modal').remove();
    removeEventListener('click', closeAppModalByClickHandler);
  }
};

const closeAppModalByEscapeHandler = ({ code }) => {
  if (code === 'Escape') {
    document.querySelector('section.app-modal').remove();
    removeEventListener('keydown', closeAppModalByEscapeHandler);
  }
};

const showModal = (modalHtml) => {
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.addEventListener('click', closeAppModalByClickHandler);
  document.addEventListener('keydown', closeAppModalByEscapeHandler);
};

export { showSuccessModal, showErrorModal, showModal };
