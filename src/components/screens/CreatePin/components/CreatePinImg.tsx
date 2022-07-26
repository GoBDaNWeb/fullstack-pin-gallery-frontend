// * react
import React, { useRef, memo } from 'react';

// * icons
import { MdPhotoCamera } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { ICreatePinImgProps } from '../types';

const CreatePinImg: React.FC<ICreatePinImgProps> = memo(
    ({ pinImage, handleUploadImage, clearImageUrl }) => {
        const inputFileRef = useRef<HTMLInputElement>(null);

        const handleInputClick = () => {
            inputFileRef.current?.click();
        };

        return (
            <>
                <div className="relative w-full h-full">
                    {pinImage ? (
                        <img
                            className="max-w-[320px] max-h-[400px] shadow-md rounded-2xl"
                            src={`${process.env.REACT_APP_API_URL}${pinImage}`}
                            alt="pin upload"
                        />
                    ) : (
                        <button
                            onClick={handleInputClick}
                            className="w-80 h-96 bg-white rounded-2xl shadow-lg border-[1px] border-gray-100 border-solid text-8xl text-gray-300 flex items-center justify-center cursor-pointer"
                        >
                            <MdPhotoCamera />
                        </button>
                    )}
                    {pinImage && (
                        <button
                            onClick={clearImageUrl}
                            className="flex items-center justify-center text-3xl absolute w-12 h-12 rounded-full shadow-md border-[1px] border-solid border-gray-100 bg-white top-[-.5rem] right-[-.5rem] cursor-pointer"
                        >
                            <AiOutlineClose />
                        </button>
                    )}
                </div>
                <input
                    onChange={handleUploadImage}
                    ref={inputFileRef}
                    type="file"
                    hidden
                />
            </>
        );
    },
);

export default CreatePinImg;
