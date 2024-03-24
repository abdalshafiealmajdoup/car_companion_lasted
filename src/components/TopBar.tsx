function TopBar() {
    return (
      <div className="d-flex flex-row-reverse w-100">
        <div className="pt-2 pe-2 ms-auto">
          <nav className="p-3 border border-2 rounded-3 d-flex justify-content-between align-items-center">
            <ul className="list-unstyled d-flex align-items-center mb-0">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2596be" width="24" height="24" className="me-3">
                  {/* SVG content */}
                </svg>
              </li>
            </ul>
            <ul className="list-unstyled d-flex align-items-center mb-0">
              <li className="pe-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2596be" width="24" height="24">
                  {/* SVG content */}
                </svg>
              </li>
              <li className="pe-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2596be" width="24" height="24">
                  {/* SVG content */}
                </svg>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
  
  export default TopBar;
  