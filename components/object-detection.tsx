"use client"
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { load as cocoSSDLoad } from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { renderPredictions } from "@/utils/render-predictions";

let detectInterval

const ObjectDetection = () => {

    const [isLoading, setLoading] = useState(true)
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)

    const runCoco = async () => {
        setLoading(true)
        // Before loading the model
        tf.setBackend('webgl');
        const net = await cocoSSDLoad()
        setLoading(false)

        // detect object in 10 mili second
        detectInterval = setInterval(() => {
            runObjectDetection(net)
        }, 10)
    }

    const runObjectDetection = async (net) => {
        if (
            canvasRef.current !== null &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            // find detected objects
            const detectedObjects = await net.detect(
                webcamRef.current.video,
                undefined,
                0.6)

            // net.detect(first_arg: what we want to show, second_arg: number of object detect, third_arg: accuracy )

            const context = canvasRef.current.getContext('2d')
            renderPredictions(detectedObjects, context)
            // (first: data, second: context where render)

        }
    }

    const showMyVideo = () => {
        if (
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
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
                        <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>
                            {/* WebCam */}
                            <Webcam
                                ref={webcamRef}
                                className='rounded-md w-full lg:h-[720px]'
                                muted
                            />

                            {/* canvas */}
                            <canvas ref={canvasRef} className='absolute top-0 left-0 z-99999 w-full lg:h-[720px]' />
                        </div>
                    )
            }
        </div>
    )
}

export default ObjectDetection;