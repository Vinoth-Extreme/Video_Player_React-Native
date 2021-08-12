import React from 'react'
import { Dimensions } from 'react-native'

export const measures = {
    'screen-width': Dimensions.get('window').width,
    'screen-height': Dimensions.get('window').height,
}

export const colors = {
    'white-100' :  '#fff',
    'black-100' :  '#000',
    'black-50'  :  'rgba(0, 0, 0, 0.5)',
    'black-10'  :  'rgba(0, 0, 0, 0.1)',
    'purple-100':  '#1C5668'
}

export const fontSizes = {
    'size1': 50,
    'size2': 30,
    'size3': 15,
}

export const fontFamilies = {
    'sserif': 'sans-serif',
    'r-well-bold':  'Rockwell',
    'mono-corsiva': 'Monotype Corsiva'
}

export const HumanizeMillis = (millis) => {
    let secs = Math.floor(millis / 1000)
    let hrs = Math.floor(secs / 3600)
    secs -= hrs * 3600
    let min = Math.floor(secs / 60)
    secs -= min * 60

    if (hrs > 0) {
        min = "" + min;
        min = ("00" + min).substring(min.length);
        return hrs + ":" + min + ":" + secs;
    } else {
        if(min < 10) {
            min = "0" + min
        }
        if(secs < 10) {
            secs = "0" + secs
        }
        return min + ":" + secs;
    }
}

// Object {
//     "index": 9,
//         "item": Object {
//         "albumId": "-1739773001",
//             "creationTime": 1611659647557,
//             "duration": 28.943,
//             "filename": "VID_20210126_164316.mp4",
//             "height": 720,
//             "id": "297286",
//             "mediaType": "video",
//             "modificationTime": 1611659647000,
//             "thumbnail": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540vinothextreme%252Fvideo-player-one/VideoThumbnails/28944c1d-079f-4cea-bd38-316eb86d3
//         cd7.jpg",
//         "type": "NORMAL",
//             "uri": "file:///storage/emulated/0/DCIM/Camera/VID_20210126_164316.mp4",
//             "width": 480,
//     },
//     "separators": Object {
//         "highlight": [Function highlight],
//             "unhighlight": [Function unhighlight],
//             "updateProps": [Function updateProps],
//     },
// }
