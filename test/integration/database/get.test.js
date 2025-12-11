test("get test should return 200", async () => {
  const res = await fetch("http://localhost:3000/users");
  expect(res.status).toBe(200);
});
