import React from 'react';

class UserProfileCard extends React.Component {
    
    // id, firstName, lastName, accountDate, administrator
    render() {
        const { id, firstName, lastName, accountDate, administrator } = this.props.users;

        return(
            <div className="UserProfileCard">

            </div>
        );
    }
}

export default UserProfileCard;

// render() {
//     const {
//       productId,
//       title,
//       price,
//       imageUrl,
//       description,
//     } = this.props.product;

//     const productPrice = Number(price).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

//     return (
//         <div className="ProductCard m-2">
//           <Card style={{ width: '18rem' }} id={productId} className="h-100" border="primary">
//             <Card.Img variant="top" src={imageUrl} />
//             <Card.Title>{title}</Card.Title>
//             <Card.Body>
//               {description}
//             </Card.Body>
//             <Card.Footer className="mb-0">
//               <Card.Text>
//                 {productPrice}
//               </Card.Text>
//               <Button variant="primary">Buy Now</Button> { /* will be link to single product view */ }
//             </Card.Footer>
//           </Card>
//         </div>
//     );
//   }