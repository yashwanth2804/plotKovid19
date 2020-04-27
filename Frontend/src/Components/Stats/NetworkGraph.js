import React, { useEffect, useState } from "react";
//import Graph from "react-graph-network";
//import Graph from "react-d3-graph";
import Graph from "react-graph-vis";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";
import Axios from "axios";
import _ from "lodash";
const NetworkGraph = () => {
  const [data, setData] = useState(null);

  const graph = {
    nodes: [
      { id: 1, label: "SheHulk", title: "node 1 tootip text", color: "red" },
      { id: 2, label: "FeMan", title: "node 2 tootip text", color: "blue" },
      {
        id: 3,
        label: "Captian America",
        title: "node 3 tootip text",
        color: "orange",
      },

      { id: 4, label: "Loki", title: "node 4 tootip text", color: "yellow" },
      { id: 5, label: "Thor", title: "node 5 tootip text", color: "pink" },
    ],
    edges: [
      { from: 1, to: 2, arrows: "to" },

      { from: 1, to: 3, arrows: "to" },
      { from: 4, to: 5, arrows: "to" },
    ],
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 5,
    },
    // layout: {
    //   hierarchical: true,
    // },
    edges: {
      color: "#000000",
    },
    height: "500px",
  };

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     const url = "http://localhost:8080/app/getConnections";
  //     const resp = await Axios.get(url);
  //     const data_ = resp.data;
  //     console.log(JSON.stringify(data_));

  //     const nodes = data_
  //       .map((f) => {
  //         return [f.user, ...f.connectedusers];
  //       })
  //       .flatMap((f) => f)
  //       .reduce((u, i) => (u.includes(i) ? u : [...u, i]), [])
  //       .map((f) => {
  //         const color = intToRGB(hashCode(f));
  //         return { id: f, label: f, color: "#" + color };
  //       })
  //       .flatMap((f) => f);

  //     console.log(nodes);
  //     const links = data_
  //       .map((f) => {
  //         return f.connectedusers.map((c, i) => {
  //           return { from: f.user, to: c, arrows: "to" };
  //           //return { id: "e" + i, source: f.user, target: c, label: "SEES" };
  //         });
  //       })
  //       .flatMap((f) => f);
  //     console.log(links);
  //     console.log(new Set(links));
  //     const Data = { nodes: nodes, edges: links };
  //     console.log(JSON.stringify(Data));
  //     setData(Data);
  //   };
  //   asyncFunc();
  // }, []);

  const hashCode = (str) => {
    // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const intToRGB = (i) => {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  };

  return (
    <div>
      <div style={{ height: "350px" }}>
        {<Graph graph={graph} options={options} />}
      </div>
    </div>
  );
};

export default NetworkGraph;
