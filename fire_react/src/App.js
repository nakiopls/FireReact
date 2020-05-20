import React from 'react';
import './App.css';
import firebase from "./tools/firebase";

import {Button,Row,Container,Col,Form,Navbar,Table} from 'react-bootstrap';

function App() {

  const [task, setTasks] = React.useState([]);
  const [newTask, setnewTasks] = React.useState('');
  const [updateTask, setupdateTasks] = React.useState('');

  React.useEffect (() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      // Se busca un "document" como "task", creando una copia de este, si es qe cambia el contenido esta se actualiza
      db.collection("task").onSnapshot(function(data) {
        console.log(data)
        // ...doc.data() junta toda la data que viene con id: doc.id
        setTasks(data.docs.map( doc => ({ ...doc.data(), id: doc.id} )));
      });

    };
    fetchData();
  },[]);

const onCreate = () => {
  const db = firebase.firestore();
  db.collection("task").add({ name: newTask});
};

function onDelete (id) {
  const db = firebase.firestore();
  db.collection("task").doc(id).delete();
};


const onUpdate = (id) => {
  const db = firebase.firestore();
  db.collection("task").doc(id).set({ name: updateTask});
};

return(

    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          React and Firestore
        </Navbar.Brand>
      </Navbar>
      <br></br>

      <Container>
        <Row>
        <Col>
          <h2> Add new Task</h2>
          <Form>
            <Form.Group controlId="formBasicCheckbox">
            <Form.Control type="text" value={newTask} onChange={e => setnewTasks(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" onClick={onCreate}> Create Task </Button>
          </Form>
        </Col>  
        </Row>
        <br></br>
        <Row>
          <Col>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task Name</th>
                <th>Delete Task</th>
                <th>Update Task</th>
              </tr>
            </thead>
            <tbody>
              {task.map(spell => (
                <tr key={spell.id}>
                  <td>{spell.id}</td>
                  <td>{spell.name}</td>
                  <td><Button variant="danger" onClick={() => onDelete(spell.id)}> Delete Task </Button></td>
                  <td> 
                    <input type="text" className=" "  onChange={e => setupdateTasks(e.target.value)} placeholder={spell.name}></input> 
                    <Button className="text-white ml-4" variant="warning" onClick={() => onUpdate(spell.id)}> Update Task</Button>
                  </td>
                </tr>
              ))}  
            </tbody>
          </Table>
          </Col>
        </Row>        
      </Container>
    </div>
  );
}
export default App;
