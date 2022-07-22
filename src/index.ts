import { login } from "./config";

async function init() {
  try {
    const client = await login();
    return client;
  } catch (error) {
    console.error(`Login Failed. ${error}`);
  }
}

init();
