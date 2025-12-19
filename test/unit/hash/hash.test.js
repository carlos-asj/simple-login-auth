import hashPassword from "infra/hash"; 

let senha = "senhaforte"

test("password should be encripted", async () => {
  const res = await hashPassword(senha);
  console.log("response:", res, "\nsenha:", senha)
  expect(res).not.toBe(senha)
})