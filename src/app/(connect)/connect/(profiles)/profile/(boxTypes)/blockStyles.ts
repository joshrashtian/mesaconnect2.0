import { BlockStyle } from "./types";


export type BlockStyleStyle = {
    root?: any;
    title?: any;
    subtitle?: any;
    paragraph?: any;
    wrapper?: any;
    icon?: any
}

export const blockStyles: Record<string, BlockStyle> = {
    "Pink Biology": {
        name: "Pink Biology",
        theme: "built-in",
        style: {
            root: {
                backgroundColor: "#F2B7C6",
            },
            title: {
                color: "#FFF",
                fontSize: 24,
                fontWeight: "bold",
                textTransform: "lowercase"
            },
            icon: {
                color: "#FFF"
            },
            paragraph: {
                color: "#FFF",
                fontSize: 18,
                fontFamily: "eudoxusthin",
                textTransform: "lowercase"

            }
        },
    },
    "Terminal": {
        name: "Terminal",
        theme: "built-in",
        style: {
            root: {
                backgroundColor: "#000",
                borderRadius: 0,
                borderWidth: 3,
                borderColor: "#DDD",
            },
            icon: {
                color: "lightgreen"
            },
            wrapper: {
                backgroundColor: "#444",
                borderRadius: 0,
              
            },
            title: {
                color: "#FFF",
                fontSize: 20,
                fontFamily: "mono"
            },
            subtitle: {
                color: "#FFF",
                fontSize: 18,
                fontFamily: "mono"
            },
            paragraph: {
                color: "#EEE",
                fontSize: 18,
                fontFamily: "mono"
            }
        },
        extra: {
            titleWrapper: ["", "() extends Block"],
        }

    },
    "Terminal-Light": {
        name: "Terminal-Light",
        theme: "built-in",
        style: {
            root: {
                backgroundColor: "#FFF",
                borderRadius: 0,
                borderWidth: 3,
                borderColor: "#DDD",
            },
            icon: {
                color: "#000"
            },
            wrapper: {
                backgroundColor: "#eee",
                borderRadius: 0,
              
            },
            title: {
                color: "purple",
                fontSize: 20,
                fontFamily: "mono"
            },
            subtitle: {
                color: "#000",
                fontSize: 18,
                fontFamily: "mono"
            },
            paragraph: {
                color: "#000",
                fontSize: 18,
                fontFamily: "mono"
            }
        },
        extra: {
            titleWrapper: ["", "() extends Block"],
        }

    },
    "Oceania": {
        name: "Oceania",
        theme: "built-in",
        style: {
            root: {
                backgroundColor: "#86BBD8",
            },
            title: {
                color: "#FFF",
                fontSize: 20,
                
            },
            wrapper: {
                backgroundColor: "#79BCB8",
                borderRadius: 10,
            },
            paragraph: {
              
                color: "#FFF",
                fontSize: 18,
                fontFamily: "eudoxus"
            }
        },
    }
}