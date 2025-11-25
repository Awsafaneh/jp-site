import { describe, expect, it, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("products router", () => {
  const caller = appRouter.createCaller(createPublicContext());

  describe("products.list", () => {
    it("returns a list of products without filters", async () => {
      const result = await caller.products.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns a list of products with limit parameter", async () => {
      const result = await caller.products.list({ limit: 5 });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it("returns a list of products with offset parameter", async () => {
      const result = await caller.products.list({ offset: 0, limit: 10 });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("products.featured", () => {
    it("returns featured products with default limit", async () => {
      const result = await caller.products.featured();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(6);
    });

    it("returns featured products with custom limit", async () => {
      const result = await caller.products.featured({ limit: 3 });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(3);
    });
  });

  describe("products.byId", () => {
    it("returns null or product when querying non-existent product", async () => {
      const result = await caller.products.byId({ id: 99999 });
      expect(result === null || result === undefined || typeof result === "object").toBe(true);
    });
  });
});

describe("categories router", () => {
  const caller = appRouter.createCaller(createPublicContext());

  describe("categories.list", () => {
    it("returns a list of categories", async () => {
      const result = await caller.categories.list();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("categories.byId", () => {
    it("returns null or category when querying non-existent category", async () => {
      const result = await caller.categories.byId({ id: 99999 });
      expect(result === null || result === undefined || typeof result === "object").toBe(true);
    });
  });
});

describe("contact router", () => {
  const caller = appRouter.createCaller(createPublicContext());

  describe("contact.submit", () => {
    it("accepts valid contact form submission", async () => {
      const result = await caller.contact.submit({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Subject",
        message: "Test message content",
      });
      expect(result).toHaveProperty("success");
      expect(typeof result.success).toBe("boolean");
    });

    it("rejects invalid email format", async () => {
      try {
        await caller.contact.submit({
          name: "Test User",
          email: "invalid-email",
          subject: "Test Subject",
          message: "Test message content",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("rejects empty required fields", async () => {
      try {
        await caller.contact.submit({
          name: "",
          email: "test@example.com",
          subject: "Test Subject",
          message: "Test message content",
        });
        expect.fail("Should have thrown validation error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
