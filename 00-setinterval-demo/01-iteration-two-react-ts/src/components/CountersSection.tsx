import React from "react";
import CounterColumn from "./CounterColumn";
import { useCounters } from "../hooks/useCounters";

const CountersSection: React.FC = () => {
  const { mainThreadCounter, workerCounter, mainThreadStatus, workerStatus } =
    useCounters();

  return (
    <section className="counters-section" aria-labelledby="counters-heading">
      <h2 id="counters-heading">Live Counters</h2>
      <div className="counters-container">
        <CounterColumn
          title="setInterval on the main thread"
          counter={mainThreadCounter}
          status={mainThreadStatus}
          ariaLabel="Main thread counter"
        />
        <CounterColumn
          title="setInterval in a web worker"
          counter={workerCounter}
          status={workerStatus}
          ariaLabel="Web worker counter"
        />
      </div>
    </section>
  );
};

export default CountersSection;
