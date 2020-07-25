import { getTimeDifferenceInSecond, getCreatedAtMessage } from "../utils/util";

const header = new Headers({
  "Content-Type": "application/json",
});

export function fetchActivitiesFromDB() {
  return new Promise((resolve, reject) => {
    const options = {
      method: "GET",
      headers: header,
    };
    fetch(`${process.env.API_URL}/activity`, options)
      .then((response) => response.json())
      .then((data) => {
        data.forEach(
          (activity) => {
            const timeDifferenceInSecond = getTimeDifferenceInSecond(activity.created_at);
            activity.created_at = getCreatedAtMessage(timeDifferenceInSecond);
          }
        );
        resolve(data);
      })
      .then((error) => reject(error));
  });
}
