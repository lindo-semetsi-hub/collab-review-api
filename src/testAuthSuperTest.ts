import request from "supertest";
import app from "./server";

(async () => {
  try {
    console.log("=== Testing /register ===");
    const registerRes = await request(app)


      .post("/api/auth/register")
      .send({
        name: "Lindo",
        email: "lindo@test.com",

        password: "586211"
      });
    console.log("register response:", registerRes.body);

    console.log("=== Testing /login ===");


    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({

        email: "lindo@test.com",
        password: "586211"
      });
    console.log("login response:", loginRes.body);




  } catch (err) {
    console.error("test error:", err);
  }
})();