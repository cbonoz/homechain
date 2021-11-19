import React from "react";
import { Row, Col, Steps, Button, Image } from "antd";
import { DEFAULT_HOME_ICON } from "../constants";
import { capitalize } from "../util";

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
  const listingTitle = `participate in NFT for ${propTitle}`;

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
        "0xA5c657Ce8f1f77283344985Ac00a5303f86b45e7": {
          // TODO: use dynamic lock id
          network: 4, // rinkeby
          name: "Unlock",
        },
      },
      icon: DEFAULT_HOME_ICON,
      callToAction: {
        default: `To ${listingTitle}, complete payment by unlocking access below.`,
      },
      metadataInputs: [
        {
          name: "Your name",
          type: "text",
          required: true,
        },
      ],
    };
    unl.loadCheckoutModal(config);
  };

  const imgUrl = p.imgUrl || DEFAULT_HOME_ICON;

  return (
    <div>
      <Image src={imgUrl} width={100} />
      <br />
      <h1>{capitalize(listingTitle)}</h1>
      <br />
      <Row>
        <Col span={12}>
          <h3>Instructions</h3>
          <Steps direction="vertical" current={0}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} description={item.description} />
            ))}
          </Steps>
        </Col>
        <Col span={12}>
          <h3>Property Details</h3>
          {/* <p>{JSON.stringify(p)}</p> */}
          {Object.keys(p).map((k, i) => {
            return (
              <li key={i}>
                {capitalize(k)}: {JSON.stringify(p[k]).replaceAll('"', "")}
              </li>
            );
          })}
        </Col>
        <Button type="primary" onClick={purchase}>
          Purchase
        </Button>
      </Row>
    </div>
  );
}

export default PropertyDetails;
