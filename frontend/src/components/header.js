import React from 'react'
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap'
const header =()=>
{
	return (<div>
<Navbar style ={{top: 0}}sticky="top"  bg="dark" variant="dark">
    <Navbar.Brand href="home">Medium</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="signin">sign in</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar></div>
		)
}
export default header