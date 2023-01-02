migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kf1g8q0rau1859z")

  collection.name = "messages"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kf1g8q0rau1859z")

  collection.name = "chatroom"

  return dao.saveCollection(collection)
})
