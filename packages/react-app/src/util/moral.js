import Moralis from "moralis";
const Property = Moralis.Object.extend("Property");

export const saveProperty = async prop => {
  const prop = new Property();
  delete prop["id"];
  const keys = Object.keys(prop);

  keys.forEach(k => {
    prop.save(k, prop[k]);
  });
  console.log("save", prop);
  return await prop.save();
};

// https://docs.moralis.io/moralis-server/database/queries
export const getProperty = async cid => {
  const query = new Moralis.Query(Property);
  query.equalTo("cid", cid);
  const results = await query.find();
  return results;
};

export const getProperties = async (skip, limit) => {
  limit = limit || 25;
  skip = skip || 0;

  const query = new Moralis.Query(Property);
  query.skip(skip);
  query.withCount();
  const results = await query.find();
  console.log("properties", results);
  return results;
};
