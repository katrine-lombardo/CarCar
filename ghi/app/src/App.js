import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AutomobileForm from "./inventory/AutomobileForm";
import VehicleModelForm from "./inventory/VehicleModelForm";
import VehicleModelList from "./inventory/VehicleModelList";
import ManufacturerList from "./inventory/ManufacturerList";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="models/new/" element={<VehicleModelForm />} />
          <Route path="models/" element={<VehicleModelList />} />
          <Route path="manufacturers/" element={<ManufacturerList />} />
          <Route path="automobiles/new/" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
