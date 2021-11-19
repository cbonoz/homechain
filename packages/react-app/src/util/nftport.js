import axios from "axios";

const NFT_PORT_KEY = process.env.NFT_PORT_KEY;
console.log("NFT_PORT_KEY", NFT_PORT_KEY);

export const createNftFromFileData = (data, chain) => {
  var options = {
    method: "POST",
    url: "https://api.nftport.xyz/v0/mints/easy/files",
    params: { chain: chain || "polygon" },
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: NFT_PORT_KEY,
      "content-type": "multipart/form-data; boundary=---011000010111000001101001",
    },
    data,
  };

  return axios.request(options);
};
