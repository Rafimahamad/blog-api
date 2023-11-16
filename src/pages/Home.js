import React from 'react';
import { Col,Container,Row } from 'reactstrap';
import Base from '../Components/Base';
import CategorySideMenu from '../Components/CategorySideMenu';
import NewFeed from '../Components/NewFeed';


function Home(){

   

return (
<div>
    <Base>
    <Container className='mt-2'>
  <Row>
    <Col md={3}>
    <CategorySideMenu />
    </Col>
    <Col md={9}>
    <NewFeed />
    </Col>
  </Row>
  </Container>
    </Base>
    
</div>
      
    );
}
export default Home;