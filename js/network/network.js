const URL = 'https://28.javascript.pages.academy/kekstagram';

const getImagesFromServer = async() => await (await fetch(`${URL}/data`)).json();

const sendImageToServer = async(form) => await fetch(URL, { method: 'POST', body: new FormData(form) });

export { getImagesFromServer, sendImageToServer };
