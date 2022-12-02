import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from'react-router-dom'
import { useEffect, useState } from "react"

const CreateProduct = ({ authState }) => {
    const navigate = useNavigate()
    const [image, setImage] = useState("")

    const initialValues = {
        title: "",
        description: "",
        price: 0
    }

    useEffect(() => {
      if (!localStorage.getItem("accessToken")) {
        navigate("/login")
      } else if (authState.username !== "admin") {
        navigate("/")
      }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required()
    })

    const onSubmit = (data) => {
        data = {...data, image: image}
        console.log(data.image.name)
        axios.post("http://localhost:3001/products", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
            navigate('/')
        })
    }

  return (
   <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
            <label>Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field 
                id="inputCreatePost" 
                name="title" 
                placeholder=""
            />
            <label>Description: </label>
            <ErrorMessage name="description" component="span" />
            <Field 
                id="inputCreatePost" 
                name="description" 
                placeholder=""
            />
            <label>Price (SGD): </label>
            <ErrorMessage name="price" component="span" />
            <Field 
                id="inputCreatePost" 
                name="price" 
                placeholder=""
            />
            
            <input type="file" onChange={(e) => {setImage(e.target.files[0])}} />
            <button type="submit">Create Product</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProduct
