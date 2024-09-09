import Navbar from "../Navbar";
import Footer from "../Footer";
import { useEffect } from "react";
import { addDeliveryTrue } from "../../Api/Delivery";
import { useParams } from "react-router-dom";

const DeliveryTrue = () => {
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      const data = {
        id: params.id,
        paymentStatus: "Confirmado",
        idUser: params.id,
        transaction: localStorage.getItem("transaction"),
      };
      addDeliveryTrue(data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <Navbar />
      <h1>Se ha confirmado el pago</h1>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <Footer />
    </>
  );
};

export default DeliveryTrue;
