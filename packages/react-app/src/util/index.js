import faker from "faker";

export const capitalize = s => {
  if (typeof s !== "string") return "";
  return (s.charAt(0).toUpperCase() + s.slice(1)).replace("-", " ");
};
export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}

export const createFullAddress = () =>
  `${faker.address.streetAddress()}, ${faker.address.city()} ${faker.address.stateAbbr()}`;

const createProperty = () => ({
  id: faker.datatype.number(),
  title: faker.address.streetAddress(),
  description: "Own 1% of this property.",
});

export const DEMO_PROPERTIES = [createProperty(), createProperty(), createProperty()];

export const addCard = p => DEMO_PROPERTIES.push(p);
