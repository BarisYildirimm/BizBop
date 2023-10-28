import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.3)" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>
              Copyright &copy; {currentYear} Baris Yildirim. All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
