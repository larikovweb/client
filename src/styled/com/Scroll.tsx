import styled from '@emotion/styled';

export const Scroll = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-color: #25293f rgba(37, 41, 63, 0.1);
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 0.25rem;
    height: 0;
    background-color: #25293f;
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #25293f;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #171928;
  }

  /* Стрелки */
  &::-webkit-scrollbar-button:vertical:start:decrement {
    background: transparent;
  }

  &::-webkit-scrollbar-button:vertical:end:increment {
    background: transparent;
  }

  &::-webkit-scrollbar-button:horizontal:start:decrement {
    background: transparent;
  }

  &::-webkit-scrollbar-button:horizontal:end:increment {
    background: transparent;
  }
`;
