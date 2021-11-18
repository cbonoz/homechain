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

  const purchase = () => {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal({});
  };

  const p = property || {};

  return (
    <div>
      <br />
      <h1>Purchase NFT for {p.title || "property"}.</h1>
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

          <Button onClick={purchase}>Purchase NFT</Button>
        </Col>
      </Row>
    </div>
  );
}

export default PropertyDetails;
