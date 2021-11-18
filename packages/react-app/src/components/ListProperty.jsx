import React, { useState, useEffect, useRef } from "react";

import { Input, Button, Steps, Layout, Modal } from "antd";
// import { createBucketWithFiles } from "../../util/bucket";
// import { toGatewayURL } from "nft.storage";
import { addCard, DEMO_PROPERTIES } from "../util";
import { FileDropzone } from "./FileDropzone";
import ReactSignatureCanvas from "react-signature-canvas";
import IntegerStep from "./IntegerStep";
import { makeListingFiles, storeFiles } from "../util/stor";
import { createStream, initCeramic } from "../util/ceramic";
const toGatewayURL = e => e; // TODO: replace with https url for ipfs directory

const { Header, Footer, Sider, Content } = Layout;

const { Step } = Steps;

const LAST_STEP = 3;

function ListProperty({ isLoggedIn, signer, provider, address, blockExplorer }) {
  const [currentStep, setCurrentStep] = useState(0);
  const sigRef = useRef();

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn && currentStep === 0) updateStep(1);
  }, [isLoggedIn]);

  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({ ...DEMO_PROPERTIES[0], percent: 10, limit: 10, imgUrl: "" });
  const [result, setResult] = useState({});
  const [signatureCollected, setSignatureCollected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const clearInfo = () => setInfo({});

  const updateInfo = update => {
    setInfo({ ...info, ...update });
  };

  const handleOk = () => {
    setSignatureCollected(true);
  };

  useEffect(() => {
    if (signatureCollected) {
      updateStep(1);
    }
  }, [signatureCollected]);

  const updateStep = async offset => {
    const newStep = currentStep + offset;
    if (newStep === LAST_STEP) {
      if (!files) {
        alert("At least one file must be added");
        return;
      }

      if (!signatureCollected) {
        setShowModal(true);
        return;
      }

      setLoading(true);

      const sigData = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
      const uploadFiles = makeListingFiles(files, sigData);

      try {
        await initCeramic(address);
      } catch (e) {
        console.error(e);
      }

      try {
        const cid = await storeFiles(uploadFiles);
        const d = { ...info, cid };
        const res = await createStream(d);
        d["stream"] = res;

        setResult(d);

        const card = {
          ...d,
          createdAt: new Date(),
        };

        addCard(card); // TODO: add persistence (ex: moralis).
      } catch (e) {
        console.error("error creating listing", e);
        alert(e.toString());
        return;
      } finally {
        setLoading(false);
      }

      setShowModal(false);
    }

    console.log("update step", newStep);
    setCurrentStep(newStep);
  };

  const getBody = () => {
    switch (currentStep) {
      case 0: // confirm login
        return (
          <div>
            <h2 className="sell-header">Login</h2>
            <p>
              In order to create a listing, you must login with your metamask or wallet account. Click 'connect' in the
              top right to begin.
            </p>
          </div>
        );
      case 1: // info
        return (
          <div className="info-section">
            <h2 className="sell-header">What are you listing?</h2>
            <Input
              addonBefore={"Property(s)"}
              placeholder="Enter name of listing"
              value={info.title}
              onChange={e => updateInfo({ title: e.target.value })}
            />
            <Input
              addonBefore={"Description"}
              placeholder="Enter listing description"
              value={info.description}
              onChange={e => updateInfo({ description: e.target.value })}
            />

            <p>Enter percent of property (up to 10) for sale</p>
            <IntegerStep val={info.percent} onChange={percent => updateInfo({ percent })} k />

            <Input
              addonBefore={"Number purchase-able"}
              placeholder="Enter max possible participants"
              value={info.eth}
              onChange={e => updateInfo({ limit: e.target.value })}
            />

            <Input
              addonBefore={"Image"}
              addonAfter={"A default will be used if blank"}
              placeholder="Enter listing image or thumbnail url (optional)"
              value={info.imgUrl}
              onChange={e => updateInfo({ imgUrl: e.target.value })}
            />
            <Input addonBefore={"Address"} disabled placeholder="Payment Address: " value={address} />
          </div>
        );
      case 2: // upload
        return (
          <div>
            <FileDropzone files={files} setFiles={setFiles} />
          </div>
        );
      case 3: // done
        return (
          <div className="complete-section">
            <h2 className="sell-header">Complete!</h2>

            {Object.keys(result).map(k => {
              return (
                <li>
                  {k}: {JSON.stringify(result[k]).replaceAll('"', "")}
                </li>
              );
            })}
            <h3>Listing information</h3>
            {Object.keys(info).map(k => {
              return (
                <li key={k}>
                  {k}: {JSON.stringify(info[k]).replaceAll('"', "")}
                </li>
              );
            })}

            {result.url && (
              <a href={toGatewayURL(result.url)} target="_blank">
                Click here to view listing.
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <div className="content">
      <h1>Create your real estate NFT</h1>
      <Header>
        <Steps current={currentStep}>
          <Step title="Login" description="Authenticate." />
          <Step title="Information" description="What are you listing?" />
          <Step title="Verify" description="Add proof of ownership." />
          <Step title="Done" description="View listing." />
        </Steps>
      </Header>
      <Content>
        <div className="sell-area">{getBody()}</div>
      </Content>
      <Footer>
        {(currentStep !== 0 || (currentStep !== 1 && !isLoggedIn)) && (
          <Button disabled={loading} type="primary" onClick={() => updateStep(-1)}>
            Previous
          </Button>
        )}
        {currentStep < LAST_STEP && (
          <Button disabled={loading} loading={loading} type="primary" onClick={() => updateStep(1)}>
            {currentStep === LAST_STEP - 1 ? "Done" : "Next"}
          </Button>
        )}

        {/* https://github.com/agilgur5/react-signature-canvas */}
        <Modal
          title="Enter signature"
          visible={showModal}
          onOk={handleOk}
          cancelText={"Cancel"}
          onCancel={() => setShowModal(false)}
        >
          {/* <h3>Enter signature</h3> */}
          <p>
            By signing this you are asserting that the attached document is valid and that you are the authorized party
            to create this transaction / non-fungible token.
          </p>
          <div className="sig-canvas">
            <ReactSignatureCanvas
              className="sig-canvas"
              ref={ref => {
                sigRef.current = ref;
              }}
            />
            <p>Clicking 'Done' below will create and list the NFT for purchase.</p>
          </div>
          <Button onClick={() => sigRef.current.clear()}>Clear</Button>
        </Modal>
      </Footer>
    </div>
  );
}

export default ListProperty;
