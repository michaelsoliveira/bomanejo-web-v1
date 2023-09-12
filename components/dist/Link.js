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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Link = void 0;
var react_1 = require("react");
var link_1 = require("next/link");
// export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
//   { href, children, prefetch, replace, scroll, shallow, locale, ...props },
//   ref,
// ) {
//   return (
//     <NextLink
//         href={href}
//         replace={replace}
//         scroll={scroll}
//         shallow={shallow}
//         locale={locale}
//         passHref
//     >
//         <a  ref={ref} {...props} />
//     </NextLink>
//   )
// })
exports.Link = react_1.forwardRef(function Link(_a, ref) {
    var href = _a.href, children = _a.children, prefetch = _a.prefetch, replace = _a.replace, scroll = _a.scroll, shallow = _a.shallow, locale = _a.locale, props = __rest(_a, ["href", "children", "prefetch", "replace", "scroll", "shallow", "locale"]);
    return (React.createElement(link_1["default"], __assign({ ref: ref, href: href, replace: replace, scroll: scroll, shallow: shallow, locale: locale, passHref: true }, props), children));
});
