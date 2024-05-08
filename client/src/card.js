import { Card, Col, Row, Badge, Button } from "react-bootstrap";

function BasicExample() {
  const products = [
    {
      id: 1,
      name: "Haldiram's ",
      price: 5.99,
      category: "Snack & Munchies",
      badge: "Sale",
    },
    {
      id: 2,
      name: "product 2",
      price: 5.99,
      category: "Cat 2",
      badge: "14%",
    },

    {
      id: 3,
      name: "product 3",
      price: 2.99,
      category: "Cat 3",
      badge: "Hot",
    },
  ];
  return (
    <Row sm={2} md={3} lg={4} xl={5} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          <Card>
            <Card.Body>
              <Badge className="position-absolute " bg={/\d/.test(product.badge) ? "success" : "danger"}>
                {product.badge}
              </Badge>
              <Card.Img variant="top" src="https://freshcart.codescandy.com/assets/images/products/product-img-1.jpg" />
              <Card.Subtitle className="mb-2 text-muted">{product.category}</Card.Subtitle>
              <Card.Title>{product.name} </Card.Title>

              <Row className="align-items-center">
                <Col>
                  <Card.Text>${product.price} </Card.Text>
                </Col>

                <Col className="text-end">
                  <Button variant="success">+ Add</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default BasicExample;
