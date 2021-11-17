import React, { useState, useEffect, useRef } from "react";

import { Input, Button, Steps, Layout, Modal } from "antd";
// import { createBucketWithFiles } from "../../util/bucket";
// import { toGatewayURL } from "nft.storage";
import { addCard, DEMO_PROPERTIES } from "../util";
import { FileDropzone } from "./FileDropzone";
import ReactSignatureCanvas from "react-signature-canvas";
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
  const [info, setInfo] = useState({ ...DEMO_PROPERTIES[0], eth: 0.01 });
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
        setShowModal(false);
        return;
      }

      setLoading(true);

      try {
        const res = {}; // await createBucketWithFiles(info.title, files);
        setResult(res);

        const card = {
          ...info,
          createdAt: new Date(),
          key: res.bucketKey,
        };

        addCard(card);
      } catch (e) {
        console.error("error creating listing", e);
        alert(e.toString());
        return;
      } finally {
        setLoading(false);
      }
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

            <Input
              addonBefore={"Price (eth)"}
              placeholder="Enter eth price"
              value={info.eth}
              onChange={e => updateInfo({ eth: e.target.value })}
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
      <h1>List new property in marketplace</h1>
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
        <Modal title="Sign to continue" visible={showModal} onOk={handleOk} onCancel={() => setShowModal(false)}>
          <ReactSignatureCanvas
            ref={ref => {
              sigRef.current = ref;
            }}
          />
          <Button onClick={() => sigRef.current.clear()}>Clear</Button>
        </Modal>
      </Footer>
    </div>
  );
}

export default ListProperty;
