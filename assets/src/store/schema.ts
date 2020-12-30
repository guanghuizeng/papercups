const schema = {
  ':user/uid': {
    ':db/unique': ':db.unique/identity',
  },

  ':user/eventTypes': {
    ':db/cardinality': ':db.cardinality/many',
  },

  ':user/schedules': {
    ':db/cardinality': ':db.cardinality/many',
  },

  ':eventKind/uid': {
    ':db/unique': ':db.unique/identity',
  },

  ':eventType/uid': {
    ':db/unique': ':db.unique/identity',
  },

  ':event/uid': {
    ':db/unique': ':db.unique/identity',
  },

  ':schedule/uid': {
    ':db/unique': ':db.unique/identity',
  },

  // ":schedule/rules": {
  //   ":db/cardinality": ":db.cardinality/many",
  // },
};

export default schema;
