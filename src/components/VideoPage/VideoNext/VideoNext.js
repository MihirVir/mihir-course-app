import React, {useState} from 'react'
import './videonext.css'
import {Link} from 'react-router-dom'
const VideoNext = ({len, courseId}) => {
    const id = parseInt(document.URL.split('/')[5])
    const [counterId, setCounterId] = useState(id);
    
    const handleDecrementLogic = () => {
        setCounterId((prevState) => prevState - 1);
    } 
    const handleIncrementLogic = () => {
        setCounterId((prevState) => prevState + 1);
    }
    return (
        <>
        
            <section className="video-next-section">
                <div className="video-next-container">
                    <div className="prev-video">
                        {
                         id > 0 && (
                            <>
                                <Link onClick={handleDecrementLogic} reloadDocument = "true" to = {`/course/${courseId}/${counterId}`}>
                                    Previous Video
                                </Link>
                            </>
                         )
                        }
                    </div>
                    <div className="next-video">
                        {
                            id < len && (
                                <>
                                    <Link onClick={handleIncrementLogic} reloadDocument = "true" to = {`/course/${courseId}/${counterId}`}>
                                        Next Video
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default VideoNext