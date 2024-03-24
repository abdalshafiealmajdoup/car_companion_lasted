function SettingsMaintenance() {
    const MaintenanceCentersData = [
        {
            id: 1,
            name: "مركز صيانة السيارات المحترف",
            address: "طرابلس",
            owner: "محمد علي",
            phone: "218911111111",
          },
          {
            id: 2,
            name: "مركز صيانة السيارات الفني",
            address: "بنغازي",
            owner: "أحمد مصطفى",
            phone: "218922222222",
          },
          {
            id: 3,
            name: "مركز الخدمة للسيارات",
            address: "طرابلس",
            owner: "فاطمة حسين",
            phone: "218933333333",
          },
          {
            id: 4,
            name: "مركز إصلاح السيارات",
            address: "بنغازي",
            owner: "خالد عبدالله",
            phone: "218944444444",
          },
          {
            id: 5,
            name: "مركز الصيانة للسيارات الأمريكية",
            address: "سبها",
            owner: "ليلى أحمد",
            phone: "218955555555",
          },
          {
            id: 6,
            name: "مركز الخدمات الفنية للسيارات",
            address: "طرابلس",
            owner: "سارة حسن",
            phone: "218966666666",
          },
          {
            id: 7,
            name: "مركز الإصلاح المتخصص للسيارات",
            address: "بنغازي",
            owner: "علي محمود",
            phone: "218977777777",
          },
          {
            id: 8,
            name: "مركز الصيانة المتقدم للسيارات",
            address: "سبها",
            owner: "عبدالرحمن مصطفى",
            phone: "218988888888",
          },
          {
            id: 9,
            name: "مركز الخدمة السريعة للسيارات",
            address: "طرابلس",
            owner: "نور محمد",
            phone: "218999999999",
          },
          {
            id: 10,
            name: "مركز الإصلاح الفني للسيارات",
            address: "بنغازي",
            owner: "حسام علي",
            phone: "218988901234",
          },
      ];
  
    return (
        <div className="p-4 w-100">
          <div className="p-4 border border-2 rounded">
            <section className="bg-light p-3">
              <div>
                <div className="bg-white shadow-sm rounded overflow-hidden">
                  <div className="d-flex align-items-center p-3">
                    <div><h2 className="text-primary fw-bold"> الصفحة الرئيسية</h2></div>
                  </div>
  
                  <div className="table-responsive">
                    <table className="table text-right text-sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>إسم المركز</th>
                          <th>عنوان المركز</th>
                          <th>صاحب المركز</th>
                          <th>رقم الهاتف</th>
                          <th><span className="visually-hidden">Actions</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {MaintenanceCentersData.map((center, index) => (
                          <tr key={center.id} className="hover:bg-light">
                            <th scope="row">{index + 1}</th>
                            <td>{center.name}</td>
                            <td>{center.address}</td>
                            <td>{center.owner}</td>
                            <td>{center.phone}</td>
                            <td className="d-flex justify-content-end">
                              <button className="btn btn-primary me-1 m-1">عرض</button>
                              <button className="btn btn-warning me-1 m-1">تعديل</button>
                              <button className="btn btn-danger m-1">حذف</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
    );
  }
  
  export default SettingsMaintenance;
  