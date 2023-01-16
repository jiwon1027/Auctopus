import React from "react";
import { useRouteError } from "react-router-dom";

// interface Error {
//   statusText: string;
//   message: string;
// }
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  function message(): string | null {
    if (error instanceof Error) {
      // return error.statusText || error.message;
      return error.message;
    }

    return null;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message()}</i>
      </p>
    </div>
  );
}
