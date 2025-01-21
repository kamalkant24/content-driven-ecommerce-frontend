import RouteFile from "../routes/RouteFile"
import Footer from "./Footer"
import Header from "./Header"

const Constant = () => {
  return (
    <div>
        <Header/>
        <section className="container ">
            <RouteFile/>
        </section>
        <footer>
            <Footer/>
 
        </footer>

      
    </div>
  )
}

export default Constant
