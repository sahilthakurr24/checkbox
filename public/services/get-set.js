import { redis } from "../../reddis.connection.js";

const CHECKBOX_STATE_KEY = "checkbox-state";
const CHECKBOX_SIZE = 160;
export async function setData(data) {
  let remoteData;
  const existingState = await redis.get(CHECKBOX_STATE_KEY);
  if (existingState) {
    remoteData = JSON.parse(existingState);
  } else {
    //create initital state
    remoteData = new Array(CHECKBOX_SIZE).fill(false);
  }

  remoteData[data.index] = data.checked;

  //saving into redis
  await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData));
}

export async function getData() {
  const existingData = await redis.get(CHECKBOX_STATE_KEY);
  if (existingData) {
    const remoteData = JSON.parse(existingData);
    return remoteData;
  } else {
    return null;
  }
}
