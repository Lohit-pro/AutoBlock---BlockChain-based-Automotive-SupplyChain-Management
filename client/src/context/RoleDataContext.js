import React, { createContext, useState } from 'react';

const RoleDataContext = createContext(null);

export const RoleDataContextProvider = ({ accounts, mRole, tpRole, dhRole, cRole, children }) => {
  const [accs, setAccs] = useState(accounts); // Changed accs to use useState directly, assuming acc is a single value
  console.log("context ", accs);

  const [roles, setRoles] = useState({
    manufacturer: mRole,
    thirdparty: tpRole,
    deliveryhub: dhRole,
    customer: cRole,
  });

  return (
    <RoleDataContext.Provider value={{ accs, roles, setRoles }}> 
      {children}
    </RoleDataContext.Provider>
  );
};

export const useRole = () => React.useContext(RoleDataContext);
