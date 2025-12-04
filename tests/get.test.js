test("auto testing the iindex endpoint", async () => {
  const res = await fetch("http://localhost:3000");
  expect(res.status).toBe(200);
});
