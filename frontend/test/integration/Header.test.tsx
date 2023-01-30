import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@components/common/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";

describe("simple test", () => {
  it("tests that title is properly shown", () => {
    render(
      <Router>
        <ThemeProvider theme={theme}>
          <Header title="this title" leftIcon="none" />
        </ThemeProvider>
      </Router>
    );
    expect(screen.getByText(/This title/i)).toBeDefined();
  });
});
