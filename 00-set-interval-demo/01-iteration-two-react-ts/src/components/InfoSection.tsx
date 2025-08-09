import React from "react";

const InfoSection: React.FC = () => {
  return (
    <section
      data-testid="info-section"
      className="info-section"
      aria-labelledby="info-heading"
    >
      <h2 id="info-heading">What's good to know about using setInterval</h2>

      <div className="comparison-grid">
        <div className="comparison-card main-thread">
          <h3>Main Thread</h3>
          <div className="pros-cons">
            <div className="pros">
              <h4>Pros</h4>
              <ul>
                <li>Direct access to DOM elements</li>
                <li>Simple to implement and debug</li>
                <li>No additional setup required</li>
                <li>Immediate access to page context</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Cons</h4>
              <ul>
                <li>Blocks UI rendering when busy</li>
                <li>Can cause page to become unresponsive</li>
                <li>Affects user experience during heavy operations</li>
                <li>Timing can be delayed by other JavaScript execution</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="comparison-card web-worker">
          <h3>Web Worker</h3>
          <div className="pros-cons">
            <div className="pros">
              <h4>Pros</h4>
              <ul>
                <li>Runs in background without blocking UI</li>
                <li>More accurate timing (less affected by main thread)</li>
                <li>Better performance for intensive tasks</li>
                <li>Doesn't interfere with user interactions</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Cons</h4>
              <ul>
                <li>No direct DOM access</li>
                <li>Communication requires message passing</li>
                <li>More complex to implement</li>
                <li>Limited browser support in older browsers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
