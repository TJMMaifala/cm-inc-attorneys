// Tiny stand-in for the Resend API, used only by the end-to-end tests.
import http from "node:http";

let last = null;
let mode = "ok";

http
  .createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (req.method === "GET" && url.pathname === "/health") {
      res.writeHead(200).end("ok");
      return;
    }
    if (req.method === "GET" && url.pathname === "/last") {
      res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(last));
      return;
    }
    if (req.method === "POST" && url.pathname === "/mode") {
      let b = "";
      req.on("data", (c) => (b += c));
      req.on("end", () => {
        mode = JSON.parse(b).mode;
        res.writeHead(204).end();
      });
      return;
    }
    if (req.method === "POST" && url.pathname === "/emails") {
      let b = "";
      req.on("data", (c) => (b += c));
      req.on("end", () => {
        last = { auth: req.headers.authorization, body: JSON.parse(b) };
        if (mode === "fail") {
          res.writeHead(500, { "Content-Type": "application/json" }).end('{"message":"boom"}');
        } else {
          res.writeHead(200, { "Content-Type": "application/json" }).end('{"id":"mock-id-1"}');
        }
      });
      return;
    }
    res.writeHead(404).end();
  })
  .listen(4010, () => console.log("mock resend on 4010"));
