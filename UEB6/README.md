Run with `node ./UEB/index.js`

```
Adjazenzliste: 
0 -> [1,3,2]
1 -> [0,2,3]
2 -> [1,3,0,4]
3 -> [0,1,4,2]
4 -> [3,2]

Adjacency Matrix: 
   0 1 2 3 4
--+----------
0 |   1 1 1  
1 | 1   1 1  
2 | 1 1   1 1
3 | 1 1 1   1
4 |     1 1  
```

nach docker compose up auf 
http://localhost:7474/
verbinden und password ändern

SELECT QUERY: 
```js
match (n:Person) return *
```



Delete all nodes and relationships: 
```js
match (n:Node) detach delete n
```