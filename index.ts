import fetch from "node-fetch";
import express from "express";

const app = express();
const port = 8080;

interface Response {
  Joke: {
    Opener: string;
    Punchline: string;
  };
}

app.get("/", async (_, res) => {
  const response = await fetch("http://joke-service");

  if (!response.ok) {
    res.sendStatus(503);
    res.send(`Joke service call failed with HTTP ${response.status} (${response.statusText})`);
    return;
  }

  const responseBody = (await response.json()) as Response;

  res.send(`Hello from the API! The joke of the day is: ${responseBody.Joke.Opener} ${responseBody.Joke.Punchline}`);
});

app.get("/ping", async (_, res) => {
  res.send("pong");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
