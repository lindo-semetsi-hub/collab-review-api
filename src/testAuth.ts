import fetch from "node-fetch"; 

const BASE_URL = "http://localhost:3000/api/auth";

async function testRegister() {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({

      name: "Lindo",

      email: "lindo@test.com",
      password: "586211"
    }),
  });




  const data = await res.json();
  console.log("Register response:", data);
}

async function testLogin() {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "lindo@test.com",
      password: "586211"
    }),
  });

  const data = await res.json();
  console.log("Login response:", data);
}

//run
(async () => {
  await testRegister();
  await testLogin();
})();