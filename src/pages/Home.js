import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from'react-router-dom'

const Home = ({ authState }) => {
    const navigate = useNavigate()
    const [listOfProducts, setListOfProducts] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login")
        } else {
          axios.get("http://localhost:3001/products").then((response) => {
            setListOfProducts(response.data)
          })
        }
    }, [])

    return (
      <div className="App">
        <div className="app-body">
          {listOfProducts.map((value,key) => {
            return (
              <div className="post">
                <div className="title">{ value.title }</div>
                <div className="body" onClick={() => {navigate(`/products/${ value.id }`)}}>
                  <img src={process.env.PUBLIC_URL + './' + value.image}></img>
                </div>
                <div className="footer">SGD { value.price }</div>
              </div>)
          })}
        </div>
      </div>
    )
}

export default Home
