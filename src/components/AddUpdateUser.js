import React from 'react'
import Modal from './Modal';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk, contactActions, contactSelector, updateContactThunk } from '../redux/contactReducer';


const contactSchemaValidation=Yup.object().shape({
    username:Yup.string().required("User Name is required"),
    email:Yup.string().email("Invalid Email").required("Email is required"),
    city:Yup.string().required("City is required"),
    street:Yup.string().required("Street is required"),
    suite:Yup.string().required("Suite is required"),
    zipcode:Yup.string().required("Zipcode is required"),
    phone:Yup.string().required("Phone is required"),
    company:Yup.string().required("Company is required"),
    name:Yup.string().required("Name is required"),
    // city:Yup.string().required("City is required"),
})

function AddUpdateUser() {
    const {isUpdate,contactInfo,contactsList,error}=useSelector(contactSelector);
const dispatch=useDispatch();

const addContact= async (contact)=>{
    try {
        console.log(contact);
    await dispatch(addContactThunk(contact));
     dispatch(contactActions.setShowAddForm());
     toast.success("Contact added successfully !")
    } catch (err) {
        // console.log(error);
        toast.error(error);
    }
}

const updateContact= async (contact)=>{
    try {
    //   console.log("update called");
        // console.log(contact);
await dispatch(updateContactThunk(contact));
dispatch(contactActions.setShowUpdateForm());
toast.success("Contact updated successfully !")
} catch (err) {
        // console.log(error);
        toast.error(error);
    }
}


    return (
       <div>
        <Modal>
            <Formik 
            validationSchema={contactSchemaValidation}
            initialValues={isUpdate?{
                username:contactInfo.username,
                name:contactInfo.name,
                email:contactInfo.email,
                street:contactInfo.address.street,
                city:contactInfo.address.city,
                suite:contactInfo.address.suite,
                zipcode:contactInfo.address.zipcode,
                phone:contactInfo.phone,
                company:contactInfo.company.name,
            }:{
                username:"",
                name:"",
                email:"",
                street:"",
                suite:"",
                phone:"",
                city:"",
                zipcode:"",
                company:""

            }}
            onSubmit={(values)=>{
                console.log("button clicked");
                console.log(values);
                const contactObj={
                    id:isUpdate?contactInfo.id:contactsList.length+1,
                    name:values.name,
                    username:values.username,
                    email:values.email,
                    address:{
                        street:values.street,
                        suite:values.suite,
                        city:values.city,
                        zipcode:values.zipcode
                    },
                    company:{
                        name:values.company
                    },
                    phone:values.phone
        
                }
                console.log(contactObj);
            {isUpdate?updateContact(contactObj):
                addContact(contactObj);}
            
            }}
            >
                <Form className='flex flex-col gap-4 '>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='username' className='font-bold uppercase'>Username</label>
                    <Field name="username" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="username"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='font-bold uppercase'> Name</label>
                    <Field name="name" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="name"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='font-bold uppercase'>Email</label>
                    <Field name="email" type="email" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="email"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='city' className='font-bold uppercase'>City</label>
                    <Field name="city" type="text" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="city"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='street' className='font-bold uppercase'>Street</label>
                    <Field name="street" type="text" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="street"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='suite' className='font-bold uppercase'>Suite</label>
                    <Field name="suite" type="text" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="suite"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='zipcode' className='font-bold uppercase'>ZipCode</label>
                    <Field name="zipcode" type="text" className="h-10 rounded-md border  text-green-900 font-bold "/>
                    
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="zipcode"/>
                    </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                    <label htmlFor='phone' className='font-bold uppercase'>Phone</label>
                    <Field name="phone" type="text" className="h-10 rounded-md border text-green-900 font-bold"/>
                    
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="phone"/>
                    </div>
                    </div>
                   <div className='flex flex-col gap-1'>
                    <label htmlFor='company' className='font-bold uppercase'>Company</label>
                    <Field name="company" type="text" className="h-10 rounded-md border  text-green-900 font-bold"/>
                    
                    <div className='text-red-500 text-xs'>
                        <ErrorMessage name="company"/>
                    </div>
                    </div>
                    <button className='self-end border bg-orange px-3 text-xl font-bold rounded' >{isUpdate?"Update":"Add"}</button>
                </Form>
            </Formik>
        </Modal>
       </div> 
    )
}

export default AddUpdateUser
