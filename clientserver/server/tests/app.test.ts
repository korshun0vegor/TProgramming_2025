import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app";

describe("createApp", () => {
  it("GET / returns server status", async () => {
    const res = await request(createApp()).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Student server is working");
  });

  it("GET /api/students returns students list", async () => {
    const res = await request(createApp()).get("/api/students");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
