import { Session } from "neo4j-driver";
import { Vertice } from "./vertex.js";

/**
 *
 * @param {Object} args
 * @param {Set<Vertice<{elementId: string}>>} args.nodes
 * @param {Session} args.session
 */
export const insertNodes = async ({ nodes, session }) => {
  /* create Nodes */
  for (const node of nodes) {
    const result = await session.run(
      `CREATE (n:Node {name: "${node.name}"}) RETURN n`
    );
    const neo4jNode = result.records[0].get(0);
    node._value = { elementId: neo4jNode.elementId };
  }

  /* add relation between nodes */
  for (const node of nodes) {
    if (node._value === null) throw `Node (${node.name}) _value is null`;
    for (const [edge, weight] of node._edges) {
      if (edge._value === null) throw "no elementId given";

      const result = await session.run(
        `MATCH 
                (a:Node), 
                (b:Node) 
            WHERE 
                elementId(a) = "${node._value.elementId}" 
                AND 
                elementID(b) = "${edge._value.elementId}"
            CREATE (a)-[r:RELTYPE]->(b)
            RETURN type(r), a, b
            `
      );
    }
  }
};
