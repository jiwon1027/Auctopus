import { theme } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import { styled as mstyled } from '@mui/material/styles';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export default function ImageUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 10;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    // console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };
  return (
    <Container>
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
        {({
          imageList,
          onImageUpload,
          // onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          // isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper">
            <UploadBox>
              <CustomImageIcon />
              <CustomAddIcon onClick={onImageUpload} {...dragProps} />
            </UploadBox>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </Container>
  );
}

const Container = styled.div`
  overflow: scroll;
  /* height: 5rem; */
  color: #112031;
  border: 1px solid #000;
  /* 가로 스크롤 */
  overflow: auto;
  white-space: nowrap;
  border-bottom: 3px solid gray;
  margin-top: 2.7rem;
  width: 30rem;
  height: 15rem;
  display: flex;
  flex-direction: row;
  /* white-space: nowrap;
  overflow: scroll;
  overflow: auto;
  white-space: nowrap; */
  /* :-webkit-scrollbar {
    display: none;
  } */
`;

const UploadBox = styled.div`
  width: 13rem;
  height: 13rem;
  border: solid 5px ${theme.colors.turtleStandard};
  background-color: ${theme.colors.turtleLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomImageIcon = mstyled(ImageIcon)`
  width: 5.5rem;
  height: 5.5rem;
  color: ${theme.colors.turtleDark};
`;
const CustomAddIcon = mstyled(AddIcon)`
  width: 4rem;
  height: 4rem;
  color: ${theme.colors.turtleDark};
`;
