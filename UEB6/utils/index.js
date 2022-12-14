import fs from "fs";

/**
 * @template {any} T
 */
export class Vertice {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
  }

  name;
  /** @type {Vertice<T>[]} */
  _edges = [];

  /** @type {T|null} */
  _value = null;

  /**
   *
   * @param {Vertice<T>} node
   */
  _addEdge(node) {
    this._edges.push(node);
    /* sort by name */
    this._edges = this._edges.sort((a, z) =>
      a.name < z.name ? -1 : a.name > z.name ? 1 : 0
    );
  }

  /**
   *
   * @param  {...Vertice<T>} nodes
   */
  addEdges(...nodes) {
    nodes.forEach((node) => {
      this._addEdge(node);
    });
  }
}

/**
 *
 * @param {string} path
 * @returns
 */
export const getTextFromFile = async (path) => {
  const stream = await fetch(path, {});
  const text = await stream.text();
  return text;
};

/**
 *
 * @param {Set<Vertice<any>>} nodes
 */
const getAdjazentlist = (nodes) => {
  console.log("Adjazenzliste: ");
  nodes.forEach((node) => {
    console.log(`${node.name} -> [${node._edges.map((x) => x.name)}]`);
  });
};

/**
 *
 * @param {string} txt
 */
export const txtToGraph = (txt) => {
  /**
 * 
  [
  [ '0', '1' ], [ '1', '2' ],
  [ '1', '3' ], [ '1', '4' ],
  [ '1', '5' ], [ '2', '4' ],
  [ '3', '5' ], [ '4', '6' ],
  [ '5', '6' ], [ '5', '4' ]
]
 */
  const edges = txt
    .replaceAll(" ", "")
    .split("}{")
    .map((s) => s.replaceAll("{", "").replaceAll("}", "").split(","));

  /** @type {Record<string, Vertice<any>>} */
  const nodesRaw = {};

  /**
  '0': Node { name: '0', _edges: [] },
  '1': Node { name: '1', _edges: [] },
  '2': Node { name: '2', _edges: [] },
  '3': Node { name: '3', _edges: [] },
  '4': Node { name: '4', _edges: [] },
  '5': Node { name: '5', _edges: [] },
  '6': Node { name: '6', _edges: [] }
   */
  edges.forEach((edge) => {
    const [a, b] = edge;
    nodesRaw[a] = new Vertice(a);
    nodesRaw[b] = new Vertice(b);
  });

  edges.forEach((edge) => {
    const [a, b] = edge;
    nodesRaw[a].addEdges(nodesRaw[b]);
    nodesRaw[b].addEdges(nodesRaw[a]);
  });

  const nodes = new Set(Object.values(nodesRaw));

  // getAdjazentlist(nodes);

  return nodes;
};

const main = async () => {
  const text = fs.readFileSync("./UEB6/graph1.txt").toString();
  txtToGraph(text);
};

