
#### Задание 2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
 - запрос для *поиска* полей документов коллекции **books** по полю *title*
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 

1) запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**

```javascript
db.books.insertOne(
  {
    title: "The Catcher in the Rye",
    description: "Novel",
    authors: "J. D. Salinger"
  }
);
db.books.insertOne(
  {
    title: "Misery",
    description: "Thriller novel",
    authors: "Stephen King"
  }
);
```

2) запрос для *поиска* полей документов коллекции **books** по полю *title*

```javascript
db.books.find(
  { title: "Misery" }
);
```

3) запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи

```javascript
db.books.UpdateOne(
  { _id: "bookId" },
  { $set: { description: "New description", authors: "New authors" } }
);
```
