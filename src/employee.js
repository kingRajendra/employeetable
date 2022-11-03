import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {useState, useRef} from 'react';
import { Button,Modal} from 'react-bootstrap';
 
function Employee() {
    
    const list  = [
        { 
            id : 1,
            name : "Goutham",
            department : "Java Script",
            city : "Delhi", 
            salary : "15000"
          }, 
    ]
   
    const [lists, setList] = useState(list);
    const [updateState, setUpdateState] = useState(-1);
   
  return (
 
       <div class="container" style={{background:"orange"}}>
          <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded"> 
          <div class="row ">
           <div class="col-sm-2 mt-5 mb-4 text-gred">
              <div className="search">
                <form class="form-inline">
                 <input class="form-control mr-sm-2" type="search" placeholder="Search Employee" aria-label="Search"/>
                </form>
              </div>    
              </div>  
              <div class="col-sm-4 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"orange"}}>
                <h2><b>Employee Details</b></h2>
                </div>
           </div> 
           <div>
            <AddList setList={setList}/>
            </div>
            <div class="row">
                <div class="table-responsive " >
                    <form onSubmit={handleSubmit}>
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Emp Name </th>
                            <th>Department</th>
                            <th>City</th>
                            <th>Salary</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody> 
                     
                        {
                          lists.map((current) => (
                            updateState === current.id ? <EditList current = {current} lists = {lists}  setList = {setList}/> :
                            <tr>
                            <td>{current.name}</td>
                            <td>{current.department}</td>
                            <td>{current.city}</td>
                            <td>{current.salary}</td>
                            <td>
                               <a href="#" class="view" title="View" data-toggle="tooltip" style={{color:"#10ab80"}}><i class="material-icons">&#xE417;</i></a>
                              <a onClick={() => handleEdit(current.id)} href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                <a onClick={() => handleDelete(current.id)} href="#" class="delete" title="Delete" data-toggle="tooltip" style={{color:"red"}}><i class="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>
                      ))
                        }
                      
                        
                    </tbody>
                </table>
                </form>
                
            </div>   
        </div>          
         
      </div>    
      </div>  
  );


function handleEdit(id) {
    setUpdateState(id)
}

function handleDelete(id) {
    const newlist = lists.filter((li) => li.id !== id)
    setList(newlist)
}

function handleSubmit(event) {
    event.preventDefault()
    event.preventDefault();
        const name = event.target.elements.name.value;
        const department = event.target.elements.department.value;
        const city = event.target.elements.city.value;
        const salary = event.target.elements.salary.value;
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, name:name, department:department, city:city, salary:salary, } : li
        ))

        setList(newlist)
        setUpdateState(-1)
}

}

function EditList({current, lists, setList}) {

    function handleInputname(event) {
        const name = event.target.name;
        const value = name.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name:value} : li
        ))

        setList(newlist)

    }

    function handleInputdept(event) {
        const department = event.target.name;
        const value = department.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, department:value} : li
        ))

        setList(newlist)

    }
    function handleInputcity(event) {
        const city = event.target.name;
        const value = city.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, city:value} : li
        ))

        setList(newlist)

    }

    function handleInputsalary(event) {
        const salary = event.target.name;
        const value = salary.value;
        const newlist = lists.map((li) => (
            li.id === current.id ? {...li, salary:value} : li
        ))

        setList(newlist)

    }

    return(
        <tr>
        <td><input type = "text" onChange={handleInputname}  name = "name" value = {current.name}/></td>
        <td><input type = "text" onChange={handleInputdept}  name = "department" value = {current.department}/></td>
        <td><input type = "text" onChange={handleInputcity}  name = "city" value = {current.city}/></td>
        <td><input type = "text" onChange={handleInputsalary}  name = "salary" value = {current.salary} /></td>
        <td>
        <button type = "submit" className="btn btn-success">Update</button>
       </td>
       </tr>
    )

}

function AddList({setList}) {

    const idRef = useRef()
    const nameRef = useRef()
    const deptRef = useRef()
    const cityRef = useRef()
    const salRef = useRef()
    
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const department = event.target.elements.department.value;
        const city = event.target.elements.city.value;
        const salary = event.target.elements.salary.value;

        const newlist =  {
            id : 2,
            name,
            department,
            city,
            salary
         }
         setList((prevList) => {
            return prevList.concat(newlist)
         })
         idRef.current.value = ""
         nameRef.current.value = ""
         deptRef.current.value = ""
         cityRef.current.value = ""
         salRef.current.value = ""
    }

    return(
        
    <div className="model_box col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
         <Button variant="success" onClick={handleShow}>
        Add New Employee
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee Details</Modal.Title>
        </Modal.Header>
            <Modal.Body>
            <form className="addForm" onSubmit={handleSubmit}>
                <div class="form-group mt-3">
                <input type="text" name = "name" class="form-control" aria-describedby="nameHelp" placeholder="Enter Name" ref={nameRef}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text"  name = "department" class="form-control" aria-describedby="deptHelp" placeholder="Enter Department"ref={deptRef}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text" name = "city" class="form-control" aria-describedby="cityHelp" placeholder="Enter City" ref={cityRef}/>
                </div>
                <div class="form-group mt-3">
                    <input type="text"  name = "salary" class="form-control"  aria-describedby="salHelp" placeholder="Enter Salary" ref={salRef}/>
                </div>
                  <button type="submit" class="btn btn-success mt-4">Add Employee</button>
                </form>
            </Modal.Body>
           <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>    

        </Modal.Footer>
      </Modal>
       </div> 
    )
}
 
export default Employee;