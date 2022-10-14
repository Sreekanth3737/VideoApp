import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {Player} from 'video-react'

import { useDispatch, useSelector } from "react-redux";
import { setVideo } from '../../redux/slices/postSlice';
const VidioPlayer = (props) => {

    const [videoPlayer, setVideoPlayer] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        return()=>{
           if(videoPlayer){
            const {player}=videoPlayer.getState()
            dispatch(setVideo(player))
           } 
        }
    },[videoPlayer])
   const { selectedPlayer } = useSelector((state) => state.posts);

  return (
    <Modal 
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
        <Modal.Header>
      </Modal.Header>
      <Modal.Body>
        <Player
         autoPlay
         
         fluid={false}
         width='100%'
         height={500}
          ref={(player) => setVideoPlayer(player)}
         
        >
          <source src={props.url} />
        </Player>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-dark"
          onClick={() => {
            
            props.onHide();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default VidioPlayer