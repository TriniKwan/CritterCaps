import React from 'react';
import Card from 'react-bootstrap/Card';

class OrderCard extends React.Component {
  render() {
    const { customerName, invoiceDate, total } = this.props.order;
    const price = Number(total).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
      <Card style={{ width: '18rem' }} className="h-100 d-flex justify-content-center" border="primary" >
        <Card.Title>Customer Name: { customerName }</Card.Title>
        <Card.Text>Date of Purchase: { invoiceDate }</Card.Text>
        <Card.Text>Total: { price }</Card.Text>
      </Card>
    );
  }
}

export default OrderCard;
