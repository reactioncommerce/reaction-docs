/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer reaction-footer" id="footer">
        <div className="reaction-footer-logo">
          <a href="https://reactioncommerce.com" target="_blank">
            <img
              src="/img/logo@2x.png"
              alt="Reaction Commerce"
              width="39"
              height="39"
            />
          </a>
        </div>
        <div className="sitemap">
          <div className="link-grid">
            <div className="link-grid-column">
              <h5>Company</h5>
              <ul className="footer-list">
                <li><a target="_blank" href="https://reactioncommerce.com/about">About</a></li>
                <li><a target="_blank" href="https://blog.reactioncommerce.com/">Blog</a></li>
                <li><a target="_blank" href="https://reactioncommerce.com/about#contact">Contact</a></li>
                <li><a target="_blank" href="https://reactioncommerce.com/careers">Careers</a></li>
                <li><a target="_blank" href="https://reactioncommerce.com/press">Press</a></li>
              </ul>
            </div>

            <div className="link-grid-column">
              <h5>Explore</h5>
              <ul className="footer-list">
                <li><a target="_blank" href="https://reactioncommerce.com/features">Features</a></li>
                <li><a target="_blank" href="https://docs.reactioncommerce.com/reaction-docs/trunk/community-showcase">Showcase</a></li>
                <li><a target="_blank" href="https://reactioncommerce.com/roadmap">Roadmap</a></li>
                <li><a target="_blank" href="https://docs.reactioncommerce.com/">Docs</a></li>
                <li><a target="_blank" href="https://github.com/reactioncommerce/reaction">GitHub</a></li>
              </ul>
            </div>

            <div className="link-grid-column">
              <h5>Engage</h5>
              <ul className="footer-list">
                <li><a target="_blank" href="https://reactioncommerce.com/become-a-partner">Partner</a></li>
                <li><a target="_blank" href="https://reactioncommerce.com/contributors">Contribute</a></li>
                <li><a target="_blank" href="http://marketing.reactioncommerce.com/acton/media/37362/get-in-touch">Get in Touch</a></li>
              </ul>
            </div>

            <div className="newsletter">
              <ul className="social-list">
                <li><a target="_blank" href="https://twitter.com/getreaction"><i className="fa fa-twitter" /></a></li>
                <li><a target="_blank" href="https://facebook.com/reactioncommerce"><i className="fa fa-facebook" /></a></li>
                <li><a target="_blank" href="https://instagram.com/reactioncommerce"><i className="fa fa-instagram" /></a></li>
                <li><a target="_blank" href="https://github.com/reactioncommerce/reaction"><i className="fa fa-github" /></a></li>
              </ul>
            </div>

            <div className="row">
              <img src="/img/footer-sun.svg" alt="" />
              &nbsp;&nbsp;Made in the sunshine in Santa Monica, California by&nbsp;<a href="/" target="_blank">Reaction Commerce, Inc.</a>
              ©&nbsp;2019&nbsp;|&nbsp;<a href="https://reactioncommerce.com/legal">Legal</a> | <a href="https://www.reactioncommerce.com/legal/privacy">Privacy Policy</a>
            </div>

          </div>
        </div>
      </footer>
    );
  }
}

module.exports = Footer;
