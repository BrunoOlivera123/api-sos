const request=require("supertest"),app=require("../src/app");
test("GET /api/health",async()=>{const r=await request(app).get("/api/health");expect(r.statusCode).toBe(200);expect(r.body.success).toBe(true)});
