const API_SERVER_URL = "http://localhost:3000/api";
const header = new Headers({
  "Content-Type": "application/json",
});

export function fetchActivitiesFromDB() {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: header,
    };
    fetch(`${API_SERVER_URL}/activity`, options)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(
          (activity) =>
            (activity.created_at = activity.created_at
              .slice(0, 19)
              .replace("T", " "))
        );
        resolve(data);
      })
      .then((error) => reject(error));
  });
}
