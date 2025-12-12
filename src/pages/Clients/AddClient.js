import React, { useState } from "react";
import {
  Row, Col, Card, CardBody, Button, Label, Input, Container
} from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import { addClient } from "../../api/clientApi";

const AddClient = () => {
  const [client, setClient] = useState({
    name: "",
     image: null,
  
  });

  const [errors, setErrors] = useState({});

  const breadcrumbItems = [
    { title: "Dashboard", link: "#" },
    { title: "Add Client", link: "#" },
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setClient((prev) => ({
      ...prev,
      [name]: files[0], // store single file object
    }));
  };


 // ✅ Submit handler
 const handleAddSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  // Validation
  if (!client.name) newErrors.name = "Name is required";
  if (!client.image) newErrors.image = "Image is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const adminid = localStorage.getItem("adminid");

    const formData = new FormData();
    formData.append("name", client.name);
    formData.append("createdBy", adminid);
    if (client.image) formData.append("image", client.image);

    // ✅ Use API helper instead of raw fetch
    const res_data = await addClient(formData);
    console.log("API Response:", res_data);

    if (res_data.success === false || res_data.msg === "Client already exist") {
      toast.error(res_data.msg || "Failed to add client");
      return;
    }

    toast.success("Client added successfully!");
    setErrors({});
    setClient({ name: "", image: null });
  } catch (error) {
    console.error("Add Client Error:", error);
    toast.error("Something went wrong!");
  }
};



  

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="ADD CLIENT" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form onSubmit={handleAddSubmit}>
                  <Row>
                    <Col md="6">
                      <Label> Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={client.name}
                        onChange={handleInput}
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </Col>
                   
                   {/* Main Image */}
                                         <Col md="6">
                                           <div className="mb-3">
                                             <Label className="form-label"> Image</Label>
                                             <Input
                                               type="file"
                                               name="image"
                                               accept="image/*"
                                               onChange={handleFileChange}
                                             />
                                             {errors.image && (
                                               <span className="text-danger">
                                                 {errors.image}
                                               </span>
                                             )}
                                             {client.image && (
                                               <small className="text-success">
                                                 {client.image.name}
                                               </small>
                                             )}
                                           </div>
                                         </Col>
                 
                  </Row>
                  <Button color="primary" type="submit" className="mt-3">Add</Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddClient;
