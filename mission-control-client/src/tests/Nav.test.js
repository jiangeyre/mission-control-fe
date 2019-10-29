import React from "react";
import Nav from "../components/layout/Nav";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import * as rtl from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
afterEach(rtl.cleanup);

describe("Nav", () => {
  it('renders "mission control" text', () => {
    const history = createMemoryHistory();
    const { container, getByText } = rtl.render(
      <Router history={history}>
        <Nav />
      </Router>
    );
    const target = getByText(/mission control/i);
    expect(container.contains(target)).toBeTruthy();
  });

  it('directs to the login page when "Sign In" is clicked', async () => {
    const history = createMemoryHistory();
    const { getByText } = rtl.render(
      <Router history={history}>
        <Nav />
      </Router>
    );
    // Click login button
    await fireEvent.click(getByText("Sign In"));
    expect(history.location.pathname).toBe("/login");
  });

  it('directs to the register page when "Sign Up" is clicked', async () => {
    const history = createMemoryHistory();
    const { getByText } = rtl.render(
      <Router history={history}>
        <Nav />
      </Router>
    );
    // Click register button
    await fireEvent.click(getByText("Sign Up"));
    expect(history.location.pathname).toBe("/register");
  });

  it("clicking nav head sends you to dashboard when logged in", () => {
    localStorage.setItem("token", "token");
    localStorage.setItem("user", "user");

    const history = createMemoryHistory();
    const { getByText } = rtl.render(
      <Router history={history}>
        <Nav />
      </Router>
    );

    expect(history.location.pathname).not.toBe("/dashboard/user");

    const head = getByText(/mission control/i);

    fireEvent.click(head);

    expect(history.location.pathname).toBe("/dashboard/user");
  });

  it("clicking nav head sends you to login page when not logged in", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const history = createMemoryHistory();
    const { getByText } = rtl.render(
      <Router history={history}>
        <Nav />
      </Router>
    );

    expect(history.location.pathname).not.toBe("/login");

    const head = getByText(/mission control/i);

    fireEvent.click(head);

    expect(history.location.pathname).toBe("/login");
  });
});
