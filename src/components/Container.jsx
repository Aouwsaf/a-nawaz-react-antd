import { Row, Col } from 'antd';

const Container = ({ children }) => (
  <Row justify="center">
    <Col xs={24} sm={20}>
      {children}
    </Col>
  </Row>
);

export default Container;
