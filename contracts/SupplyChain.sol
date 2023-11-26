// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;


import "./Structure.sol";

contract SupplyChain {
    event ManufacturerAdded(address indexed _account);

    //product code
    uint256 public uid;
    uint256 sku;

    address owner;

    mapping(uint256 => Structure.Product) products;
    mapping(uint256 => Structure.ProductHistory) productHistory;
    mapping(address => Structure.Roles) roles;

///@dev hasManufacturerRole
    function hasManufacturerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        // represents the Ethereum address of "0x0000000000000000000000000000000000000000,
        return roles[_account].Manufacturer;
    }

    function addManufacturerRole(address _account) public {
        require(_account != address(0));
        require(!hasManufacturerRole(_account));

        roles[_account].Manufacturer = true;
    }


///@dev hasAutoDealerRole

    function hasAutoDealerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].AutoDealer;
    }

    function addAutoDealerRole(address _account) public {
        require(_account != address(0));
        require(!hasAutoDealerRole(_account));

        roles[_account].AutoDealer = true;
    }


///@dev hasLogisticsCompanyRole
    function hasLogisticsCompanyRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].LogisticsCompany;
    }

    function addLogisticsCompanyRole(address _account) public {
        require(_account != address(0));
        require(!hasLogisticsCompanyRole(_account));

        roles[_account].LogisticsCompany = true;
    }


///@dev hasCustomerRole
    function hasCustomerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Customer;
    }

    function addCustomerRole(address _account) public {
        require(_account != address(0));
        require(!hasLogisticsCompanyRole(_account));

        roles[_account].Customer = true;
    }

    constructor() public payable {
        owner = msg.sender;
        sku = 1;
        uid = 1;
    }

    event Manufactured(uint256 uid);
    event PurchasedByAutoDealer(uint256 uid);
    event ShippedByManufacturer(uint256 uid);
    event ReceivedByAutoDealer(uint256 uid);
    event PurchasedByCustomer(uint256 uid);
    event ShippedByAutoDealer(uint256 uid);
    event ReceivedByLogisticsCompany(uint256 uid);
    event ShippedByLogisticsCompany(uint256 uid);
    event ReceivedByCustomer(uint256 uid);

    modifier verifyAddress(address add) {
        require(msg.sender == add);
        _;
        // The underscore (_) is a placeholder =  indicate where the modified function's code should be executed
    }

    modifier manufactured(uint256 _uid) {
        require(products[_uid].productState == Structure.State.Manufactured);
        _;
    }

    modifier shippedByManufacturer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByManufacturer
        );
        _;
    }

    modifier receivedByAutoDealer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByAutoDealer
        );
        _;
    }

    modifier purchasedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.PurchasedByCustomer
        );
        _;
    }

    modifier shippedByAutoDealer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByAutoDealer
        );
        _;
    }

    modifier receivedByLogisticsCompany(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByLogisticsCompany
        );
        _;
    }

    modifier shippedByLogisticsCompany(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ShippedByLogisticsCompany
        );
        _;
    }

    modifier receivedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == Structure.State.ReceivedByCustomer
        );
        _;
    }
    
// internal: The internal visibility keyword specifies that this function can only be called from within the 
// current contract or derived contracts (i.e., it's not accessible externally).
//  It is common for utility functions or helper functions that are meant to be used internally within the contract.

