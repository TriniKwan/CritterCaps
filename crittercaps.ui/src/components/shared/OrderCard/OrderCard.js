import React from 'react';
import './OrderCard.scss';
import Card from 'react-bootstrap/Card';

class OrderCard extends React.Component {
  render() {
    const {
      customerName,
      invoiceDate,
      total,
      orderId,
    } = this.props.order;
    const price = Number(total).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const date = new Date(invoiceDate);
    const formattedDate = Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);

    return (
      <Card style={{ width: '18rem' }} id={orderId} className="h-100 d-flex justify-content-center orderCard" border="primary" >
        <Card.Title>Customer Name: { customerName }</Card.Title>
        <Card.Text>Date of Purchase: { formattedDate }</Card.Text>
        <Card.Text>Total: { price }</Card.Text>
      </Card>
    );
  }
}

export default OrderCard;
