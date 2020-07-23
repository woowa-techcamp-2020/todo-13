const API_SERVER_URL = "http://localhost:3000/api";
const header = new Headers({
  "Content-Type": "application/json",
});

export function fetchColumnsFromDB() {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: header,
    };

    fetch(`${API_SERVER_URL}/column`, options)
      .then((response) => response.json())
      .then((data) => {
        // const categories = data.map((item) => item.column_name);
        // resolve(categories);
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

// export function updateColumnTitleInDB(id, { username, column_name }) {
//   return new Promise((resolve, reject) => {
//     const options = {
//       method: "PUT",
//       headers: header,
//       body: JSON.stringify({ author, content }),
//     };

//     fetch(`${API_SERVER_URL}//${id}`, options)
//       .then((res) => res.json())
//       .then(resolve())
//       .catch((error) => reject(error));
//   });
// }
