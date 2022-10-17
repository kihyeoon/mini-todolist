const BASE_URL = "http://localhost:3000/";

export const fetchCreate = (url, data) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    // .then((res) => {
    //   window.location.href = BASE_URL;
    // })
    .catch((error) => {
      console.error("Error", error);
    });
};

export const fetchDelete = (url, id) => {
  fetch(`${url}${id}`, {
    method: "DELETE",
  })
    // .then((res) => {
    //   window.location.href = BASE_URL;
    //   useFetch(url);
    // })
    .catch((error) => {
      console.error("Error", error);
    });
};

export const fetchPatch = (url, id, data) => {
  fetch(`${url}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(data),
  })
    // .then((res) => {
    //   window.location.href = BASE_URL;
    //   useFetch(url);
    // })
    .catch((error) => {
      console.error("Error", error);
    });
};
