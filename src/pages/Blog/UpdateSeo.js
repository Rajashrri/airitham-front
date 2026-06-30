import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Container,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { getSeoById, updateSeo } from "../../api/blogApi";
import RichTextEditor from "../../components/editor/RichTextEditor";

const UpdateSeo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [seo, setSeo] = useState({
    url: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    schema: "",
  });

  useEffect(() => {
    fetchSeo();
  }, [id]);

  const fetchSeo = async () => {
    try {
      const res = await getSeoById(id);

      if (res.success) {
        setSeo({
          url: res.msg.url || "",
          meta_title: res.msg.meta_title || "",
          meta_description: res.msg.meta_description || "",
          meta_keywords: res.msg.meta_keywords || "",
          schema: res.msg.schema || "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load SEO");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setSeo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!seo.url) newErrors.url = "URL is required";
  if (!seo.meta_title) newErrors.meta_title = "Meta Title is required";
  if (!seo.meta_description)
    newErrors.meta_description = "Meta Description is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const adminid = localStorage.getItem("adminid");

    const payload = {
      url: seo.url,
      meta_title: seo.meta_title,
      meta_description: seo.meta_description,
      meta_keywords: seo.meta_keywords,
      schema: seo.schema,
      updatedBy: adminid,
    };

    const res = await updateSeo(id, payload);

    if (!res.success) {
      toast.error(res.msg);
      return;
    }

    toast.success("SEO Updated Successfully");
    navigate("/blog-list");
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong");
  }
};

    return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Update SEO"
          breadcrumbItems={["SEO", "Update"]}
        />

        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form
                  className="needs-validation"
                  onSubmit={handleSubmit}
                >
                  <Row>
                    {/* URL */}
                    <Col md="6">
                      <Label className="form-label">
                        URL
                      </Label>

                      <Input
                        type="text"
                        name="url"
                        value={seo.url}
                        onChange={handleInput}
                        placeholder="blog-url"
                      />

                      {errors.url && (
                        <span className="text-danger">
                          {errors.url}
                        </span>
                      )}
                    </Col>

                    {/* Meta Title */}
                    <Col md="6">
                      <Label className="form-label">
                        Meta Title
                      </Label>

                      <Input
                        type="text"
                        name="meta_title"
                        value={seo.meta_title}
                        onChange={handleInput}
                        placeholder="Meta Title"
                      />

                      {errors.meta_title && (
                        <span className="text-danger">
                          {errors.meta_title}
                        </span>
                      )}
                    </Col>

                    {/* Meta Description */}
                    <Col md="12" className="mt-3">
                      <Label className="form-label">
                        Meta Description
                      </Label>

                      <Input
                        type="textarea"
                        rows="4"
                        name="meta_description"
                        value={seo.meta_description}
                        onChange={handleInput}
                        placeholder="Meta Description"
                      />

                      {errors.meta_description && (
                        <span className="text-danger">
                          {errors.meta_description}
                        </span>
                      )}
                    </Col>

                    {/* Meta Keywords */}
                    <Col md="12" className="mt-3">
                      <Label className="form-label">
                        Meta Keywords
                      </Label>

                      <Input
                        type="textarea"
                        rows="3"
                        name="meta_keywords"
                        value={seo.meta_keywords}
                        onChange={handleInput}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </Col>

                    {/* Schema */}
                    <Col md="12" className="mt-3">
                      <Label className="form-label">
                        Schema (JSON-LD)
                      </Label>

                      <RichTextEditor
                        value={seo.schema}
                        onChange={(value) =>
                          setSeo((prev) => ({
                            ...prev,
                            schema: value,
                          }))
                        }
                        height={350}
                      />
                    </Col>
                  </Row>

                  <Button
                    color="primary"
                    type="submit"
                    className="mt-4"
                  >
                    Update SEO
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

export default UpdateSeo;
