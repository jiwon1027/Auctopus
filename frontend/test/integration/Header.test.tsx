import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@components/common/Header";

describe("simple test", () => {
  it("tests to show a text", () => {
    render(<Header title="this title" />);
    expect(screen.getByText(/This title/i)).toBeDefined();
  });
});