// pure: The pure modifier indicates that this function does not read from or
//  modify the state of the contract. 
// It is used for functions that perform calculations or transformations on input data but do not interact with the blockchain's state.
//  The pure modifier is also used to indicate that the function does not access contract storage and is gas-free when called externally.

    function manufactureEmptyInitialize(Structure.Product memory product)
        internal
        pure
    {
        address autoDealer;
        string memory transaction;
        string memory autoDealerLongitude;
        string memory autoDealerLatitude;

        address logisticsCompany;
        //The memory = used for temporary data that is not permanently stored on the blockchain 
        string memory logisticsCompanyLongitude;
        string memory logisticsCompanyLatitude;
        
        
        address customer;

        product.autodealer.autoDealer = autoDealer;
        product.autodealer.autoDealerLongitude = autoDealerLongitude;
        product.autodealer.autoDealerLatitude = autoDealerLatitude;

        product.logisticscompany.logisticsCompany = logisticsCompany;
        product.logisticscompany.logisticsCompanyLongitude = logisticsCompanyLongitude;
        product.logisticscompany.logisticsCompanyLatitude = logisticsCompanyLatitude;

        product.customer = customer;
        product.transaction = transaction;
    }

    function manufactureProductInitialize(
        Structure.Product memory product,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) internal pure {
        product.productdet.productName = productName;
        product.productdet.productCode = productCode;
        product.productdet.productPrice = productPrice;
        product.productdet.productCategory = productCategory;
    }

    ///@dev STEP 1 : Manufactured a product.
    function manufactureProduct(
        string memory manufacturerName,
        string memory manufacturerDetails,
        string memory manufacturerLongitude,
        string memory manufacturerLatitude,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) public {
        require(hasManufacturerRole(msg.sender));
        uint256 _uid = uid;
        Structure.Product memory product;
        product.sku = sku;
        product.uid = _uid;
        product.manufacturer.manufacturerName = manufacturerName;
        product.manufacturer.manufacturerDetails = manufacturerDetails;
        product.manufacturer.manufacturerLongitude = manufacturerLongitude;
        product.manufacturer.manufacturerLatitude = manufacturerLatitude;
        product.manufacturer.manufacturedDate = block.timestamp;

        product.owner = msg.sender;
        product.manufacturer.manufacturer = msg.sender;

        manufactureEmptyInitialize(product);

        product.productState = Structure.State.Manufactured;

        manufactureProductInitialize(
            product,
            productName,
            productCode,
            productPrice,
            productCategory
        );

        products[_uid] = product;

        productHistory[_uid].history.push(product);

        sku++;
        uid = uid + 1;

        emit Manufactured(_uid);
    }

    ///@dev STEP 2 : Purchase of manufactured product by Third Party.
    
    function purchaseByAutoDealer(uint256 _uid) public manufactured(_uid) {
        require(hasAutoDealerRole(msg.sender));
        products[_uid].autodealer.autoDealer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByAutoDealer;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByAutoDealer(_uid);
    }

    ///@dev STEP 3 : Shipping of purchased product to Third Party.
    function shipToAutoDealer(uint256 _uid)
        public
        verifyAddress(products[_uid].manufacturer.manufacturer)
    {
        require(hasManufacturerRole(msg.sender));
        products[_uid].productState = Structure.State.ShippedByManufacturer;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByManufacturer(_uid);
    }

    ///@dev STEP 4 : Received the purchased product shipped by Manufacturer.
    function receiveByAutoDealer(
        uint256 _uid,
        string memory autoDealerLongitude,
        string memory autoDealerLatitude
    )
        public
        shippedByManufacturer(_uid)
        verifyAddress(products[_uid].autodealer.autoDealer)
    {
        require(hasAutoDealerRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].autodealer.autoDealerLongitude = autoDealerLongitude;
        products[_uid].autodealer.autoDealerLatitude = autoDealerLatitude;
        products[_uid].productState = Structure.State.ReceivedByAutoDealer;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByAutoDealer(_uid);
    }

    ///@dev STEP 5 : Purchase of a product at third party by Customer.
    function purchaseByCustomer(uint256 _uid)
        public
        receivedByAutoDealer(_uid)
    {
        require(hasCustomerRole(msg.sender));
        products[_uid].customer = msg.sender;
        products[_uid].productState = Structure.State.PurchasedByCustomer;
        productHistory[_uid].history.push(products[_uid]);

        emit PurchasedByCustomer(_uid);
    }

    ///@dev STEP 7 : Shipping of product by third party purchased by customer.
    function shipByAutoDealer(uint256 _uid)
        public
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].autodealer.autoDealer)
    {
        require(hasAutoDealerRole(msg.sender));
        products[_uid].productState = Structure.State.ShippedByAutoDealer;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByAutoDealer(_uid);
    }

    ///@dev STEP 8 : Receiveing of product by delivery hub purchased by customer.
    function receiveByLogisticsCompany(
        uint256 _uid,
        string memory logisticsCompanyLongitude,
        string memory logisticsCompanyLatitude
    ) public shippedByAutoDealer(_uid) {
        require(hasLogisticsCompanyRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].logisticscompany.logisticsCompany = msg.sender;
        products[_uid].logisticscompany.logisticsCompanyLongitude = logisticsCompanyLongitude;
        products[_uid].logisticscompany.logisticsCompanyLatitude = logisticsCompanyLatitude;
        products[_uid].productState = Structure.State.ReceivedByLogisticsCompany;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByLogisticsCompany(_uid);
    }

    ///@dev STEP 9 : Shipping of product by delivery hub purchased by customer.
    function shipByLogisticsCompany(uint256 _uid)
        public
        receivedByLogisticsCompany(_uid)
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].logisticscompany.logisticsCompany)
    {
        require(hasLogisticsCompanyRole(msg.sender));
        products[_uid].productState = Structure.State.ShippedByLogisticsCompany;
        productHistory[_uid].history.push(products[_uid]);

        emit ShippedByLogisticsCompany(_uid);
    }

    ///@dev STEP 10 : Shipping of product by delivery hub purchased by customer.
    function receiveByCustomer(uint256 _uid)
        public
        shippedByLogisticsCompany(_uid)
        verifyAddress(products[_uid].customer)
    {
        require(hasCustomerRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].productState = Structure.State.ReceivedByCustomer;
        productHistory[_uid].history.push(products[_uid]);

        emit ReceivedByCustomer(_uid);
    }

    ///@dev Fetch product1
    function fetchProductPart1(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.uid,
            product.sku,
            product.owner,
            product.manufacturer.manufacturer,
            product.manufacturer.manufacturerName,
            product.manufacturer.manufacturerDetails,
            product.manufacturer.manufacturerLongitude,
            product.manufacturer.manufacturerLatitude
        );
    }

    ///@dev Fetch product2
    function fetchProductPart2(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            Structure.State,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.manufacturer.manufacturedDate,
            product.productdet.productName,
            product.productdet.productCode,
            product.productdet.productPrice,
            product.productdet.productCategory,
            product.productState,
            product.autodealer.autoDealer,
            product.autodealer.autoDealerLongitude
        );
    }

    ///@dev Fetch product3
    function fetchProductPart3(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            string memory,
            address,
            string memory,
            string memory,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        Structure.Product storage product = products[_uid];
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }
        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }
        return (
            product.autodealer.autoDealerLatitude,
            product.logisticscompany.logisticsCompany,
            product.logisticscompany.logisticsCompanyLongitude,
            product.logisticscompany.logisticsCompanyLatitude,
            product.customer,
            product.transaction
        );
    }

    function fetchProductCount() public view returns (uint256) {
        return uid;
    }

    function fetchProductHistoryLength(uint256 _uid)
        public
        view
        returns (uint256)
    {
        return productHistory[_uid].history.length;
    }

    function fetchProductState(uint256 _uid)
        public
        view
        returns (Structure.State)
    {
        return products[_uid].productState;
    }

    function setTransactionHashOnManufacture(string memory tran) public {
        productHistory[uid - 1].history[
            productHistory[uid - 1].history.length - 1
        ]
            .transaction = tran;
    }

    function setTransactionHash(uint256 _uid, string memory tran) public {
        Structure.Product storage p =
            productHistory[_uid].history[
                productHistory[_uid].history.length - 1
            ];
        p.transaction = tran;
    }
}