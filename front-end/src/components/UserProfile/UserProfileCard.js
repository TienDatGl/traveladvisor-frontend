import React from "react";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";
import { AiOutlinePhone } from "react-icons/ai";
import { useSelector } from "react-redux";

const UserProfileCard = (props) => {
  const userInfo = useSelector((state) => state.user);

  const [isPreviewAvatarImage, setIsPreviewAvatarImage] = useState(false);

  return (
    <>
      {/* Pill Personal Information */}
      <div className="container mx-auto py-3 lg:max-w-7xl">
        <div className="lg:grid lg:grid-cols-9 lg:gap-4 lg:p-3">
          <div className="col-span-2">
            <div className="rounded-full bg-blue-500 py-2 text-center font-bold text-white">
              PERSONAL INFORMATION
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Content */}
      <div className="container mx-auto rounded-md border-t-[3px] border-blue-300 bg-[#F5FBFF] px-3 py-4 shadow-xl lg:max-w-7xl">
        <div className="grid grid-cols-9 gap-4 rounded-lg ">
          {/* #1 Left Content */}
          <div className="col-span-3 flex items-center justify-center">
            <img
              onClick={() => setIsPreviewAvatarImage(true)}
              className="object-fit max-h-96 w-full rounded-lg hover:cursor-pointer"
              src="https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg"
              alt="User_Avatar_Image"
            />
            {isPreviewAvatarImage == true && (
              <Lightbox
                image={`https://i.pinimg.com/736x/74/f4/f5/74f4f548392fbdafbe8a5d9764c83eaf.jpg`}
                title={"User_Avatar_Image"}
                onClose={() => setIsPreviewAvatarImage(false)}
              ></Lightbox>
            )}
          </div>

          {/* #2 Right Content */}
          <div className="col-span-6 p-3">
            <InputGroup className="mb-3">
              <InputGroup.Text className="fw-bold text-primary w-40">
                {" "}
                <AiOutlineUser className="mr-2" />
                User's Name
              </InputGroup.Text>
              <Form.Control
                placeholder="User's full name"
                aria-label="UserFullName"
                aria-describedby="basic-addon1"
                value={`${userInfo.user}`}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="fw-bold text-primary w-40">
                {" "}
                <AiOutlineInfoCircle className="mr-2" />
                Full name
              </InputGroup.Text>
              <Form.Control
                placeholder="User's full name"
                aria-label="UserFullName"
                aria-describedby="basic-addon1"
                value={`${userInfo.first_name} ${userInfo.last_name}`}
                disabled
              />
            </InputGroup>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="fw-bold text-primary w-40">
                      <AiOutlineInfoCircle className="mr-2" />
                      First name
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="User's First name"
                      aria-label="UserFirstName"
                      aria-describedby="basic-addon1"
                      value={`${userInfo.first_name}`}
                      disabled
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text className="fw-bold text-primary w-40">
                      <AiOutlineInfoCircle className="mr-2" />
                      Last name
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="User's Last name"
                      aria-label="UserLastName"
                      aria-describedby="basic-addon1"
                      value={`${userInfo.last_name}`}
                      disabled
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Form.Group>
            <InputGroup className="mb-3">
              <InputGroup.Text className="fw-bold text-primary w-40">
                {" "}
                <AiOutlineMail className="mr-2" />
                Email
              </InputGroup.Text>
              <Form.Control
                placeholder="User's full name"
                aria-label="UserFullName"
                aria-describedby="basic-addon1"
                value={`${userInfo.email}`}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="fw-bold text-primary w-40">
                <LiaAddressCard className="mr-2" />
                Address
              </InputGroup.Text>
              <Form.Control
                placeholder="User's Address"
                aria-label="UserFullName"
                aria-describedby="basic-addon1"
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text className="fw-bold text-primary w-40">
                <AiOutlinePhone className="mr-2" />
                Phone
              </InputGroup.Text>
              <Form.Control
                placeholder="User's Phone Number"
                aria-label="UserFullName"
                aria-describedby="basic-addon1"
                disabled
              />
            </InputGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileCard;
