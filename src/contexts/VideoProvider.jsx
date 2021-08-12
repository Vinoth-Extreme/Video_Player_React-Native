import React, { createContext, useState, useEffect } from 'react'
import * as Library from 'expo-media-library'
import * as VideoThumbnails from 'expo-video-thumbnails'

export const VideoContext = createContext()

const VideoProvider = ( props ) => {
    const [hasPermission, setHasPermission] = useState(false)
    const [albums, setAlbums] = useState([])
    const [isLoading, setIsLoading]=  useState(false)

    useEffect(() => {
        checkPermission()
    }, [])

    const checkPermission = async () => {
        const { status, canAskAgain } = await Library.getPermissionsAsync()
        if(status === 'granted') {
            // getAllVideos()
            // getALlVideos()
            getAllVideos()
            setHasPermission(true)
        } else {
            if(status === 'denied' && canAskAgain === true) {
                // requestPermission
                requestPermission()
            } else if (status === 'denied' && canAskAgain === false) {
                // Show error message
                alert("Permission must be given to proceed.")
            }
        }
    }

    const requestPermission = async () => {
        const { status } = await Library.requestPermissionsAsync()
        if(status === 'granted') {
            setHasPermission(true)
            // getALlVideos()
            getAllVideos()
        } else {
            checkPermission()
        }
    }

    const getAllVideos = async () => {
        let assets = []
        let albums = []
        let finalData = []
        const { totalCount } = await Library.getAssetsAsync({ mediaType: 'video' })
        await Library.getAssetsAsync({ mediaType: "video", first: totalCount })
            .then(res => assets = res.assets)
        await Library.getAlbumsAsync()
            .then(res => albums = res)

        albums.forEach((album, index) => {
            albums[index] = {...album, 'videos': []}
        })

        assets.forEach(video => {
            let albumIndex = albums.findIndex((album) => {
                return video.albumId === album.id
            })
            let currentAlbum = {...albums[albumIndex]}
            currentAlbum.videos.push({...video})
        })

        albums = albums.filter(album => album.videos.length !== 0)
        setAlbums(albums)
    }

    const getThumbnail = async (VideoURI) => {
        const { uri } = await VideoThumbnails.getThumbnailAsync(VideoURI, { time: 6000 })
    }



    return (
        <VideoContext.Provider
            value={{
                hasPermission,
                isLoading,
                albums,
            }}
        >
            { props.children }
        </VideoContext.Provider>
    )
}

export default VideoProvider