import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import Form from "@components/auth/signup/Form";

describe("signup tests", () => {
  it("tests managing states", async () => {
    render(
      <Router>
        <ThemeProvider theme={theme}>
          <Form />
        </ThemeProvider>
      </Router>
    );

    await userEvent.type(
      screen.getByPlaceholderText("example@gmail.com"),
      "ssafy@ssafy.com"
    );
    await userEvent.type(screen.getByPlaceholderText("비밀번호"), "pwd1");
    await userEvent.type(screen.getByPlaceholderText("비밀번호 확인"), "pwd1");
    await userEvent.type(screen.getByPlaceholderText("이름"), "Ssafy Kim");
    await userEvent.type(screen.getByPlaceholderText("닉네임"), "ssafy");

    // TODO: check(act) states
    // TODO: assert states are equal
    expect(screen.getByText(/This title/i)).toBeDefined();
  });

  it("tests to confirm password");
});
