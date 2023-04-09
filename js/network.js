const URL = 'https://28.javascript.pages.academy/kekstagram';

const getImagesFromServer = async() => {
  try {
    return await (await fetch(`${URL}/data`)).json();
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendImageToServer = async(form) => {
  try {
    const init = { method: 'POST', body: new FormData(form) };
    await fetch(URL, init);
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getImagesFromServer, sendImageToServer };
