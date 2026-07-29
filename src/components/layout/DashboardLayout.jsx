import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9 py-4">
            {children}
          </div>

        </div>
      </div>
    </>
  );
}