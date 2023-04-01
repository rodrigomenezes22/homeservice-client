import React from 'react'

function AdminService({setAuthServ, setProviderid}) {

    const logout = async e => {
        e.preventDefault();
        try {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("userId");
          setAuthServ(false);
          toast.success("Logout successfully");
        } catch (err) {
          console.error(err.message);
        }
      };

  return (
    <div>
      Admin Service Provider Page
      <button onClick={e => logout(e)} className="btn btn-primary color-danger rounded-pill">
              <div className="button-organizer">
              Logout
              <span class="material-symbols-rounded">
                logout
              </span>
              </div>
      </button>
    </div>
  )
}

export default AdminService
