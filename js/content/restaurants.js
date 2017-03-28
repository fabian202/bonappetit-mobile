var myLat;
var myLon;
var typeFood = [];
var data = {
    "Body": [{
        "Active": true,
        "BasicInformationDto": {
            "Address": null,
            "BasicInformationId": 0,
            "BirthDate": "\/Date(-62135578800000-0500)\/",
            "CellPhone": null,
            "City": null,
            "CityId": 0,
            "CountryId": 0,
            "Email": null,
            "FirstName": null,
            "Gender": null,
            "IdNumber": null,
            "ImageString": null,
            "LastName": null,
            "RazonSocial": "202 food",
            "RestaurantDto": null,
            "StateId": 0,
            "TypeIdentificationId": 0,
            "UrlPhoto": null,
            "UserDto": null,
            "WaitersRestaurantDto": null,
            "WebSite": null
        },
        "DateRegister": "\/Date(-62135578800000-0500)\/",
        "GeoPosition": "6.2410862|-75.58337499999999",
        "ListTypeRestaurant": "Comida China",
        "ListTypeRestaurantDtos": null,
        "Logo": null,
        "OtherTypeRestaurant": null,
        "RestaurantId": 17,
        "Tax": 0,
        "TotalTables": 5
    },
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Black Pepper",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.177341|-75.585960",
	    "ListTypeRestaurant": "Parrillería",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 32,
	    "Tax": 0,
	    "TotalTables": 22
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Bon Appetit",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Otro",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 36,
	    "Tax": 0,
	    "TotalTables": 10
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Bon Appétit",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.184374|-75.570252",
	    "ListTypeRestaurant": "Mexicana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 9,
	    "Tax": 0,
	    "TotalTables": 35
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Bruno Forno e Vino",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Vegetariana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 30,
	    "Tax": 0,
	    "TotalTables": 17
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Chrome",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.218731699999999|-75.5941569",
	    "ListTypeRestaurant": "Comida Francesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 3,
	    "Tax": 0,
	    "TotalTables": 8
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Conexus202",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.219017|-75.594099",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 1,
	    "Tax": 0,
	    "TotalTables": 10
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Conexus202",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.218811|-75.5939986",
	    "ListTypeRestaurant": "Comida China",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 8,
	    "Tax": 0,
	    "TotalTables": 5
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Conexus202",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.218644|-75.594084",
	    "ListTypeRestaurant": "Africana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 11,
	    "Tax": 0,
	    "TotalTables": 10
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Cucho food",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.140661|-75.413847",
	    "ListTypeRestaurant": "Comida Francesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 6,
	    "Tax": 0,
	    "TotalTables": 20
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Culinaria Feinkost",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "48.4092171|11.7336207",
	    "ListTypeRestaurant": "Mexicana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 14,
	    "Tax": 0,
	    "TotalTables": 17
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "DUE Gourmet",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Mexicana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 18,
	    "Tax": 0,
	    "TotalTables": 5
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "El papero",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2187752|-75.5940748",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 2,
	    "Tax": 0,
	    "TotalTables": 20
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "El sazón de Gloria",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.257797|-75.582848",
	    "ListTypeRestaurant": "Comida Francesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 13,
	    "Tax": 0,
	    "TotalTables": 50
	},
	{
	    "Active": false,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Goku",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2186986|-75.5941522",
	    "ListTypeRestaurant": "Comida China",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 4,
	    "Tax": 0,
	    "TotalTables": 3
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "J",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Japonesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 23,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "JD Ribs",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.1546751|-75.5978807",
	    "ListTypeRestaurant": "Mexicana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 16,
	    "Tax": 0,
	    "TotalTables": 15
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "La carmina",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2411359|-75.58338169999999",
	    "ListTypeRestaurant": "Comida China",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 21,
	    "Tax": 0,
	    "TotalTables": 4
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "La comelona",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2411322|-75.58337999999999",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 22,
	    "Tax": 0,
	    "TotalTables": 5
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "La maria",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2411322|-75.58337999999999",
	    "ListTypeRestaurant": "Comida China",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 20,
	    "Tax": 0,
	    "TotalTables": 10
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Lafamine",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Comida Francesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 19,
	    "Tax": 0,
	    "TotalTables": 15
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Mezzaluna",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.1806575|-75.57612499999999",
	    "ListTypeRestaurant": "Japonesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 12,
	    "Tax": 0,
	    "TotalTables": 50
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Naan",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.206901|-75.565759",
	    "ListTypeRestaurant": "India",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 37,
	    "Tax": 0,
	    "TotalTables": 15
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Okono",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.207541|-75.567366",
	    "ListTypeRestaurant": "Japonesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 25,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Okono",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.207541|-75.567366",
	    "ListTypeRestaurant": "Japonesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 26,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Okono",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.207541|-75.567366",
	    "ListTypeRestaurant": "Japonesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 27,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Okono",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.207541|-75.567366",
	    "ListTypeRestaurant": "Japonesa",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 28,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Orgia di sabore",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 24,
	    "Tax": 0,
	    "TotalTables": 10
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Otro Goku",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2186986|-75.5941522",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 5,
	    "Tax": 0,
	    "TotalTables": 10
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Pamotos",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.241103|-75.5833641",
	    "ListTypeRestaurant": "Comida China",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 10,
	    "Tax": 0,
	    "TotalTables": 8
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Prueba",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.241193699999999|-75.5833322",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 15,
	    "Tax": 0,
	    "TotalTables": 4
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Restaurante Prueba",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Otro",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 39,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "RestoCool",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 35,
	    "Tax": 0,
	    "TotalTables": 6
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "RestobarOP",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Resto bar",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 34,
	    "Tax": 0,
	    "TotalTables": 5
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "Ricuras Azerbaiyanenses",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Delicatessen",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 38,
	    "Tax": 0,
	    "TotalTables": 25
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "alfredoni pasta",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 33,
	    "Tax": 0,
	    "TotalTables": 8
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "il vergolio",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "undefined|undefined",
	    "ListTypeRestaurant": "Comida Italiana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 31,
	    "Tax": 0,
	    "TotalTables": 12
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "la buena comida",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2411657|-75.5833543",
	    "ListTypeRestaurant": "Comida China",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 7,
	    "Tax": 0,
	    "TotalTables": 50
	},
	{
	    "Active": true,
	    "BasicInformationDto": {
	        "Address": null,
	        "BasicInformationId": 0,
	        "BirthDate": "\/Date(-62135578800000-0500)\/",
	        "CellPhone": null,
	        "City": null,
	        "CityId": 0,
	        "CountryId": 0,
	        "Email": null,
	        "FirstName": null,
	        "Gender": null,
	        "IdNumber": null,
	        "ImageString": null,
	        "LastName": null,
	        "RazonSocial": "solo rest",
	        "RestaurantDto": null,
	        "StateId": 0,
	        "TypeIdentificationId": 0,
	        "UrlPhoto": null,
	        "UserDto": null,
	        "WaitersRestaurantDto": null,
	        "WebSite": null
	    },
	    "DateRegister": "\/Date(-62135578800000-0500)\/",
	    "GeoPosition": "6.2187372|-75.594037",
	    "ListTypeRestaurant": "Mexicana",
	    "ListTypeRestaurantDtos": null,
	    "Logo": null,
	    "OtherTypeRestaurant": null,
	    "RestaurantId": 29,
	    "Tax": 0,
	    "TotalTables": 5
	}],
    "Message": {
        "CodeMessage": "200",
        "Message": "Succes"
    }
};

