migrate((db) => {
  const collection = new Collection({
    "id": "kf1g8q0rau1859z",
    "created": "2022-12-28 13:57:28.307Z",
    "updated": "2022-12-28 13:57:28.307Z",
    "name": "chatroom",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "99gnyvpn",
        "name": "username",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "aabejpnl",
        "name": "message",
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
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("kf1g8q0rau1859z");

  return dao.deleteCollection(collection);
})
