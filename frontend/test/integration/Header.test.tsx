import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@components/common/Header";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

describe("simple test", () => {
  it("tests that title is properly shown", () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header title="this title" />
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(screen.getByText(/This title/i)).toBeDefined();
  });
});
