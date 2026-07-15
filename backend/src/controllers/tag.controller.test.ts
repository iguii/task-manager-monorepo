import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

import app from "../app";
import { prisma } from "../lib/prisma";

describe("Tag API", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should create a tag", async () => {
    // Arrange
    vi.spyOn(prisma.tag, "create").mockResolvedValue({
      id: 1,
      name: "work",
    } as any);

    // Act
    const response = await request(app)
      .post("/api/v1/tags")
      .send({ name: "work" });

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "work",
    });
  });

  it("should return all tags", async () => {
    // Arrange
    vi.spyOn(prisma.tag, "findMany").mockResolvedValue([
      { id: 1, name: "work" },
      { id: 2, name: "home" },
    ] as any);

    // Act
    const response = await request(app).get("/api/v1/tags");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should update a tag", async () => {
    // Arrange
    vi.spyOn(prisma.tag, "findUnique").mockResolvedValue({
      id: 1,
      name: "work",
    } as any);

    vi.spyOn(prisma.tag, "update").mockResolvedValue({
      id: 1,
      name: "office",
    } as any);

    // Act
    const response = await request(app)
      .put("/api/v1/tags/1")
      .send({ name: "office" });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("office");
  });

  it("should delete a tag", async () => {
    // Arrange
    vi.spyOn(prisma.tag, "findUnique").mockResolvedValue({
      id: 1,
      name: "work",
    } as any);

    vi.spyOn(prisma.tag, "delete").mockResolvedValue({
      id: 1,
      name: "work",
    } as any);

    // Act
    const response = await request(app).delete("/api/v1/tags/1");

    // Assert
    expect(response.status).toBe(200);
  });
});
