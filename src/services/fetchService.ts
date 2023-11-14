import axios from 'axios';
const fetchService = async (destiny: string) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${process.env.URL_SOCKET}/send/message`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: {
        destiny,
        message: 'Go fetch the posts',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
const fetchPostSocket = async () => fetchService('fetchPost');

export default {
  fetchPostSocket,
};
