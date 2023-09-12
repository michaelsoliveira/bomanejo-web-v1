"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("@react-google-maps/api");
var Distance_1 = require("./Distance");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
function Map(_a) {
    var setLocation = _a.setLocation, arvores = _a.arvores, polygonPath = _a.polygonPath, callBackPolygon = _a.callBackPolygon, _b = _a.shapeText, shapeText = _b === void 0 ? 'Shape' : _b;
    var _c = react_1.useState(true), polygon = _c[0], setPolygon = _c[1];
    var _d = react_1.useState({
        x: window.innerWidth,
        y: window.innerHeight
    }), size = _d[0], setSize = _d[1];
    var updateSize = function () {
        setSize({
            x: window.innerWidth,
            y: window.innerHeight
        });
    };
    react_1.useEffect(function () { return (onresize = updateSize); }, []);
    var _e = react_1.useState(), utLocation = _e[0], setUtLocation = _e[1];
    var _f = react_1.useState(), directions = _f[0], setDirections = _f[1];
    var mapRef = react_1.useRef();
    var onUnmount = react_1.useCallback(function callback(map) {
        mapRef.current = undefined;
    }, []);
    var onUnmountPolygon = react_1.useCallback(function () {
        listenersRef.current.forEach(function (lis) { return lis === null || lis === void 0 ? void 0 : lis.remove(); });
        polygonRef.current = null;
        mapRef.current = undefined;
    }, []);
    var center = react_1.useMemo(function () { return ({ lat: -3, lng: -49.8 }); }, []);
    var options = react_1.useMemo(function () { return ({
        mapId: "e8b3ef309dafc25e",
        disableDefaultUI: false,
        clickableIcons: true
    }); }, []);
    // Define refs for Polygon instance and listeners
    var polygonRef = react_1.useRef(null);
    var listenersRef = react_1.useRef([]);
    // Call setPath with new edited path
    var onEdit = react_1.useCallback(function (e) {
        var _a, _b;
        if (polygonRef.current) {
            var nextPath = polygonRef.current
                .getPath()
                .getArray()
                .map(function (latLng) {
                return { lat: latLng.lat(), lng: latLng.lng() };
            });
            polygon ? callBackPolygon(nextPath) : setUtLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            if ((_a = e.domEvent) === null || _a === void 0 ? void 0 : _a.ctrlKey) {
                // console.log(e)
                (_b = polygonRef.current) === null || _b === void 0 ? void 0 : _b.getPath().removeAt(e.vertex);
            }
        }
    }, [callBackPolygon, polygon]);
    var handleClick = function (e) {
        var latLng = e.latLng;
        if (!polygon) {
            setLocation({ lat: latLng.lat(), lng: latLng.lng() });
            setUtLocation({ lat: latLng.lat(), lng: latLng.lng() });
        }
        else {
            callBackPolygon(function (prev) { return __spreadArrays(prev, [{ lat: latLng.lat(), lng: latLng.lng() }]); });
        }
    };
    var onLoad = react_1.useCallback(function (map) {
        mapRef.current = map;
    }, []);
    var onLoadPolygon = react_1.useCallback(function (polygon) {
        polygonRef.current = polygon;
        var path = polygon.getPath();
        listenersRef.current.push(path === null || path === void 0 ? void 0 : path.addListener("set_at", onEdit), path === null || path === void 0 ? void 0 : path.addListener("insert_at", onEdit), path === null || path === void 0 ? void 0 : path.addListener("remove_at", onEdit));
    }, [onEdit]);
    var houses = react_1.useMemo(function () { return generateHouses(center); }, [center]);
    var fetchDirections = function (house) {
        if (!utLocation)
            return;
        var service = new google.maps.DirectionsService();
        service.route({
            origin: house,
            destination: utLocation,
            travelMode: google.maps.TravelMode.DRIVING
        }, function (result, status) {
            if (status === "OK" && result) {
                setDirections(result);
            }
        });
    };
    return (React.createElement("div", { className: "mt-2" },
        React.createElement("div", { className: "pb-2" },
            React.createElement("div", { className: "flex flex-row items-center justify-between w-full" },
                React.createElement("div", { className: "w-full" },
                    !utLocation && React.createElement("p", null, "Selecione no mapa as coordenadas da UT"),
                    directions && React.createElement(Distance_1["default"], { leg: directions.routes[0].legs[0] })),
                React.createElement("div", { className: "flex flex-row items-center w-full space-x-2 justify-end" },
                    React.createElement("div", { className: "space-x-2" },
                        React.createElement("input", { type: "checkbox", checked: polygon, onChange: function () { return setPolygon(!polygon); } }),
                        " ",
                        shapeText),
                    polygon && polygonPath.length > 0 && (React.createElement("div", { onClick: function () { return callBackPolygon([]); }, className: "flex flex-row px-4 py-2 space-x-2 border rounded-md" },
                        React.createElement("div", null,
                            React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faEraser })),
                        React.createElement("span", null, "Limpar")))))),
        React.createElement("div", { className: "map" },
            React.createElement(api_1.GoogleMap, { zoom: 8, center: center, mapContainerStyle: {
                    width: "" + (size.x > 1024 ? 920 : '') + ((size.x > 800 && size.x < 1024) ? 600 : '') + (size.x < 800 ? 400 : '') + "px",
                    height: '400px'
                }, options: options, onLoad: onLoad, onUnmount: onUnmount, onClick: handleClick },
                polygonPath.length > 0 && (React.createElement(React.Fragment, null,
                    React.createElement(api_1.Polygon, { paths: polygonPath, editable: polygon, draggable: polygon, 
                        // Event used when manipulating and adding points
                        onMouseUp: onEdit, 
                        // Event used when dragging the whole Polygon
                        onDragEnd: onEdit, onLoad: onLoadPolygon, onUnmount: onUnmountPolygon, options: {
                            fillColor: '#00FF00',
                            fillOpacity: 0.4,
                            strokeColor: '#00FF00',
                            strokeOpacity: 1,
                            strokeWeight: 2
                        } }))),
                directions && (React.createElement(api_1.DirectionsRenderer, { directions: directions, options: {
                        polylineOptions: {
                            zIndex: 50,
                            strokeColor: "#1976D2",
                            strokeWeight: 4
                        }
                    } })),
                utLocation && (React.createElement(React.Fragment, null,
                    React.createElement(api_1.Marker, { position: utLocation, icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" }))),
                arvores && (React.createElement(React.Fragment, null,
                    React.createElement(api_1.MarkerClusterer, null, function (clusterer) {
                        return React.createElement(React.Fragment, null, arvores === null || arvores === void 0 ? void 0 : arvores.map(function (arv, idx) { return (React.createElement(api_1.Marker, { key: idx, position: arv, clusterer: clusterer, onClick: function () {
                                fetchDirections(arv);
                            } })); }));
                    }))))),
        utLocation && (React.createElement("div", { className: "mt-2" },
            React.createElement("p", { className: "flex text-sm flex-row items-center w-full" },
                "Coordenadas da UT:",
                " ",
                "[", utLocation === null || utLocation === void 0 ? void 0 :
                utLocation.lat,
                ", ", utLocation === null || utLocation === void 0 ? void 0 :
                utLocation.lng,
                "]")))));
}
exports["default"] = Map;
var defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true
};
var closeOptions = __assign(__assign({}, defaultOptions), { zIndex: 3, fillOpacity: 0.05, strokeColor: "#8BC34A", fillColor: "#8BC34A" });
var middleOptions = __assign(__assign({}, defaultOptions), { zIndex: 2, fillOpacity: 0.05, strokeColor: "#FBC02D", fillColor: "#FBC02D" });
var farOptions = __assign(__assign({}, defaultOptions), { zIndex: 1, fillOpacity: 0.05, strokeColor: "#FF5252", fillColor: "#FF5252" });
var generateHouses = function (position) {
    var _houses = [];
    for (var i = 0; i < 100; i++) {
        var direction = Math.random() < 0.5 ? -2 : 2;
        _houses.push({
            lat: position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction
        });
    }
    return _houses;
};
