import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";

const requestUseMock = vi.fn();

const axiosInstance = {
  interceptors: {
    request: {
      use: requestUseMock,
    },
  },
};

vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => axiosInstance),
  },
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

vi.stubGlobal("localStorage", localStorageMock);

describe("api service", () => {
  beforeEach(() => {
    // Arrange
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("should create an axios instance with the configured baseURL", async () => {
    // Arrange

    // Act
    await import("./api");

    // Assert
    expect(axios.create).toHaveBeenCalledWith({
      baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:3000/api/v1",
    });
  });

  it("should register a request interceptor", async () => {
    // Arrange

    // Act
    await import("./api");

    // Assert
    expect(requestUseMock).toHaveBeenCalledTimes(1);
    expect(typeof requestUseMock.mock.calls[0][0]).toBe("function");
  });

  it("should add the Authorization header when a token exists", async () => {
    // Arrange
    localStorageMock.getItem.mockReturnValue("test-token");

    await import("./api");

    const interceptor = requestUseMock.mock.calls[0][0];

    const config = {
      headers: {},
    };

    // Act
    const result = interceptor(config);

    // Assert
    expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    expect(result.headers.Authorization).toBe("Bearer test-token");
  });

  it("should not add the Authorization header when no token exists", async () => {
    // Arrange
    localStorageMock.getItem.mockReturnValue(null);

    await import("./api");

    const interceptor = requestUseMock.mock.calls[0][0];

    const config = {
      headers: {},
    };

    // Act
    const result = interceptor(config);

    // Assert
    expect(localStorageMock.getItem).toHaveBeenCalledWith("token");
    expect(result.headers.Authorization).toBeUndefined();
  });
});
