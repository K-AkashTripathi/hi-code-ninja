import axios from "axios";

export const apiEndpoints = {
  query: {
    url: "/v1.0/query",
    method: "post"
  }
}

export const apiCall = (apiEndpoint, data) => {
  const { url, method } = apiEndpoint
  return new Promise((resolve, reject) => {
    const req = {
      method,
      url: "http://localhost:8080/api" + url,
      // headers: { authorization: "your token comes here" },
    }
    if (data) {
      req.data = data
    }
    axios(req)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        if (err.message == 'Network Error') {
          setTimeout(() => {
            reject(err)
          }, 2000);
        } else {
          reject(err)
        }
      });
  })

}