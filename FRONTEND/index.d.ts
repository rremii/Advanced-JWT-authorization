declare module "\*.svg" {
    import React = require("react");
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "\*.jpg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "\*.json" {
    const content: string;
    export default content;
}