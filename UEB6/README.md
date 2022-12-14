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