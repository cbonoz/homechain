pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract HomeChainContract is ChainlinkClient {
  using Chainlink for Chainlink.Request;


  string title = ""; // Title of contract (property)
  string description = ""; // Description of contract
  address owner; // Issuer
  uint limit; // participant limit.
  uint percent;
  uint price;

  address private oracle;
  bytes32 private jobId;
  uint256 private fee;

  uint256 public estimate;

  uint numberParticipants;

  mapping(address => uint) public participants;

  constructor(
    string memory _title, 
    string memory _description, 
    uint _limit, 
    uint _percent, 
    uint _price) public {
      // Set contract properties.
      owner = msg.sender;
      title = _title;
      description = _description;
      limit = _limit;
      price = _price;
      percent = _percent;
      numberParticipants = 0;


      // Params specific to network deployment.
      oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
      jobId = "d5270d1c311941d0b08bead21fea7747";
      fee = 0.1 * 10 ** 18; // (Varies by network and job)
  }

  function purchaseStake() public payable {
    require(msg.value == price, "Please send correct amount to contract.");
    require(numberParticipants < limit, "This contract is oversubscribed or full.");

    // Add the sender as a participant.
    numberParticipants += 1;
    participants[msg.sender] = 1;
  }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     * https://docs.chain.link/docs/advanced-tutorial/
     */
    function requestEstimateData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on.
        // TODO: replace with SmartZIP / home-estimate API call
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.ETH.USD.VOLUME24HOUR");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _estimate) public recordChainlinkFulfillment(_requestId)
    {
        estimate = _estimate;
    }
}
