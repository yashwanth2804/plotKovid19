import React from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

function TestGraph() {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text", color: "red" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },

      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2, arrows: "to" },

      { from: 1, to: 3, arrows: "to" },
      { from: 2, to: 4, arrows: "to" },
      { from: 2, to: 5, arrows: "to" },
    ],
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 16,
    },
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };
  return <Graph graph={graph} options={options} events={events} />;
}
export default TestGraph;
