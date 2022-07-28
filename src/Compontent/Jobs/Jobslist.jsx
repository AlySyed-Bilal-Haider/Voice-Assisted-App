import React,{useState} from "react";
import Addjobs from "./Addjobs";
import useGet from '../API/API';
import { useSelector } from "react-redux";
import { POST } from "../API/PostAPI";
import {
  Container,
  Box,
  Stack,
  Pagination
} from "@mui/material";

function Jobslisting() {
 
  const url="http://localhost/HRMS/Job/Jobs.php";
  const type="job";
  var i=0;
  const jobinfo = useSelector(state => state.Jobreducer);
  console.log("jobinfo", jobinfo);
  useGet(url,type);
  var i=0;
  // ......paginations.........
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangepage = (event, value) => {
    setCurrentPage(value);
  };
  const pageCount = Math.ceil(jobinfo.length / postsPerPage);

  // ................Delete Job........................
  const removeURL="http://localhost/HRMS/Job/Removejob.php";
  const [add,setAddState]=React.useState();
  const Deletejob=(id)=>{
    const values = {
      id,
    };
    setAddState(values)
  }
  return (
    <>
      <>
        {/* Main Wrapper */}
        <div className="main-wrapper">
          {/* Page Wrapper */}
          <div className="page-wrapper">
            {/* Page Content */}
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Jobs</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.php">Dashboard</a>
                      </li>
                      <li className="breadcrumb-item active">Jobs</li>
                    </ul>
                  </div>
                  <div className="col-auto float-right ml-auto">
                    <a
                      href="#"
                      className="btn add-btn"
                      data-toggle="modal"
                      data-target="#add_jobs"
                    >
                      <i className="fa fa-plus" /> Add Jobs
                    </a>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <table className="table table-striped custom-table mb-0 datatable">
                      <thead>
                        <tr>
                          <th style={{ width: 30 }}>#</th>
                          <th>Jobs title</th>
                          <th>Jobs description</th>
                          <th>Category</th>
                          <th>no_positions</th>
                          <th>locations</th>
                          <th>close</th>
                          <th>Logo</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {jobinfo.length > 0 && jobinfo.slice(
                            currentPage * postsPerPage - postsPerPage,
                            currentPage * postsPerPage
                          ).map((Items)=>{
                            i++;
                            const {category,title,description,job_city,job_id,last_date,logo,status,no_of_positons}=Items;
                            return <>
                             <tr style={{ color: "black" }}>
                          <td>{i}</td>
                          <td>{title}</td>
                          <td>{description}</td>
                          <td>{category}</td>
                          <td>{no_of_positons}</td>
                          <td>{job_city}</td>
                          <td>{last_date}</td>
                          <td><img style={{width:'20px',height:'20px'}} src={`http://localhost/HRMS/Uploads/${logo}`} alt=""/>
                          </td>
                          <td>{ status==0 ? "InActive":'Active'}</td>
                          <td className="text-right">
                            <div className="dropdown dropdown-action" style={{cursor:'pointer'}}>
                              <a
                                href="#"
                                className="action-icon dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="material-icons">more_vert</i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right">
                                <span
                                  className="dropdown-item"
                                  
                                  data-toggle="modal"
                                  data-target="#edit_department"
                                >
                                  <i className="fa fa-pencil m-r-5" /> Edit
                                </span>
                                <span
                                  className="dropdown-item"
                                  onClick={()=>{
                                    Deletejob(job_id)
                                  }}
                                 
                                >
                                  <i className="fa fa-trash-o m-r-5" /> Delete
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                            </>
                          })}
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            {jobinfo.length >0 && (
              <Box  m="15px">
              <Stack
                direction={"row"}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Pagination
                  count={pageCount}
                  page={currentPage}
                  onChange={handleChangepage}
                />
              </Stack>
            </Box>
            )}
            
            {/* /Page Content */}
            {/* Add Department Modal */}
            <Addjobs />
          
          </div>
          {/* /Page Wrapper */}
        </div>
        {add && <POST values={add} url={removeURL} Addstate={setAddState}/>}
      </>
    </>
  );
}

export default Jobslisting;
