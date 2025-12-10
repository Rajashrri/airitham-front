import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  Container,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";

const UpdateClient = () => {
  const [client, setClient] = useState({
    name: "",
    image: null,
    old_image: "",
  });
const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const breadcrumbItems = [
    { title: "Dashboard", link: "#" },
    { title: "Update Client", link: "#" },
  ];

  // Fetch client data
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/client/getclientByid/${id}`
        );
        const res_data = await response.json();

        if (response.ok) {
          const data = res_data.msg;
          setClient({
            name: data.name || "",
           old_image: data.image || "",
          });
        } else {
          toast.error("Client not found");
        }
      } catch (error) {
        console.error("Fetch client error:", error);
      }
    };

    fetchClient();
  }, [id]);

  // Input handler
  const handleInput = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  // Handle file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setClient((prev) => ({ ...prev, [name]: files[0] }));
  };


  // ✅ Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

     if (!client.name) newErrors.name = "Name is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const adminid = localStorage.getItem("adminid");
      const formData = new FormData();

      formData.append("name", client.name);

      if (client.image) formData.append("image", client.image);
     
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/client/updateclient/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const res_data = await response.json();
      if (response.ok) {
        toast.success("Client updated successfully!");
        navigate("/client-list");
      } else {
        toast.error(res_data.msg || "Failed to update client");
      }
    } catch (error) {
      console.error("Update client Error:", error);
      toast.error("Something went wrong!");
    }
  };


 

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="UPDATE CLIENT" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form
                  className="needs-validation"
                  onSubmit={handleUpdateSubmit}
                >
                  <Row>
                    <Col md="6">
                      <Label> Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={client.name} // ✅ correct usage
                        onChange={handleInput}
                      />
                      {errors.name && (
                        <span className="text-danger">
                          {errors.name}
                        </span>
                      )}
                    </Col>
                     {/* Main Image */}
                    <Col md="6">
                      <Label className="form-label">Image</Label>
                      <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {client.old_image && (
                        <div className="mt-2">
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/client/${client.old_image}`}
                            alt="Main"
                            width="100"
                            className="rounded border"
                          />
                        </div>
                      )}
                    </Col>
                   
                  </Row>

                  <Button color="primary" type="submit" className="mt-3">
                    Update
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateClient;
