const API_SERVER_URL = "http://localhost:3000/api";
const header = new Headers({
  "Content-Type": "application/json",
});

export function fetchCardsFromDB() {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: header,
    };

    fetch(`${API_SERVER_URL}/card`, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// todo 버그잡기
export function insertCreatedCardIntoDB(newCard) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify(newCard),
    };

    fetch(`${API_SERVER_URL}/card`, options)
      .then((res) => res.json())
      .then(resolve(newCard))
      .catch((error) => reject(error));
  });
}

export function getLatestCardIdFromDB(newCard) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: header,
    };
    fetch(`${API_SERVER_URL}/card/latest_id`, options)
      .then((res) => res.json())
      .then((data) => resolve(data.latestId))
      .catch((error) => reject(error));
  });
}

export function updateMovedCardInfo(data) {
  return new Promise((resolve, reject) => {
    const options = {};

    fetch().then().then(resolve()).catch(reject());
  });
}

export function updateCardContentInDB(id, { author, content }) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "PUT",
      headers: header,
      body: JSON.stringify({ author, content })
    };

    fetch(`${API_SERVER_URL}/card/${id}`, options)
    .then(res => res.json())
    .then(resolve())
    .catch(error => reject(error));
  });
}

export function deleteCardInDB(id) {
  return new Promise((resolve, reject) => {
    const options = {
      method: "DELETE",
      headers: header
    };

    fetch(`${API_SERVER_URL}/card/${id}`, options)
    .then(res => res.json())
    .then(resolve())
    .catch(error => reject(error));
  });
}
