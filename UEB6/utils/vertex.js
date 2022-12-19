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
  /** @type {Map<Vertice<T>, number>} */
  _edges = new Map();

  /** @type {T|null} */
  _value = null;

  /**
   *
   * @param {Vertice<T>} node
   * @param {number} weight
   */
  _addEdge(node, weight) {
    this._edges.set(node, weight);
  }

  /**
   *
   * @param  {...Vertice<T>} nodes
   */
//   addEdges(...nodes) {
//     nodes.forEach((node) => {
//       this._addEdge(node);
//     });
//   }
}
