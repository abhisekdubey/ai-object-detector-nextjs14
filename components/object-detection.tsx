"use client"
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { load as cocossdload } from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';

let detectInterval

const ObjectDetection = () => {

    const [isLoading, setLoading] = useState(true)
    const webcamRef = useRef(null)

    const runCoco = async () => {
        setLoading(true)
        const net = await cocossdload
        setLoading(false)

        // detect object in 10 mili second
        detectInterval = setInterval(() => {
            // runObjectDetection(net)
        }, 10)
    }

    const showMyVideo = () => {
        if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.videoWidth = myVideoWidth;
            webcamRef.current.video.videoHeight = myVideoHeight;
        }
    }

    useEffect(() => {
        runCoco()
        showMyVideo()
    }, [])

    return (
        <div className='mt-8'>
            {
                isLoading ? (
                    <div className='gradient-title'>Loading AI Model</div>
                )
                    :
                    (
                        <div className=''>
                            {/* WebCam */}
                            <Webcam
                                ref={webcamRef}
                                className='rounded-md w-full lg:h-[720px]'
                                muted
                            />
                        </div>
                    )
            }
        </div>
    )
}

export default ObjectDetection;