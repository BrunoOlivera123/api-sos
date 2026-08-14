/**
 * API-SOS
 * Arquivo: tests/health.test.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const request = require("supertest");
const app = require("../src/app");
test("GET /api/health", async () => {
  const r = await request(app).get("/api/health");
  expect(r.statusCode).toBe(200);
  expect(r.body.success).toBe(true);
});
