"use strict";
exports.__esModule = true;
var commutesPerYear = 260 * 2;
var litresPerKM = 10 / 100;
var gasLitreCost = 1.5;
var litreCostKM = litresPerKM * gasLitreCost;
var secondsPerDay = 60 * 60 * 24;
function Distance(_a) {
    var leg = _a.leg;
    if (!leg.distance || !leg.duration)
        return null;
    var days = Math.floor((commutesPerYear * leg.duration.value) / secondsPerDay);
    var cost = Math.floor((leg.distance.value / 1000) * litreCostKM * commutesPerYear);
    return (React.createElement("div", { className: "py-4" },
        React.createElement("p", { className: "w-8/12" },
            "A arvor\u00E9 est\u00E1 a ",
            React.createElement("span", { className: "highlight" }, leg.distance.text),
            " de dist\u00E2ncia da origem da UT e a viagem at\u00E9 o ponto tem em m\u00E9dia",
            " ",
            React.createElement("span", { className: "highlight" }, leg.duration.text),
            " de dura\u00E7\u00E3o.")));
}
exports["default"] = Distance;