var app = {
    //Constructor de la aplicación.
    initialize: function () {
        this.bindEvents();
    },
    //Eventos necesarios para que inicie la aplicación.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", NV.validateNavigation, false);
    },

    //Se detecta si el dispositivo está listo para usarse.
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        app.selectFilter(0);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(app.getPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        //        
        //app.constructHTML('sd');
        //gaPlugin.trackPage(GA.nativePluginResultHandler, GA.nativePluginErrorHandler, "/restaurants.html");
    },

    getPosition: function (position) {
        myLat = position.coords.latitude;
        myLon = position.coords.longitude;
        app.constructHTML(data,true,false);

    },

    search: function (description) {
        var filteredList = {
            Body: []
        };
        for (var i = 0; i < data.Body.length; i++) {
            if (data.Body[i].BasicInformationDto.RazonSocial.toLowerCase().indexOf(description.toLowerCase()) > -1) {
                console.log(data.Body[i].BasicInformationDto.RazonSocial);
                filteredList.Body.push(data.Body[i]);
            }
        }
        filteredList.Body.sort(function (a, b) { return a.BasicInformationDto.RazonSocial - b.BasicInformationDto.RazonSocial });
        console.log(JSON.stringify(filteredList.Body));
        app.constructHTML(filteredList, true, false);
    },

    selectType: function () {
        var filteredList = {
            Body: []
        };
        for (var i = 0; i < data.Body.length; i++) {
            if (data.Body[i].ListTypeRestaurant.indexOf($('#select_type').val()) > -1) {
                console.log(data.Body[i].BasicInformationDto.RazonSocial);
                filteredList.Body.push(data.Body[i]);
            }
        }
        app.constructHTML(filteredList, true, false);
    },

    showNearRestaurants: function (range) {
        var filteredList = {
            Body: []
        };
        for (var i = 0; i < data.Body.length; i++) {
            var geo = data.Body[i].GeoPosition;
            var pos = geo.split('|');
            var distance;

            if (pos[0] != 'undefined' && pos[1] != 'undefined') {
                distance = app.distance(myLat, myLon, pos[0], pos[1]).toFixed(1);
                if (distance <= range) {
                    console.log(data.Body[i].BasicInformationDto.RazonSocial);
                    data.Body[i].Distance = distance;
                    filteredList.Body.push(data.Body[i]);
                }
            }
        }
        filteredList.Body.sort(function (a, b) { return b.Distance - a.Distance });

        $('#slider_label').text(range + " KM");
        app.constructHTML(filteredList, true, false);
    },
  
    showQualified: function () {
        var filteredList = data;
        filteredList.Body.sort(function (a, b) { return b.Score - a.Score });
        console.log(JSON.stringify(filteredList));
        app.constructHTML(filteredList, true, true);

    },

    getData: function (description, razonSocial) {
        //window.plugins.spinnerDialog.show();
        console.log("Buscando: " + description);
        $.ajax({
            async: false,
            url: config.api_url + 'restaurants?description=' + description + '&razonSocial=' + razonSocial,
            type: "GET",
            dataType: 'json',
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                
            },
            complete: function () {

            },
            success: function (data) {
                //Show Message 
                //console.log(JSON.stringify(data));
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(app.getPosition);
                } else {
                    navigator.notification.alert(
                       'La geolocalización no está habilitada en tu celular.',
                       function alertDismissed() {
                       },
                       'Bon Appétite',
                       'Aceptar'
                   );
                   app.constructHTML(data,false,false);
                }
                app.constructHTML(data);
            },
            error: function (e, b) {
                //Show Message    
                //console.log('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //console.log('JSON : ' + JSON.stringify(objAJAXRequest));
                //alert('Failed, Status: ' + objAJAXRequest.status + ' message: ' + strError + ' errorThrow: ' + errorThrown);
                //alert('JSON : ' + JSON.stringify(objAJAXRequest));
                window.plugins.spinnerDialog.hide();
                navigator.notification.alert(
                    'No se pudo conectar con el servidor.',
                    function alertDismissed() {
                    },
                    'Bon Appétite',
                    'Aceptar'
                );
            }
        });
    },
    
    constructHTML: function (d, flag, score) {
        $('#table_content').empty();
        if (d.Body.length > 0) {
            for (var i = 0; i < d.Body.length; i++) {
                if (data.Body[i].Active) {
                    var razonSocial = d.Body[i].BasicInformationDto.RazonSocial;
                    var geo = d.Body[i].GeoPosition;
                    var pos = geo.split('|');
                    var distance;
                    console.log(flag);
                    if (flag && pos[0] != 'undefined' && pos[1] != 'undefined') {
                        distance = app.distance(myLat, myLon, pos[0], pos[1]).toFixed(1) + ' Km';
                    } else {
                        distance = "Sin datos";
                    }
                    var string = '<tr onclick="app.showMenu(' + d.Body[i].RestaurantId + ')">' +
                                    '<td>' +
                                        '<img id="Img_' + d.Body[i].RestaurantId + '" src="img/app.jpg" width="100" height="100"/>' +
                                    '</td>' +
                                    '<td  style=" height: 100%; width: 100%;">' +
                                        '<div class="div_element">' +
                                            '<label>' + razonSocial + '</label>' +
                                        '</div>';

                                            if (!score)
                                                string = string + '<br />  ';

                                        string = string + '<div class="div_element">' +
                                            '<label>Distancia: ' + distance + '</label>' +
                                        '</div>  ';
                                        if (score) {
                                            string = string + '<div id="score_' + d.Body[i].RestaurantId + '" class="div_element"></div>' +
                                            '<label class="div_element">Puntaje: ' + d.Body[i].Score + '</label>';
                                        }
                                        string = string + '<hr style="width: 100%;"/>' +
                                    '</td>' +
                                ' </tr>';

                                        $('#table_content').append(string);
                    if (score) {
                        $.fn.raty.defaults.path = 'js/content/img/raty/';
                        $('#score_' + d.Body[i].RestaurantId).raty({
                            starOff: 'star-off.png',
                            starOn: 'star-on.png',
                            starHalf: 'star-half.png',
                            width: '100%',
                            score: (d.Body[i].Score).toFixed(2),
                            //score: 5,
                            readOnly: true
                        });
                    }
                    if (typeFood.indexOf(d.Body[i].ListTypeRestaurant) == -1) {
                        $('#select_type').append('<option value="' + d.Body[i].ListTypeRestaurant + '">' + d.Body[i].ListTypeRestaurant + '</option>');
                        typeFood.push(d.Body[i].ListTypeRestaurant);
                    }
                }
               
                var restaurantId = d.Body[i].RestaurantId;
                var image = document.getElementById("Img_" + restaurantId);
                try {
                    image.src = config.api_url + 'assets/images/restaurants/' + restaurantId + '.png';

                } catch (e) {
                    try {
                        image.src = "img/app.jpg";
                    } catch (e) {
                    }
                }

            }
            console.log(JSON.stringify(typeFood));
        } else {
            $('#table_content').append('<tr>' +
                                '<td  style=" height: 100%; width: 100%;">' +
                                    '<div class="div_element">' +
                                        '<label>No hay restaurantes</label>' +
                                    '</div>' +
                                '</td>' +
                            ' </tr>');
        }
        //window.plugins.spinnerDialog.hide();
        
    },

    distance: function(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344
        return dist
    } ,

    selectFilter: function (id) {
        if (id == 0) {
            $(".filterbutton").css("background", "#A1A1A1");
            $(".filterbutton").css("color", "#000000");
            $("#name_restaurants").css("background", "#FBFF00");
            $("#search_name").css("display", "inline");
            $("#select_type").css("display", "none");
            //$(".slider_div").css("display", "none");
            app.search("");
        } else if (id == 1) {
            $(".filterbutton").css("background", "#A1A1A1");
            $(".filterbutton").css("color", "#000000");
            $("#type_restaurants").css("background", "#FBFF00");
            $("#search_name").css("display", "none");
            $("#select_type").css("display", "inline");
            //$(".slider_div").css("display", "none");
            app.selectType("");
        } else if (id == 2) {
            $(".filterbutton").css("background", "#A1A1A1");
            $(".filterbutton").css("color", "#000000");
            $("#near_restaurants").css("background", "#FBFF00");
            $("#search_name").css("display", "none");
            $("#select_type").css("display", "none");
            //alert($("#slider_div").length);
            //$(".slider_div").css("display", "inline");
            app.showNearRestaurants(3);
        } else{
            $(".filterbutton").css("background", "#A1A1A1");
            $(".filterbutton").css("color", "#000000");
            $("#score_restaurants").css("background", "#FBFF00");
            $("#search_name").css("display", "none");
            $("#select_type").css("display", "none");
            //$(".slider_div").css("display", "none");

            app.showQualified();
        }
    },

    showMenu: function (id) {
        localStorage.setItem("fromRestaurants", true);
        localStorage.setItem("restaurantId", id);
        window.location = "menu.html";
    },

    goMain: function () {
        window.location = "main.html";
    }

};