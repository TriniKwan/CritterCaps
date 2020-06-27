import React from 'react';
import Card from 'react-bootstrap/Card';

class OrderCard extends React.Component {
  render() {
    const { customerName, invoiceDate, total } = this.props.order;

    return (
      <Card style={{ width: '18rem' }} className="h-100 d-flex justify-content-center" border="primary" >
        <Card.Title>Customer Name: { customerName }</Card.Title>
        <Card.Text>Date of Purchase: { invoiceDate }</Card.Text>
        <Card.Text>Total: { total }</Card.Text>
      </Card>
    );
  }
}

export default OrderCard;
