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
          .then(data => resolve(data))
          .catch(error => reject(error));
    });
}
