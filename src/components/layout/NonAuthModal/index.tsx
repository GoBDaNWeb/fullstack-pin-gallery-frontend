// * react
import React from 'react';
import { useNavigate } from 'react-router-dom';

// * redux
import { useAppDispatch } from '@redux/store';
import { handleOpenModal } from '@redux/user/userSlice';

// * icons
import { AiOutlineClose } from 'react-icons/ai';

const NonAuthModal = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const closeModal = (): void => {
        dispatch(handleOpenModal(false));
    };

    return (
        <div
            onClick={closeModal}
            className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-96 h-96 bg-white rounded-2xl relative p-2 "
            >
                <button
                    onClick={closeModal}
                    className="absolute right-2 text-2xl cursor-pointer"
                >
                    <AiOutlineClose />
                </button>
                <div className="text-center flex flex-col items-center justify-center gap-8 h-full w-full text-3xl">
                    <h3>Упс...</h3>
                    <h4>Кажется что вы не вошли в свой аккаунт</h4>
                    <div
                        onClick={() => {
                            navigate('/auth');
                            closeModal();
                        }}
                        className="text-sky-500 cursor-pointer"
                    >
                        Войти
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NonAuthModal;
