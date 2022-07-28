import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Showusers,Getcategory,fetchvister,fetchJob,Fetchdepartment,Fetchdesignation,
    fetchHolidays,Userapplications,FetchEmployee,FetchEmployeeleave,project,
    Clientinfo} from '../Redux/Actions/Actions';

import axios from "axios";
const useGet = (url,type) => {
  const usedispatch=useDispatch();
    const fetchdata = async () => {
        await axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                const value = response.data;
                if(type=="user")
                {
                    usedispatch(Showusers(value));
                }
                else if(type=="category")
                {
                    usedispatch(Getcategory(value));
                }else if(type=="vister")
                {
                    usedispatch(fetchvister(value))
                } else if(type=='job')
                {
                    usedispatch(fetchJob(value))
                }
                else if(type=='department')
                {
                    usedispatch(Fetchdepartment(value))
                }
                else if(type=='Designation')
                {
                    usedispatch(Fetchdesignation(value))
                } 
                else if(type=='Holiday'){
                    usedispatch(fetchHolidays(value))
                }
                 else if(type=="Applications")
                 {
                    usedispatch(Userapplications(value));
                 }
                 else if(type=="Employee"){
                    usedispatch(FetchEmployee(value));
                 } else if(type=="FetchEmployeeleave")
                 {
                    usedispatch(FetchEmployeeleave(value));
                 }
                 else if(type=='Client')
                 {
                    usedispatch(Clientinfo(value))
                 }
                 else if(type=='Project')
                 {
                    usedispatch(project(value));
                 }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchdata();
    }, []);
}
export default useGet;






