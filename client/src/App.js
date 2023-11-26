import React, { useEffect, useState } from "react";
import SupplyChainContract from "./contracts/SupplyChain.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RoleDataContextProvider } from "./context/RoleDataContext";
import { createBrowserHistory } from "history";
import getWeb3 from "./getWeb3";

import Manufacture from "./pages/Manufacturer/Manufacture";
import AllManufacture from "./pages/Manufacturer/AllManufacture";
import ShipManufacture from "./pages/Manufacturer/ShipManufacture";

import "./App.css";
import ReceiveThirdParty from "./pages/ThirdParty/ReceiveThirdParty";
import PurchaseCustomer from "./pages/Customer/PurchaseCustomer";
import ShipThirdParty from "./pages/ThirdParty/ShipThirdParty";
import ReceiveDeliveryHub from "./pages/DeliveryHub/ReceiveDeliveryHub";
import ShipDeliveryHub from "./pages/DeliveryHub/ShipDeliveryHub";
import ReceiveCustomer from "./pages/Customer/ReceiveCustomer";
import ReceivedByCustomer from "./pages/Customer/ReceivedByCustomer";
import PurchaseThirdParty from "./pages/ThirdParty/PurshaseThirdParty";

import RoleAdmin from "./pages/RoleAdmin";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/Theme";

import Explorer from "./pages/Explorer";
import Home from "./pages/Home";

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [mRole, setMRole] = useState(null);
  const [tpRole, setTpRole] = useState(null);
  const [dhRole, setDhRole] = useState(null);
  const [cRole, setCRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SupplyChainContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SupplyChainContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        // Get initial accounts
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        var mRole = accounts[0];
        const tpRole = localStorage.getItem("tpRole");
        console.log("Mrole:", mRole);
        console.log("tp", tpRole);
        const dhRole = localStorage.getItem("dhRole");
        const cRole = localStorage.getItem("cRole");

        // Listen for changes in accounts
        window.ethereum.on("accountsChanged", (newAccounts) => {
          console.log(newAccounts);
          setLoading(true);
         mRole = newAccounts;

          setAccounts(newAccounts);
          setMRole(mRole);
        setTpRole(tpRole);
        setDhRole(dhRole);
        setCRole(cRole);

          setLoading(false);
        });

        

        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);
        setMRole(mRole);
        setTpRole(tpRole);
        setDhRole(dhRole);
        setCRole(cRole);
        setLoading(false); // Set loading to false when data is available
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    };

    initialize();
  }, []); // This should only run once when the component is mounted

  if (loading) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RoleDataContextProvider
          accounts={accounts[0]}
          mRole={mRole}
          tpRole={tpRole}
          dhRole={dhRole}
          cRole={cRole}
        >
          <Router history={createBrowserHistory()}>
            <Switch>
              <Route exact path="/roleAdmin">
                <RoleAdmin
                  accounts={accounts}
                  supplyChainContract={contract}
                />
              </Route>
              <Route exact path="/explorer">
                <Explorer
                  accounts={accounts}
                  supplyChainContract={contract}
                  web3={web3}
                />
              </Route>
              <Route exact path="/">
                <Home
                  accounts={accounts}
                  supplyChainContract={contract}
                />
              </Route>

              <Route exact path="/manufacturer/manufacture">
                {mRole !== "" ? (
                  <Manufacture
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/manufacturer/allManufacture">
                {mRole !== "" ? (
                  <AllManufacture
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/manufacturer/ship">
                {mRole !== "" ? (
                  <ShipManufacture
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Manufacturer Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/ThirdParty/allProducts">
                {tpRole !== "" ? (
                  <PurchaseThirdParty
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Dealer Role at RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/ThirdParty/receive">
                {tpRole !== "" ? (
                  <ReceiveThirdParty
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Dealer Role at RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/Customer/buy">
                {cRole !== "" ? (
                  <PurchaseCustomer
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Customer Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/ThirdParty/ship">
                {tpRole !== "" ? (
                  <ShipThirdParty
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Dealer Role at RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/DeliveryHub/receive">
                {dhRole !== "" ? (
                  <ReceiveDeliveryHub
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Delivery Hub Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/DeliveryHub/ship">
                {dhRole !== "" ? (
                  <ShipDeliveryHub
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Delivery Hub Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/Customer/receive">
                {cRole !== "" ? (
                  <ReceiveCustomer
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Customer Role at /RoleAdmin</h1>
                )}
              </Route>
              <Route exact path="/Customer/allReceived">
                {cRole !== "" ? (
                  <ReceivedByCustomer
                    accounts={accounts}
                    supplyChainContract={contract}
                  />
                ) : (
                  <h1>Assign Customer Role at /RoleAdmin</h1>
                )}
              </Route>
            </Switch>
          </Router>
        </RoleDataContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

/*
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const ethereumProvider = window.ethereum;

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Function to get the current Ethereum account
    const getEthereumAccount = async () => {
      if (ethereumProvider) {
        try {
          const web3 = new Web3(ethereumProvider);
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount(null);
          }
        } catch (error) {
          console.error('Error fetching Ethereum account:', error);
          setAccount(null);
        }
      } else {
        setAccount(null);
      }
    };

    // Initial account fetch
    getEthereumAccount();

    // Subscribe to account changes
    if (ethereumProvider) {
      ethereumProvider.on('accountsChanged', getEthereumAccount);
    }

    // Cleanup event listener when component unmounts
    return () => {
      if (ethereumProvider) {
        ethereumProvider.removeListener('accountsChanged', getEthereumAccount);
      }
    };
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>My Ethereum App</h1>
        <p>Current Account: {account || 'Not connected'}</p>
      </nav>
      
    </div>
  );
}

export default App;

*/
