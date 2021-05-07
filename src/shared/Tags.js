import React, { useState } from "react";
import { UncontrolledPopover } from "reactstrap";
import "./Tags.css";
import SVG from "react-inlinesvg";
import ManageModal from "../components/Modal/ManageModal";
import SelectItemColor from "./SelectItemColor";
import PerfectScrollbar from "react-perfect-scrollbar";
export default function Tags() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddTags, setShowAddTags] = useState(false);
  const [getColor, setGetColor] = useState("#000");
  const [itemAssign, setitemAssign] = useState([
    {
      id: 1,
      name: "Hai",
      urlImage:
        "https://lh3.googleusercontent.com/a-/AOh14Gh89Xm868XwS9UpxcP2vhxjfa5z3FGWtIQ9zw-2=s96-c",
    },
    {
      id: 2,
      name: "Tai",
      urlImage:
        "https://lh5.googleusercontent.com/-vTzxWbKBI5Q/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm4H_7H_I3Yv2L_9uljHkle-T_HjA/s96-c/photo.jpg",
    },
    {
      id: 3,
      name: "Sinh",
      urlImage:
        "https://lh3.googleusercontent.com/a-/AOh14Gh_LDoDQRmTcqIELNtHkKmz3SxQDMUv73GRIoTE=s96-c",
    },
    {
      id: 4,
      name: "Thuan",
      urlImage:
        "https://lh3.googleusercontent.com/a-/AOh14GiWqWS-hq1psujqVVMIuQNId58kBJagtZSmTwfG=s96-c",
    },
  ]);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const toggleModalClose = () => {
    setIsOpen(false);
  };
  const assignItem = () => {
    let dataAssign = [];
    itemAssign.forEach((item) => {
      dataAssign.push(
        <div
          className={"kr-view assign-items-user"}
          style={{ display: "flex" }}
          key={item.id}
        >
          <div
            className="kr-view"
            style={{ paddingRight: "10px", alignItems: "center" }}
          >
            <div
              className="kr-view"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "rgb(0, 170, 255) 0px 0px 0px -1px inset",
              }}
            >
              <div
                className="kr-view"
                style={{
                  top: "0px",
                  left: "0px",
                  width: "100%",
                  height: "100%",
                  borderRadius: "100%",
                  alignItems: "center",
                  position: "absolute",
                  transform: "scaleX(1) scaleY(1)",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <div
                  className="kr-view"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    backgroundImage: `url(${item.urlImage})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="kr-text"
            style={{
              flexGrow: "1",
              flexShrink: "1",
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "22px",
              letterSpacing: "normal",
              alignItems: "center",
              width: "100%",
              color: "rgb(61, 71, 77)",
            }}
          >
            {item.name}
          </div>
        </div>
      );
    });
    return dataAssign;
  };
  const showManage = () => {
    return (
      <div>
        <ManageModal show={isOpen} onClose={toggleModalClose}>
          <div>
            <div style={{ display: "flex", padding: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  color: "rgb(220, 226, 230)",
                  margin: "10px",
                  background: "yellow",
                  borderRadius: "50%",
                  padding: "5px",
                }}
              >
                <SVG src={require("../css/icons/tag.svg")} />
              </div>
              <div style={{ flexGrow: "1" }}>
                <div>
                  <input className="input-none-border" type="text" />
                </div>
                <div>
                  <input
                    className="input-none-border"
                    placeholder="Add description"
                  />
                </div>
              </div>

              <div className="icon-tags">
                <SVG src={require("../css/icons/eye.svg")} />
              </div>
              <div className="icon-tags" id="show-more">
                <UncontrolledPopover
                  target="show-more"
                  trigger="legacy"
                  placement="bottom"
                >
                  <div style={{ width: "300px", marginLeft: "20px" }}>
                    <div>Invete Person</div>
                    <div>Archived tasks</div>
                    <div>Bin</div>
                    <div>More</div>
                  </div>
                </UncontrolledPopover>
                <SVG src={require("../css/icons/ellips.svg")} />
              </div>
            </div>
            <div className="tags">Tags</div>
            <div className="box-item">
              {showAddTags ? (
                <div className="box-item-null">
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      color: "rgb(220, 226, 230)",
                      margin: "10px",
                      background: "yellow",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
                  >
                    <SVG src={require("../css/icons/tag.svg")} />
                  </div>
                  <div className="hea-notags">No Tags</div>
                  <div className="content-notags">
                    Tag, label, organize. Easy and colorful.
                  </div>
                </div>
              ) : (
                <div className="add-tags">
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      color: getColor,
                      padding: "5px",
                    }}
                  >
                    <SVG src={require("../css/icons/tag.svg")} />
                  </div>
                  <div className="input-hover-style">
                    {/* <input className="input-add-tag" type="text" /> */}
                    <div className="text-change-div">abc</div>
                    <div className="color-hover">
                      <SelectItemColor
                        mywidth="10px"
                        setColor={(x) => setGetColor(x)}
                      />
                    </div>
                    <div
                      class="kr-view"
                      style={{
                        color: "rgb(61, 71, 77)",
                        width: "24px",
                        height: "36px",
                        marginRight: "5px",
                      }}
                    >
                      <SVG src={require("../css/icons/close.svg")} />
                    </div>
                  </div>
                </div>
              )}

              <div
                onClick={() => setShowAddTags(!showAddTags)}
                className="kr-view checklist-item"
              >
                <div
                  className="kr-view"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: "1",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="kr-view"
                    style={{
                      width: "16px",
                      height: "25px",
                      color: "rgb(0, 170, 255)",
                    }}
                  >
                    <SVG src={require("../css/icons/plus.svg")} />
                  </div>
                  <div className="kr-text checklist-item-text">Add Tag</div>
                </div>
                <div
                  className="kr-view"
                  style={{ flexGrow: "1", flexShrink: "1" }}
                ></div>
              </div>
            </div>
          </div>
        </ManageModal>
      </div>
    );
  };
  return (
    <UncontrolledPopover
      target="tags"
      trigger={isOpen ? "click" : "legacy"}
      placement="bottom"
      style={{ display: isOpen ? "none" : "block" }}
    >
      <div className={"kr-view assing-popover"} style={{ zIndex: "auto" }}>
        <div className={"kr-view"}>
          <div className={"kr-view header-assing"} style={{ display: "flex" }}>
            <div className={"kr-text header-assing-item"}>Assign</div>
            <div
              id="show-manage"
              style={{
                color: "rgb(0, 170, 255)",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "inherit",
                marginLeft: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                toggleModal();
              }}
            >
              Manage
            </div>
          </div>
          <div
            style={
              {
                //   flexDirection: "column",
                //   width: "100%",
                //   flexGrow: "1",
                //   flexShrink: "1",
                //   cursor: "default",
                //   userSelect: "none",
              }
            }
          >
            <div
              className={"kr-view"}
              style={{
                flexDirection: "column",
                width: "100%",
                flexGrow: "1",
                flexShrink: "1",
                cursor: "default",
                userSelect: "none",
              }}
            >
              <div
                className={"kr-view"}
                style={{
                  marginBottom: "10px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                <div className={"kr-text search-assign"}>
                  <div
                    className={"kr-view"}
                    style={{
                      marginRight: "8px",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <div
                      className={"kr-view"}
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "rgb(138, 148, 153)",
                      }}
                    >
                      <SVG src={require("../css/icons/search.svg")} />
                    </div>
                  </div>
                  <input
                    type="text"
                    // name="searchAssign"
                    placeholder="Search Tags"
                    className="kr-view mousetrap"
                    style={{
                      color: "rgb(61, 71, 77)",
                      backgroundColor: "transparent",
                      fontSize: "15px",
                      fontWeight: "400",
                      lineHeight: "22px",
                      letterSpacing: "normal",
                      flexGrow: "1",
                      flexShrink: "1",
                      width: "100%",
                    }}
                    // value={"sss"}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                flexGrow: "1",
                flexShrink: "1",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                maxHeight: "347.8px",
                minHeight: "0px",
                height: "339px",
              }}
            >
              <PerfectScrollbar>
                <div
                  className={"kr-view"}
                  style={{
                    flexGrow: "1",
                    flexShrink: "1",
                    alignItems: "center",
                    minHeight: "40px",
                  }}
                >
                  <div
                    className={"kr-view assign-items-user"}
                    style={{ display: "flex" }}
                  >
                    <div
                      className="kr-view"
                      style={{ paddingRight: "10px", alignItems: "center" }}
                    >
                      <div
                        className="kr-view"
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "rgb(0, 170, 255) 0px 0px 0px -1px inset",
                        }}
                      >
                        <div
                          className="kr-view"
                          style={{
                            top: "0px",
                            left: "0px",
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                            alignItems: "center",
                            position: "absolute",
                            transform: "scaleX(1) scaleY(1)",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            className="kr-view"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "100%",
                              backgroundSize: "cover",
                              backgroundPosition: "center center",
                              backgroundImage:
                                "url(https://lh5.googleusercontent.com/-vTzxWbKBI5Q/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucm4H_7H_I3Yv2L_9uljHkle-T_HjA/s96-c/photo.jpg)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="kr-text"
                      style={{
                        flexGrow: "1",
                        flexShrink: "1",
                        fontSize: "15px",
                        fontWeight: "400",
                        lineHeight: "22px",
                        letterSpacing: "normal",
                        alignItems: "center",
                        width: "100%",
                        color: "rgb(61, 71, 77)",
                      }}
                    >
                      Hai
                    </div>
                    <div
                      className="kr-view"
                      style={{ paddingLeft: "10px", alignItems: "flex-end" }}
                    >
                      <div
                        className="kr-view"
                        style={{
                          width: "16px",
                          height: "16px",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "rgb(61, 71, 77)",
                          display: "flex",
                        }}
                      >
                        <SVG src={require("../css/icons/check.svg")} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div
                      className="kr-view"
                      style={{
                        height: "1px",
                        backgroundColor: "rgb(237, 241, 242)",
                        flexGrow: "1",
                        marginTop: "4px",
                        marginBottom: "4px",
                      }}
                    ></div>
                  </div>
                  {assignItem()}
                </div>
              </PerfectScrollbar>
            </div>

            {/* <div
              style={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  color: "rgb(220, 226, 230)",
                  margin: "10px auto",
                }}
              >
                <SVG src={require("../css/icons/tag.svg")} />
              </div>
              <div
                style={{
                  color: "rgb(138, 148, 153)",
                  fontSize: "15px",
                  paddingBottom: "10px",
                }}
              >
                No tags found
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {showManage()}
    </UncontrolledPopover>
  );
}
