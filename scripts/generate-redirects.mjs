import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_ENDPOINT = process.env.API_ENDPOINT;
const API_KEY = process.env.API_KEY;

const query = `{ 
                  redirects: allRedirect {
                    results {
                        id
                        name
                        fromPath
                        toPath
                    }
                  }
                }`;

const options = {
  method: "POST",
  url: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "X-GQL-Token": API_KEY,
  },
  data: JSON.stringify({ query }),
};

axios
  .request(options)
  .then(function (response) {
    const json = response.data;
    const result = [];

    json["data"]["redirects"]["results"].forEach((rdr) => {
      const from = rdr["fromPath"];
      const to = rdr["toPath"];

      result.push(from + " " + to);
    });

    fs.writeFileSync("public/_redirects", result.join("\n"));
  })
  .catch(function (error) {
    console.error(error);
  });
