const header = new Headers({
  "Content-Type": "application/json",
});

export function fetchColumnsFromDB() {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: header,
    };

    fetch(`${process.env.API_URL}/column`, options)
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

export function updateColumnTitleInDB(id, { username, column_name }) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "PUT",
      headers: header,
      body: JSON.stringify({ username, column_name }),
    };

    fetch(`${process.env.API_URL}/column/${id}`, options)
      .then((res) => res.json())
      .then(resolve())
      .catch((error) => reject(error));
  });
}
