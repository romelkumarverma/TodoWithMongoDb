import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
// import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import Form from 'react-bootstrap/Form';

function TodoList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////  Post  ////////////

  const [add, setAdd] = useState({
    TaskId: '',
    Task:''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4200/api/mongo/post', add)
      .then((result) => {
        console.log(result)
        alert("Posted successfully....")
      }).catch((err) => {
        console.log(err);
      })
  }

  const [showData, setShowData] = useState([])
  //const navigate = useNavigate();
  const handleDataShow = () => {
    axios.get('http://localhost:4200/api/mongo/get')
      .then((res) => {
        console.log(res)
        setShowData(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    handleDataShow();
  }, []);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const [iddata, setIdData] = useState()
  console.log(iddata)
  const handleShow1 = (TaskId) => {
    console.log(TaskId)
    setIdData(TaskId)
    setShow1(true);
  }

  const [editList, setEditList] = useState({
    Status:'',
    Completion_Date: ''
  });
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4200/api/mongo/update/${iddata}`, editList)
      .then((res) => {
        console.log(res)
        setEditList(res.data.rows)
        setShow1(false);
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (TaskId) =>{
    axios.delete(`http://localhost:4200/api/mongo/delete/${TaskId}`)
    .then((res)=>{
      console.log(res)
      alert('Data Delete SuccessFully...')
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (

    <>
      {/* Navbar */}

      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href='/' style={{ marginLeft: '50%', color: 'brown' }}>Todo List</a>
        </div>
      </nav>


      <Button variant="primary" onClick={handleShow} style={{ marginTop: '20px', marginLeft: '30px' }}>
        Add List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
              <form className='row g-1' onSubmit={handleSubmit}>

              <div className='col-12'>
                  <label htmlFor="id" className='form-label'>
                    <h5>Task Id</h5>
                  </label>
                  <input type='text' className='form-control rounded-0'
                    id='text'
                    placeholder='Enter Task'
                    onChange={(e) => setAdd({ ...add, TaskId: e.target.value })}
                  />
                </div>

                <div className='col-12'>
                  <label htmlFor="id" className='form-label'>
                    <h5>Task</h5>
                  </label>
                  <input type='text' className='form-control rounded-0'
                    id='text'
                    placeholder='Enter Task'
                    onChange={(e) => setAdd({ ...add, Task: e.target.value })}
                  />
                </div>
                <Button variant="primary" type='submit'>
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      <div className='px-5 mt-3'>


        <div className='mt-3'>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Task Id</th>
                <th>Task</th>
                <th>Assign Date</th>
                <th>Due Date</th>
                <th>Completion Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              {
                showData.map((item)=>
                <tr>
                   <td>{item.TaskId}</td>
                      <td>{item.Task}</td>
                      <td>{item.Assign_Date}</td>
                      <td>{item.Due_Date}</td>
                      <td>{item.Completion_Date}</td>
                      <td>{item.Status}</td>

                      <td>
                        <Button onClick={() => handleShow1(item.TaskId)} className='btn btn-info btn-sm me-2'>Edit</Button>
                      </td>
                      <td>
                        <Button onClick={() => handleDelete(item.TaskId)} className='btn btn-danger btn-sm me-2'>Delete</Button>
                      </td>
                </tr>
              )
              }

              {/* {
                showData.map((item) => {
                  return (
                  <>
                    <tr>
                      <td>{item.TaskId}</td>
                      <td>{item.Task}</td>
                      <td>{item.Assign_Date}</td>
                      <td>{item.Due_Date}</td>
                      <td>{item.completion_date}</td>
                      <td>{item.Status}</td>

                      <td>
                        <Button onClick={() => handleShow1(item.id)} className='btn btn-info btn-sm me-2'>Edit</Button>
                      </td>
                      <td>
                        <Button onClick={() => handleDelete(item.id)} className='btn btn-danger btn-sm me-2'>Delete</Button>
                      </td>

                    </tr>

                  </>
                  )
                })
              } */}
            </tbody>
          </Table>
        </div>

        {/* Edit */}

        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex justify-content-center align-items-center mt-3'>
              <div className='p-3 rounded w-100 border'>
                <form className='row g-1' onSubmit={handleSubmitEdit}>
                <div>
                    <label htmlFor="date" className='form-label'>
                    Task Id
                    </label>
                    <input type='text' className='form-control rounded-0'
                      id='id'
                    value={iddata}
                    // onChange={(e) => setEditList({ ...editList, id: e.target.value })}
                    />
                  </div>
                  <div className='col-12'>
                    <Form.Select onChange={(e)=>setEditList({...editList, Status:e.target.value})}>
                      <option>Select Status</option>
                      <option>Progress</option>
                      <option>Completed</option>
                    </Form.Select>
                  </div>

                  <div>
                    <label htmlFor="date" className='form-label'>
                      Comletion Date
                    </label>
                    <input type='date' className='form-control rounded-0'
                      id='date'

                    // value={iddata}
                    onChange={(e) => setEditList({ ...editList, Completion_Date:e.target.value })}
                    />
                  </div>

                  <div clasName='col-12'>
                    <button className='btn btn-primary w-100 rounded-0 mb-2'>Edit List</button>
                  </div>

                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>


    </>
  );
}

export default TodoList;