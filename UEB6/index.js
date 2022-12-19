import neo4j from "neo4j-driver";
import { insertNodes } from "./utils/insertNodes.js";
import fs from "fs";
import {
  displayAdjacencyMatrix,
  getAdjazentlist,
  txtToGraph,
} from "./utils/index.js";

const driver = neo4j.driver(
  "neo4j://localhost",
  neo4j.auth.basic("neo4j", "neo4j_pw")
);

const main = async () => {
  const serverInfo = await driver.getServerInfo();
  // console.log(serverInfo);

  const session = driver.session({
    defaultAccessMode: neo4j.session.WRITE,
  });

  /* Delete all nodes */
  await session.run("MATCH (n:Node) DETACH DELETE n");

  const text = fs.readFileSync("./UEB6/graph1.txt").toString();
  const nodes = txtToGraph(text);

  getAdjazentlist(nodes);
  displayAdjacencyMatrix(nodes);

  await insertNodes({ session, nodes });

  driver.close();
};
main();
