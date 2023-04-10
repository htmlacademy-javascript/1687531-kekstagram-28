const renderComment = (avatar, name, message) => `
  <li class="social__comment">
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  </li>
`;

export default renderComment;
