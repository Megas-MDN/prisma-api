import axios from 'axios';

const fetchPostSocket = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${process.env.URL_SOCKET}/send/message`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: {
        destiny: 'fetchPost',
        message: 'Go fetch the posts',
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export default {
  fetchPostSocket,
};
