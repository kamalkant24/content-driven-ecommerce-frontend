import RouteFile from "../routes/RouteFile"
import Footer from "./Footer"
import Header from "./header/Header"

const Constant = () => {
  return (
    <div>
        <Header/>
        <section className="container max-w-[100vw] mt-[7rem]">
            <RouteFile/>
        </section>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Constant
