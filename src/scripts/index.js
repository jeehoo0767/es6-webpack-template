import '../styles/index.scss';

const $app = document.querySelector('#app');

$app.innerHTML = `
  <div class="welcome">
    <h1 class="welcome__title">Webpack es6 Boilerplate</h1>
    <p class="welcome__desc">
      This is a JavaScript boilerplate using webpack v5.
    </p>
  </div>
`;
