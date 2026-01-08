import React from 'react';
import { Modal, ModalContent } from '@cashfree-intl/coherent';
import styled from 'styled-components';

// This component uses a generic Embed UI, apps provide logic.
const StyledEmbed = styled.div<{ active: boolean; url: string; placeholder?: string }>`
  /* Mocking the StyledEmbed from coherent/apps if it's app-specific */
  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
  }
`;

// In Payout/VS, StyledEmbed is a coherent component usually.
// Since I can't be sure of the exact coherent export used for StyledEmbed, 
// and both apps use it via styled-components anyway, I'll provide a generic wrapper.

export interface VideoEmbedModalProps {
  onClose: () => void;
  name: string;
  url: string;
}

const VideoEmbedModal = ({ onClose, name, url }: VideoEmbedModalProps) => {
  return (
    <Modal onClose={onClose} open>
      <ModalContent className="p-0">
         <iframe
            title={name}
            src={url}
            allowFullScreen
            style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
          />
      </ModalContent>
    </Modal>
  );
};

export default VideoEmbedModal;
