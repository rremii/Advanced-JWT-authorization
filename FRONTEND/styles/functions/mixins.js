import {maxWidth, maxWidthWrapper, minWidth, wrapperWidth} from "./settings.js";

export const Rem = (px) => `${+px / 16}rem`

export const Em = (px) => `${+px / 16}em`

export const AdaptiveValue = (
    startSize,
    minSize,
    widthFrom = wrapperWidth,
    widthTo = minWidth,
    keepSize = 0
) => {

    if (startSize === 0) startSize = 0.000001;

    if (minSize === 0) minSize = 0.000001;


    if (widthFrom === wrapperWidth && maxWidthWrapper === 0) {
        widthFrom = maxWidth;
    }

    // break points in EM
    let widthFromMedia = Em(widthFrom);
    let widthToMedia = Em(widthTo);

    // formula of fly value
    let slope = ((startSize - minSize) / (widthFrom - widthTo));
    let yIntersection = -widthTo * slope + minSize;
    if (yIntersection === 0) {
        yIntersection = 0.000001;
    }
    ///
    let flyValue = `calc(${Rem(yIntersection)} + (${slope} * 100vw))`;
    ///
    // getting property value
    let propertyValue = "clamp(" + Rem(minSize) + "," + flyValue + "," + Rem(startSize) + ")";
    // used if property value is a negative number
    if (minSize > startSize) {
        propertyValue = "clamp(" + Rem(startSize) + "," + flyValue + "," + Rem(minSize) + ")"
    }


    return propertyValue + ''
}

