import React, { useContext, useState, useEffect } from "react";
import {
  Row,
  Col,
  Upload,
  Button,
  message,
  Progress,
  Divider,
  Spin,
} from "antd";
import "./step3.scss";
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  LeftCircleOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { appContext } from "../../../Contexts/AppContext";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Step3 = (props) => {
  const fileProps = {
    name: "file",
    action: "http://localhost:8080/app/uploadFile1",
    headers: {
      authorization: "authorization-text",
    },
  };

  const { appState, appDispatch } = useContext(appContext);
  const initialState = {
    fileUploadStatus: "active",
    showFileStatus: false,
    uploadStatus: "",
    id: appState.registration.mongoId,
    isAnalyzing: false,
  };

  // useEffect(() => {
  //   console.log(appState.registration.mongoId);
  // }, []);

  const [state, setState] = useState(initialState);

  const beforeUpload = (file) => {
    console.log(file.type);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    file.type === "application/vnd.google-earth.kml+xml"
      ? setState({ ...state, isAllKML: true })
      : setState({ ...state, isAllKML: false });
    console.log(state.isAllKML);
    return file.type === "application/vnd.google-earth.kml+xml";
  };
  const handlefileonchange = async (info) => {
    setState({
      ...state,
      showFileStatus: true,
      uploadStatus: "Uploading",
    });
    console.log("===>", info);
    if (info.file.status !== "uploading") {
      console.log(" Uploading");
      console.log(info.file, info.fileList);
      setState({
        ...state,
        fileUploadStatus: "active",
        uploadStatus: "Uploading",
      });
    }
    if (info.file.status === "done") {
      setState({
        ...state,
        fileUploadStatus: "success",
        uploadStatus: "Uploaded",
      });
    } else if (info.file.status === "error") {
      console.log("------> Failed upload file");
      console.log(info.file);
      setState({
        ...state,
        fileUploadStatus: "exception",
        uploadStatus: "Upload Failed",
      });
      message.error(`${info.file.name} file upload failed.`);
      props.history.push("/plot");
    }
  };

  const analyze = async () => {
    const url = "http://localhost:8080/app/analyze?id=" + state.id;
    console.log("ANALYSE", url);
    const resp = await axios.get(url);
    if (resp.status == 200) {
      const getUser_Url = "http://localhost:8080/app/getUser?id=" + state.id;
      const resp_getUser_Url = await axios.get(getUser_Url);
      const username = resp_getUser_Url.data.username;
      console.log("Localstorage ==> UserName", username);
      await localStorage.setItem("UserName", username);
      await localStorage.setItem("MongoID", appState.registration.mongoId);

      await appDispatch({ type: "LOG_IN", payload: { name: username } });

      console.log("moving to plot");
      props.history.push("/plot");
    }
  };

  return (
    <div>
      <>
        <div>
          <div className={"card-title"}>
            Upload KML files{""}
            <span style={{ fontSize: "1rem" }}>
              (
              <a
                href={"https://www.google.com/maps/timeline"}
                target={"_blank"}
              >
                Google Timeline
              </a>
              )
            </span>{" "}
          </div>
          <div className={"step3-body"}>
            <Divider dashed />
            <Row>
              <Col sm={{ offset: 8 }}>
                {" "}
                <Upload
                  data={{ id: state.id }}
                  {...fileProps}
                  accept="application/vnd.google-earth.kml+xml"
                  showUploadList={false}
                  multiple={true}
                  beforeUpload={beforeUpload}
                  onChange={async (info) => handlefileonchange(info)}
                  // style={{
                  //   marginLeft: "35%"
                  // }}
                >
                  <Button>Click to Upload KML Files</Button>
                </Upload>
              </Col>
            </Row>
            <Divider dashed />
            {state.showFileStatus ? (
              <>
                <Row>
                  <Col xs={{ span: 24 }} sm={{ span: 4, offset: 6 }}>
                    <span style={{ fontSize: "1.5rem" }}>
                      {state.uploadStatus}
                    </span>
                  </Col>
                  <Col xs={{ span: 20 }} sm={{ span: 8, offset: 2 }}>
                    <Progress
                      percent={100}
                      size="small"
                      status={state.fileUploadStatus}
                      showInfo={false}
                    />
                  </Col>
                  <Col style={{ padding: "5px" }}>
                    {state.fileUploadStatus == "active" ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      ""
                    )}

                    {state.fileUploadStatus == "success" ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                {state.fileUploadStatus == "success" ? (
                  <Row>
                    <Col xs={{ span: 24 }} sm={{ span: 4, offset: 8 }}>
                      {/* <Button type="link">Go To App</Button> */}
                      <button className="gtn" onClick={() => analyze()}>
                        <span className="gtn__content">
                          Analyze My Location Data
                        </span>
                        <span className="gtn__glitch"></span>
                      </button>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <Row style={{ float: "right" }}>
            <Col>
              {" "}
              <LeftCircleOutlined
                className={"btn"}
                onClick={() => appDispatch({ type: "DEC_INDEX" })}
                style={{ fontSize: "2rem" }}
              />
            </Col>
          </Row>
        </div>
      </>
    </div>
  );
};

export default withRouter(Step3);

// class step3 extends Component {
//   state = {
//     fileUploadStatus: "active",
//     showFileStatus: false,
//     uploadStatus: "",
//     id: "",
//     isAnalyzing: false
//   };
//   beforeUpload = file => {
//     console.log(file.type);
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     file.type === "application/vnd.google-earth.kml+xml"
//       ? this.setState({ isAllKML: true })
//       : this.setState({ isAllKML: false });
//     console.log(this.state.isAllKML);
//     return file.type === "application/vnd.google-earth.kml+xml";
//   };
//   handlefileonchange = async info => {
//     this.setState({ showFileStatus: true, uploadStatus: "Uploading" });
//     console.log("===>", info);
//     if (info.file.status !== "uploading") {
//       console.log(" Uploading");
//       console.log(info.file, info.fileList);
//       this.setState({ fileUploadStatus: "active", uploadStatus: "Uploaded" });
//     }
//     if (info.file.status === "done") {
//       this.setState({ fileUploadStatus: "success" });
//     } else if (info.file.status === "error") {
//       console.log("------> Failed upload file");
//       console.log(info.file);
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };

//   analyze = async () => {
//     const resp = await axios.get(
//       "http://localhost:8080/app/analyze?id=" + this.state.id
//     );
//     if (resp.status == 200) {
//       console.log("moving to plot");
//       this.props.history.push("/plot");
//     }
//   };
//   async componentDidMount() {
//     const id = await localStorage.getItem("mongoID");
//     this.setState({ id: id });
//   }

//   render() {
//     const props = {
//       name: "file",
//       action: "http://localhost:8080/app/uploadFile1",
//       headers: {
//         authorization: "authorization-text"
//       }
//     };

//     return (
//       <>
//         <div>
//           <div className={"card-title"}>
//             Upload KML files{""}
//             <span style={{ fontSize: "1rem" }}>
//               (
//               <a
//                 href={"https://www.google.com/maps/timeline"}
//                 target={"_blank"}
//               >
//                 Google Timeline
//               </a>
//               )
//             </span>{" "}
//           </div>
//           <div className={"step3-body"}>
//             <Divider dashed />
//             <Row>
//               <Col sm={{ offset: 8 }}>
//                 {" "}
//                 <Upload
//                   data={{ id: this.state.id }}
//                   {...props}
//                   accept="application/vnd.google-earth.kml+xml"
//                   showUploadList={false}
//                   multiple={true}
//                   beforeUpload={this.beforeUpload}
//                   onChange={async info => this.handlefileonchange(info)}
//                   // style={{
//                   //   marginLeft: "35%"
//                   // }}
//                 >
//                   <Button>Click to Upload KML Files</Button>
//                 </Upload>
//               </Col>
//             </Row>
//             <Divider dashed />
//             {this.state.showFileStatus ? (
//               <>
//                 <Row>
//                   <Col xs={{ span: 24 }} sm={{ span: 4, offset: 6 }}>
//                     <span style={{ fontSize: "1.5rem" }}>
//                       {this.state.uploadStatus}
//                     </span>
//                   </Col>
//                   <Col xs={{ span: 20 }} sm={{ span: 8, offset: 2 }}>
//                     <Progress
//                       percent={100}
//                       size="small"
//                       status={this.state.fileUploadStatus}
//                       showInfo={false}
//                     />
//                   </Col>
//                   <Col style={{ padding: "5px" }}>
//                     {this.state.fileUploadStatus == "active" ? (
//                       <Spin indicator={antIcon} />
//                     ) : (
//                       ""
//                     )}

//                     {this.state.fileUploadStatus == "success" ? (
//                       <CheckCircleTwoTone twoToneColor="#52c41a" />
//                     ) : (
//                       ""
//                     )}
//                   </Col>
//                 </Row>
//                 {this.state.fileUploadStatus == "success" ? (
//                   <Row>
//                     <Col xs={{ span: 24 }} sm={{ span: 4, offset: 8 }}>
//                       {/* <Button type="link">Go To App</Button> */}
//                       <button className="gtn" onClick={() => this.analyze()}>
//                         <span className="gtn__content">
//                           Analyze My Location Data
//                         </span>
//                         <span className="gtn__glitch"></span>
//                       </button>
//                     </Col>
//                   </Row>
//                 ) : (
//                   ""
//                 )}
//               </>
//             ) : (
//               ""
//             )}
//           </div>
//           <Row style={{ float: "right" }}>
//             <Col>
//               {" "}
//               <LeftCircleOutlined
//                 className={"btn"}
//                 onClick={() => this.props.decreaseIndex()}
//                 style={{ fontSize: "2rem" }}
//               />
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
// export default withRouter(step3);
//export default step3;
