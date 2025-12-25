import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertModal,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Space,
} from '@cashfree-intl/coherent';
import { BtnContainer, Divider, ModalRow, AlignedRow } from 'styled/common';
import _get from 'lodash/get';

// Constants
import { MODAL_TYPES } from '../constants';

// Componenets
import VerifyModal from './VerifyModal';

const Modals = ({ modalType, setModalType }) => {
  const [details, setDetails] = useState({});
  const handleClose = () => setModalType();

  const handleVerify = (status, data) => {
    setModalType(status);
    setDetails(data);
  };

  switch (modalType) {
    case MODAL_TYPES.VERIFY:
      return <VerifyModal onClose={handleClose} onVerify={handleVerify} />;

      case MODAL_TYPES.SUCCESS:
        return (
          <AlertModal
            type="success"
            title="Face Liveness Check Successful."
            onClose={() => handleClose()}
            maxWidth='none'
          >
            <AlignedRow style={{marginTop: "1.5rem"}}>
              <div className="text-left">
                <Text color="bodyLight">Reference ID</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'reference_id', '–')}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Status</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'status', '–')}
              </div>
            </AlignedRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Liveness</Text>
              </div>
              <div className="text-wrap">
                {details?.liveness ? 'Yes' : 'No'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Liveness Score</Text>
              </div>
              <div className="text-wrap">
                {Number(_get(details, 'liveness_score', 0)) * 100}%
              </div>
            </AlignedRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Gender</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'gender.value', '–')}
                {_get(details, 'gender.confidence') && (
                  <div><Text variant="b12" color="bodyLight">Confidence: {_get(details, 'gender.confidence', 0)}%</Text></div>
                )}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Age Range</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'age_range.min', '–')} - {_get(details, 'age_range.max', '–')}
              </div>
            </AlignedRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Eye Wear</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'eye_wear.value', false) ? 'Yes' : 'No'}
                {_get(details, 'eye_wear.confidence') && (
                  <div><Text variant="b12" color="bodyLight">Confidence: {_get(details, 'eye_wear.confidence', 0)}%</Text></div>
                )}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Eyes Open</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'eyes_open.value', false) ? 'Yes' : 'No'}
                {_get(details, 'eyes_open.confidence') && (
                  <div><Text variant="b12" color="bodyLight">Confidence: {_get(details, 'eyes_open.confidence', 0)}%</Text></div>
                )}
              </div>
            </AlignedRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Face Occluded</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'face_occluded.value', false) ? 'Yes' : 'No'}
                {_get(details, 'face_occluded.confidence') && (
                  <div><Text variant="b12" color="bodyLight">Confidence: {_get(details, 'face_occluded.confidence', 0)}%</Text></div>
                )}
              </div>
              <div className="text-left">
              </div>
              <div className="text-wrap">
              </div>
            </AlignedRow>
      
            <Divider contain />
            
            <ModalRow>
              <Text variant="b14" strong>
                Quality
              </Text>
              <div />
            </ModalRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Blur</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'quality.blur', false) ? 'Yes' : 'No'}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Bright</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'quality.bright', false) ? 'Yes' : 'No'}
              </div>
            </AlignedRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Exposure</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'quality.exposure', '–')}
              </div>
              <div className="text-left">
              </div>
              <div className="text-wrap">
              </div>
            </AlignedRow>
            
            <ModalRow>
              <Text variant="b14" strong>
                Pose
              </Text>
              <div />
            </ModalRow>
            
            <AlignedRow>
              <div className="text-left">
                <Text color="bodyLight">Face Alignment</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'pose.face_alignment', '–')}
              </div>
              <div className="text-left">
                <Text color="bodyLight">Head Turned</Text>
              </div>
              <div className="text-wrap">
                {_get(details, 'pose.head_turned', false) ? 'Yes' : 'No'}
              </div>
            </AlignedRow>
          </AlertModal>
        );

    case MODAL_TYPES.FACE_NOT_DETECTED:
      return (
        <AlertModal
          type="success"
          title="Face Liveness Check Successful."
          onClose={() => setModalType()}
        >
          Face is not Detected.
        </AlertModal>
      );

    case MODAL_TYPES.MULTIPLE_FACES_DETECTED:
      return (
        <AlertModal
          type="success"
          title="Face Liveness Check Successful."
          onClose={() => setModalType()}
        >
          Multiple Face's Detected.
        </AlertModal>
      );

      case MODAL_TYPES.REAL_FACE_NOT_DETECTED:
      return (
        <AlertModal
          type="success"
          title="Face Liveness Check Successful."
          onClose={() => setModalType()}
        >
          Real Face Not Detected.
        </AlertModal>
      );
  }
};

Modals.propTypes = {
  modalType: PropTypes.string.isRequired,
  setModalType: PropTypes.func.isRequired,
};

export default Modals;
