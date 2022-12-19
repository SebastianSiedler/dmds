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
