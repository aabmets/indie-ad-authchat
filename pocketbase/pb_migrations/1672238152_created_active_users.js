migrate((db) => {
  const collection = new Collection({
    "id": "f522ezoiyvchi3i",
    "created": "2022-12-28 14:35:52.498Z",
    "updated": "2022-12-28 14:35:52.498Z",
    "name": "active_users",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8thmtk6k",
        "name": "username",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("f522ezoiyvchi3i");

  return dao.deleteCollection(collection);
})
