import { useRouteError } from "react-router-dom";
import "./App.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page" className="error">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
