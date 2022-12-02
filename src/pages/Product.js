import axios from "axios"
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from'react-router-dom'

const Product = () => {
    let { id } = useParams()
    const navigate = useNavigate()
    
    const [productObject, setProductObject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/products/${id}`).then((response) => {
          setProductObject(response.data)
        })
      }, [])

    const deleteProduct = (id) => {
        axios
        .delete(`http://localhost:3001/products/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
            navigate('/')
        })
    }

  return (
    <div className="App">
    <div className="app-body">
        <div className="post">
            <div className="title">{ productObject.title }</div>
            <div className="body">{ productObject.description }</div>
            <div className="footer">
                <div>SGD { productObject.price }</div>
                <div>
                    <button className="buttonEdit">Edit</button>
                    <button className="button" onClick={() => {deleteProduct(productObject.id)}}>Delete</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Product
