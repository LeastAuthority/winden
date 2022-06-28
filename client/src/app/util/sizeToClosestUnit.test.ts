import { sizeToClosestUnit } from "./sizeToClosestUnit";

describe("sizeToClosestUnit", () => {
  it("works", () => {
    expect(sizeToClosestUnit(1)).toBe("1.0 bytes");
    expect(sizeToClosestUnit(10)).toBe("10.0 bytes");
    expect(sizeToClosestUnit(100)).toBe("100.0 bytes");
    expect(sizeToClosestUnit(1000)).toBe("1.0 kB");
    expect(sizeToClosestUnit(1500)).toBe("1.5 kB");
    expect(sizeToClosestUnit(1000000)).toBe("1.0 MB");
    expect(sizeToClosestUnit(1500000)).toBe("1.5 MB");
    expect(sizeToClosestUnit(1000000000)).toBe("1.0 GB");
    expect(sizeToClosestUnit(1500000000)).toBe("1.5 GB");
  });
});
