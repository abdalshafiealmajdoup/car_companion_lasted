import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addOrder } from "../store/slices/OrderRequestSlice";
import { useNavigate } from "react-router-dom";

import {
  fetchCarTypes,
  selectAllCarTypes,
} from "../store/slices/carTypesSlice";
import { fetchCities } from "../store/slices/citiesSlice";

import Swal from "sweetalert2";
import "../assets/css/LoginGestUser.css";

function ConfirmServiceRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carTypes = useSelector(selectAllCarTypes);
  const [searchTerm, setSearchTerm] = useState("");
  const { serviceName } = useParams<RouteParams>();
  const [serviceInfo, setServiceInfo] = useState({ name: "", price: 0 });
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedAreaMapUrl, setSelectedAreaMapUrl] = useState("");
  const [selectedCar, setSelectedCar] = useState("");


  const customerID = useSelector(
    (state) => localStorage.getItem("customerID")
  );
  const cities = useSelector((state) => state.cities.cities);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");

  const [selectedArea, setSelectedArea] = useState("");
  const [areas, setAreas] = useState([]);

  const [customerData, setCustomerData] = useState({
    email: localStorage.getItem("customerEmail") || "",
    phoneNumber: localStorage.getItem("customerPhone") || "",
  });

  const [order, setOrder] = useState<Order>({
    CustomerID: customerID || 0,
    CenterID:"1",
    ServiceID:"",
    StatusOrder: "waiting",
    CarType: "",
    PhoneNumber: "",
    GooglePlaceID: "",
    Email: "",
    CustomerNotes: "",
    City: "",
    CityName:"",
    Region: "",
  });

  interface RouteParams {
    serviceName: string;
  }

  useEffect(() => {
    dispatch(fetchCarTypes());
  }, [dispatch]);

  useEffect(() => {
    if (customerID) {
      setOrder((prevOrder) => ({ ...prevOrder, CustomerID: customerID }));
    }
  }, [customerID]);

  useEffect(() => {
    const readableServiceName = serviceName.replace(/-/g, " ");
    setSelectedService(readableServiceName);
  }, [serviceName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(addOrder(order)).unwrap();
      Swal.fire('تم الطلب بنجاح!', 'تم  إرسال طلب الخدمة بنجاح.', 'success')
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/request-success"); 
          }
        });;
    } catch (error) {
      Swal.fire("خطأ", "حدث خطأ يرجى المحاولة مرة أخرى.", "error");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCarTypes = carTypes.filter((carType) =>
    carType.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleCarChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCarName = e.target.value;
    setSelectedCar(selectedCarName);
    console.log(selectedCar)

    order.orderCarType = selectedCarName;
    // setOrder({ ...order, CarType: selectedCarName });

    console.log('order',order)
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = parseInt(e.target.value);
    setSelectedCity(selectedCityId);
    const selectedCityData = cities.find((city) => city.id === selectedCityId);
    console.log("city data", selectedCityData.name)
    setSelectedCityName(selectedCityData.name)
    order.CityName = selectedCityData.name;
    setAreas(selectedCityData ? selectedCityData.areas : []);
    setSelectedArea("");
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAreaId = parseInt(e.target.value);
    setSelectedArea(selectedAreaId);
    const selectedAreaData = areas.find((area) => area.id === selectedAreaId);
    order.areaName = selectedAreaData.name;
    setSelectedAreaMapUrl(selectedAreaData ? selectedAreaData.addresIdMap : "");
  };

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    const serviceTranslations: { [key: string]: string } = {
      "car-maintenance": "صيانة السيارة",
      "towing-transport": "سحب ونقل السيارات",
      "fuel-filling": "تعبئة الوقود",
      "battery-charging": "شحن البطارية",
      "lock-picking": "فتح الأقفال",
    };

    const servicePrices: { [key: string]: number } = {
      "car-maintenance": 50,
      "towing-transport": 35,
      "fuel-filling": 10,
      "battery-charging": 15,
      "lock-picking": 20,
    };

    setServiceInfo({
      name: serviceTranslations[serviceName],
      price: servicePrices[serviceName],
    });
  }, [serviceName]);

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      ServiceID: selectedServiceId,
    }));
  }, [selectedServiceId]);

  const services = [
    { id: "1", name: "الصيانة المتنقلة" },
    { id: "2", name: "السحب والنقل" },
    { id: "3", name: "تعبئة الوقود" },
    { id: "4", name: "شحن البطارية" },
    { id: "5", name: "فتح الأقفال" },
  ];


  const handleServiceChange = (e) => {
    setSelectedServiceId(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('tokenCustomer');
    if (!token) {
      navigate('/choose-logins'); 
      window.location.reload()
    }
  }, [navigate]);
  return (
    <section id="hero-tow" className="d-flex align-items-center">
      <div
        className="container position-relative"
        
        
      >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h3>تأكيد طلب الخدمة </h3>
          </div>
        </div>
        <div className="register-style">
          <div className=" register-form">
            <div className="">
              <form
                className="row g-3 needs-validation flex justify-content-center align-items-center"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <input
                    type="tel"
                    name="PhoneNumber"
                    className="form-control"
                    id="PhoneNumber"
                    value={order.PhoneNumber=customerData.phoneNumber}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        phoneNumber: e.target.value,
                      })
                    }
                    required
                    placeholder="رقم الهاتف"
                  />
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    name="Email"
                    className="form-control"
                    id="Email"
                    value={order.Email=customerData.email}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        email: e.target.value,
                      })
                    }
                    required
                    placeholder="البريد الإلكتروني"
                  />
                </div>
                <div className="col-12">
                <select
        className="form-select"
        aria-label="Default select example"
        value={selectedServiceId}
        onChange={handleServiceChange}
      >
        <option>اختر خدمة</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>
                </div>
                <div className="col-12">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleCarChange}

                  >
                    <option selected>اختر نوع السيارة</option>
                    {filteredCarTypes.map((carType) => (
                      <option key={carType.id} value={order.CarType=carType.name} >
                        {carType.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <select
                    className="form-select"
                    value={order.City=selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">اختر مدينة</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="col-12">
                    <select
                      className="form-select mt-3"
                      value={order.Region=selectedArea}
                      onChange={handleAreaChange}
                    >
                      <option value="">اختر منطقة</option>
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name}
                        </option>
                      ))}
                    </select>
                  </div>
               



                  <div className="col-12">
                    {selectedArea && (
                      <input
                        type="hidden"
                        className="form-control mt-3"
                        value={order.GooglePlaceID=selectedAreaMapUrl}
                        readOnly
                      />
                    )}
                  </div>


              



                </div>
                <div className="col-12 mb-3">
                  <textarea
                    name="CustomerNotes"
                    className="form-control"
                    id="CustomerNotes"
                    value={order.CustomerNotes}
                    onChange={handleInputChange}
                    placeholder="يرجى تحديد أقرب نقطة دالة.."
                  ></textarea>
                </div>
                <div className="col-12 m-2 p-0">
                  <h4 className="alert alert-info alert-dismissible fade show text-center">
                    تكلفة خدمة {serviceInfo.name} ={" "}
                    <strong>{serviceInfo.price} دينار</strong>
                  </h4>
                </div>
                <div className="col-6">
                  <button className="btn btn-primary w-100 p-3" type="submit">
                    تأكيد طلب الخدمة
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConfirmServiceRequest;
