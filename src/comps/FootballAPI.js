export default function FootballAPI(path) {
  const unirest = require("unirest");
  return new Promise(resolve => {
    return unirest
      .get(`https://api-football-v1.p.rapidapi.com/${path}`)
      .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
      .header(
        "X-RapidAPI-Key",
        "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447"
      )
      .end(resolve);
  });
}
