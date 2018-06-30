const React = require("react");

class NotFoundPage extends React.Component {
  render() {
    return (
      <center style={{ marginTop: "4rem" }}>
        <h1>404</h1>
        <p>Oops! You've reached the end of docs. Go back <a href="/">home</a>.</p>
      </center>
    );
  }
}

module.exports = NotFoundPage;
