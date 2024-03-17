"use client"
import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const ObjectDetection = () => {

    const webcamRef = useRef(null)

    const showMyVideo = () => {
        if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.videoWidth = myVideoWidth;
            webcamRef.current.video.videoHeight = myVideoHeight;
        }
    }

    useEffect(() => {
        showMyVideo()
    }, [])

    return (
        <div className='mt-8'>
            <div className=''>
                {/* WebCam */}
                <Webcam
                    ref={webcamRef}
                    className='rounded-md w-full lg:h-[720px]'
                    muted
                />

                {/* Canvas */}
            </div>
        </div>
    )
}

export default ObjectDetection;