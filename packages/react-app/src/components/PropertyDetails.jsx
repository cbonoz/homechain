import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Steps, Button } from "antd";

const { Step } = Steps;

const steps = [
  {
    title: "Purchase NFT here",
    content: "Purchasing the NFT gives you a stake in the listed property",
  },
  {
    title: "Your address is added to a list of participants",
    content: "After purchasing the NFT, your address is saved as a participant",
  },
  {
    title: "Get repaid",
    content: "Payout occurs when the property is next sold.",
  },
];

function PropertyDetails({ history, match, property }) {
  const pid = match && match.propertyId;
  const p = property || {};
  const propTitle = p.title || "property";
  const listingTitle = `Participate in NFT for ${propTitle}.`;

  const purchase = () => {
    const unl = window.unlockProtocol;
    if (!unl) {
      alert("Unlock protocol not defined on window");
      return;
    }

    // https://docs.unlock-protocol.com/developers/paywall/locking-page
    const config = {
      pessimistic: true,
      locks: {
        "0x250a0153DfB52B44c560524283A6629C1d347545": {
          // TODO: use dynamic lock id
          network: 4,
          name: "Unlock",
        },
      },
      icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.10UUFNA8oLdFdDpzt-Em_QHaHa%26pid%3DApi&f=1",
      callToAction: {
        default: listingTitle,
      },
      metadataInputs: [
        {
          name: "Name",
          type: "text",
          required: true,
        },
      ],
    };
    unl.loadCheckoutModal(config);
  };

  return (
    <div>
      <br />
      <h1>{listingTitle}</h1>
      <br />
      <Row>
        <Col span={12}>
          <Steps direction="vertical" current={1}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Col>
        <Col span={12}>
          <p>{JSON.stringify(p)}</p>

          <Button onClick={purchase}>Purchase</Button>
        </Col>
      </Row>
    </div>
  );
}

export default PropertyDetails;
