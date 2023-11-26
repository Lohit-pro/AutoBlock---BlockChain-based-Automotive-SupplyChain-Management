// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure {
    enum State {
        Manufactured,
        PurchasedByAutoDealer,
        ShippedByManufacturer,
        ReceivedByAutoDealer,
        PurchasedByCustomer,
        ShippedByAutoDealer,
        ReceivedByLogisticsCompany,
        ShippedByLogisticsCompany,
        ReceivedByCustomer
    }
    struct ManufactureDetails {
        address manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string manufacturerLongitude;
        string manufacturerLatitude;
        uint256 manufacturedDate;
    }
    struct ProductDetails {
        string productName;
        uint256 productCode;
        uint256 productPrice;
        string productCategory;
    }
    struct AutoDealerDetails {
        address autoDealer;
        string autoDealerLongitude;
        string autoDealerLatitude;
    }
    struct LogisticsCompanyDetails {
        address logisticsCompany;
        string logisticsCompanyLongitude;
        string logisticsCompanyLatitude;
    }
    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        ManufactureDetails manufacturer;
        AutoDealerDetails autodealer;
        ProductDetails productdet;
        LogisticsCompanyDetails logisticscompany;
        address customer;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }

    struct Roles {
        bool Manufacturer;
        bool AutoDealer;
        bool LogisticsCompany;
        bool Customer;
    }
}