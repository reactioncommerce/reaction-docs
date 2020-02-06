/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary");

/* eslint-disable prefer-destructuring */
const Container = CompLibrary.Container;
/* eslint-enable prefer-destrcturing */

const CWD = process.cwd();

const versions = require(`${CWD}/versions.json`);
const baseURL = "/";

class Versions extends React.Component {
  render() {
    const latestVersion = versions[0];
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h1>Versions</h1>
            </header>
            <p>New versions of this project are released every so often.</p>
            <h2 id="latest">Current version (Stable)</h2>
            <table className="versions">
              <tbody>
                <tr>
                  <th>{latestVersion}</th>
                  <td>
                    <a href={`${baseURL}docs/intro.html`}>Documentation</a>
                  </td>
                  <td>
                    <a href="https://github.com/reactioncommerce/reaction/blob/trunk/CHANGELOG.md">Release Notes</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              This is the version that is configured automatically when you
              first install this project.
            </p>
            <h2 id="rc">Pre-release version</h2>
            <table className="versions">
              <tbody>
                <tr>
                  <th>v3-next</th>
                  <td>
                    <a href={`${baseURL}docs/next/intro.html`}>Documentation</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 id="archive">Past versions</h2>
            <table className="versions">
              <tbody>
                {versions.map((version) =>
                  version !== latestVersion && (
                    <tr key={version.toString()}>
                      <th>{version}</th>
                      <td>
                        <a href={`${baseURL}docs/${version}/intro.html`}>Documentation</a>
                      </td>
                      <td>
                        <a href="https://github.com/reactioncommerce/reaction/blob/trunk/CHANGELOG.md">Release Notes</a>
                      </td>
                      <td>
                        <a href="https://github.com/reactioncommerce/reaction/blob/trunk/CHANGELOG.md">Change Log</a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Versions;
